import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://flight-api-4urq.onrender.com/auth/login';  // Your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
  return this.http.post<string>('http://flight-api-4urq.onrender.com/auth/login', { username, password });
}

}
