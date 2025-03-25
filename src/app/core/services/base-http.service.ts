import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor( protected http: HttpClient) { }

  async get<T>(url: string): Promise<T | null> {
    try {
      return await firstValueFrom(this.http.get<T>(url));
    } catch (err) {
      console.error('GET error:', err);
      return null;
    }
  }

}
