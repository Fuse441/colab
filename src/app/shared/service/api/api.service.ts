import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {


  private url = environment.domain;

  constructor(private readonly http: HttpClient) {}

  export(path: string, userToken = true): Observable<HttpResponse<Blob>> {
    const headers = this.getHeader(userToken);
    return this.http.get(`${this.url}${path}`, { headers, responseType: 'blob', observe: 'response' });
  }
  getJson(path: string, userToken = true): Observable<any> {

    const headers = this.getHeader(userToken);
    return this.http.get(`${path}`, { headers });
  }
  get(path: string, userToken = true): Observable<any> {

    const headers = this.getHeader(userToken);
    return this.http.get(`${this.url}${path}`, { headers });
  }
  getById(path:string,id: number,userTokent=true ): Observable<any> {
    path = path+`/${id}`;
    const headers = this.getHeader(userTokent);
    return this.http.get(`${this.url}${path}`, { headers });
  }

  post(path: string, payload: any, userToken = true): Observable<any> {
    const headers = this.getHeader(userToken);
    return this.http.post(`${this.url}${path}`, payload, { headers });
  }
  postNoDomain(path: string, payload: any, userToken = true): Observable<any> {
    const headers = this.getHeader(userToken);
    return this.http.post(`${path}`, payload, { headers });
  }
  put(path: string, payload: any, userToken = true): Observable<any> {
    const headers = this.getHeader(userToken);
    return this.http.put(`${this.url}${path}`, payload, { headers });
  }

  patch(path: string, userToken = true) {
    const headers = this.getHeader(userToken);
    return this.http.patch(`${this.url}${path}`, { headers })
  }

  delete(path: string, userToken = true, body = {}): Observable<any> {
    const headers = this.getHeader(userToken);
    return this.http.delete(`${this.url}${path}`, { headers, body: body });
  }

  getAccessToken(): string {
    return localStorage.getItem(`${localStorageKey.token}_${environment.env}`) || '';
  }

  private getHeader(userToken = true) {
    let headers = new HttpHeaders();
    if (userToken && this.getAccessToken()) {
      headers.append('Authorization', `Bearer ${this.getAccessToken()}`);
    }
    return headers;
  }




}
