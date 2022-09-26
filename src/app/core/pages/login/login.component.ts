import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signup: boolean = false;
  public loading: boolean = false;
  public form: FormGroup | undefined;

  constructor(
    private authService: AuthService,
    private note: NotificationService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public onSubmit(): void {
    this.loading = true;

    if (!this.form?.valid) { this.note.warning('invalid form'); this.loading = false; return; }
    
    if(this.signup) {
      this.authService.signup(this.form.value.email, this.form.value.password, this.form.value.firstName, this.form.value.lastName);
    } else {
      this.authService.login(this.form.value.email, this.form.value.password);
    }
    this.loading = false;
  }

  public switch(): void {
    this.signup = !this.signup;
    this.buildForm();
  }

  public buildForm(): void {
    if(this.signup) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }
  }

}
