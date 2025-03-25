import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseHttpService {

  private baseUrl= 'https://rickandmortyapi.com/api';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  async getCharacters(page: number = 1): Promise<any> {
    return await this.get(`${this.baseUrl}/character?page=${page}`);
  }

  async getCharacterById(id: number): Promise<any> {
    return await this.get(`${this.baseUrl}/character/${id}`);
  }
}
