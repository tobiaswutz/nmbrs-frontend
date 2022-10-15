import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent implements OnInit {

  @Input() public visible: boolean = false;
  @Output() public abortEvent = new EventEmitter();
  @Output() public submitEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public abort(): void {
    this.abortEvent.emit();
  }

  public submit(): void {
    this.submitEvent.emit();
  }

}
