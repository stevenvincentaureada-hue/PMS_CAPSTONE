import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AuthRegisterRequest } from '../models/auth-register.model';
import { AuthResponse } from '../models/auth-response.model';
import { Observable, tap } from 'rxjs';
import { AuthLoginRequest } from '../models/auth-login.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(data: AuthLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => this.tokenService.set(res.token)), // ← save token here
    );
  }
  register(data: AuthRegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data).pipe(
      tap((res) => this.tokenService.set(res.token)), // ← save token here
    );
  }
  logout(): void {
    this.tokenService.remove();
  }
}
