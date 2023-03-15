import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private configUrl = environment.serverUrl + 'api/v1/';

  constructor(
    private http: HttpClient,
    private toastr: NotificationService
  ) { }

  private async handleError(error: HttpErrorResponse) {
    this.toastr.success('Hello world!', 'Toastr fun!');
    if (error.error instanceof ErrorEvent) { this.toastr.error('An error occurred:', error?.error?.message); } else { this.toastr.error(`Backend returned code ${error?.status}`) }
    return null;
  }

  public async getCall<T>(path: string, options?: any) { return await lastValueFrom(this.http.get<T>(this.configUrl + path, options).pipe(catchError(this.handleError))); }
  public async postCall<T>(path: string, body: any, options?: any) { return await lastValueFrom(this.http.post<T>(this.configUrl + path, body, options).pipe(catchError(this.handleError))); }
  public async putCall<T>(path: string, body: any, options?: any) { return await lastValueFrom(this.http.put<T>(this.configUrl + path, body, options).pipe(catchError(this.handleError))); }
  public async deleteCall<T>(path: string, options?: any) { return await lastValueFrom(this.http.delete<T>(this.configUrl + path, options).pipe(catchError(this.handleError))); }
  public async patchCall<T>(path: string, body: any, options?: any) { return await lastValueFrom(this.http.patch<T>(this.configUrl + path, body, options).pipe(catchError(this.handleError))); }

  // public async getCall(path: string, options?: any) {
  //   try { return await lastValueFrom(this.http.get(this.configUrl + path, options)); }
  //   catch (error: any) { console.error(error); this.note.error(error.error.message); }
  //   return false
  // }

  // public async postCall(path: string, body: any, options?: any) {
  //   try {
  //     return await lastValueFrom(this.http.post(this.configUrl + path, body, options));
  //   }
  //   catch (error: any) { console.error(error); this.note.error(error.error.message); return false; }
  // }

  // public async putCall(path: string, body: any, options?: any) {
  //   try { return await lastValueFrom(this.http.put(this.configUrl + path, body, options)); }
  //   catch (error: any) { console.error(error); this.note.error(error.error.message); }
  //   return false
  // }

  // public async deleteCall(path: string, options?: any) {
  //   try { return await lastValueFrom(this.http.delete(this.configUrl + path, options)); }
  //   catch (error: any) { console.error(error); this.note.error(error.error.message); }
  //   return false
  // }

  // public async patchCall(path: string, body: any, options?: any) {
  //   try { return await lastValueFrom(this.http.patch(this.configUrl + path, body, options)); }
  //   catch (error: any) { console.error(error); this.note.error(error.error.message); }
  //   return false
  // }

  //authenticated calls
  public async getAuthCall(path: string, options?: any) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const headers = { Authorization: `Bearer ${token}` };
    const opt = { headers, ...options };
    return await this.getCall(path, opt);
  }

  public async postAuthCall(path: string, body: any, options?: any) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const headers = { Authorization: `Bearer ${token}` };
    const opt = { headers, ...options };
    return await this.postCall(path, body, opt);
  }

  public async putAuthCall(path: string, body: any, options?: any) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const headers = { Authorization: `Bearer ${token}` };
    const opt = { headers, ...options };
    return await this.putCall(path, body, opt);
  }

  public async deleteAuthCall(path: string, options?: any) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const headers = { Authorization: `Bearer ${token}` };
    const opt = { headers, ...options };
    return await this.deleteCall(path, opt);
  }

  public async patchAuthCall(path: string, body: any, options?: any) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const headers = { Authorization: `Bearer ${token}` };
    const opt = { headers, ...options };
    return await this.patchCall(path, body, opt);
  }
}
