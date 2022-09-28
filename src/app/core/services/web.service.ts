import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private configUrl = 'https://nest-server-production.up.railway.app/';

  constructor(
    private http: HttpClient,
    private note: NotificationService
  ) { }

  public async getCall(path: string, options?: any) {
    try { return await lastValueFrom(this.http.get(this.configUrl + path, options)); }
    catch (error: any) { console.error(error); this.note.error(error.error.message); }
    return false
  }

  public async postCall(path: string, body: any, options?: any) {
    try { return await lastValueFrom(this.http.post(this.configUrl + path, body, options)); }
    catch (error: any) { console.error(error); this.note.error(error.error.message); }
    return false
  }

  public async putCall(path: string, body: any, options?: any) {
    try { return await lastValueFrom(this.http.put(this.configUrl + path, body, options)); }
    catch (error: any) { console.error(error); this.note.error(error.error.message); }
    return false
  }

  public async deleteCall(path: string, options?: any) {
    try { return await lastValueFrom(this.http.delete(this.configUrl + path, options)); }
    catch (error: any) { console.error(error); this.note.error(error.error.message); }
    return false
  }

  public async patchCall(path: string, body: any, options?: any) {
    try { return await lastValueFrom(this.http.patch(this.configUrl + path, body, options)); }
    catch (error: any) { console.error(error); this.note.error(error.error.message); }
    return false
  }



}
