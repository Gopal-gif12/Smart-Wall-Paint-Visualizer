import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = (typeof window !== 'undefined' && window.location.port !== '4200')
    ? '/api/auth'
    : 'http://localhost:5000/api/auth';
  private tokenKey = 'paint_viz_token';
  private userKey = 'paint_viz_user';

  // Reactive signals for modern Angular
  currentUser = signal<User | null>(this.getStoredUser());
  token = signal<string | null>(localStorage.getItem(this.tokenKey));

  constructor(private http: HttpClient) {
    if (this.token()) {
      this.fetchProfile().subscribe();
    }
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  get isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  getAuthHeaders(): HttpHeaders {
    const t = this.token();
    let headers = new HttpHeaders();
    if (t) {
      headers = headers.set('Authorization', `Bearer ${t}`);
    }
    return headers;
  }

  register(data: { name: string; email: string; password: string; role?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  fetchProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() }).pipe(
      tap(u => {
        this.currentUser.set(u);
        localStorage.setItem(this.userKey, JSON.stringify(u));
      }),
      catchError(() => {
        this.logout();
        return of(null as any);
      })
    );
  }

  toggleFavorite(colorCode: string): Observable<{ favorites: string[] }> {
    return this.http.post<{ favorites: string[] }>(
      `${this.apiUrl}/favorite`,
      { colorCode },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(res => {
        const u = this.currentUser();
        if (u) {
          const updated = { ...u, favoriteColors: res.favorites };
          this.currentUser.set(updated);
          localStorage.setItem(this.userKey, JSON.stringify(updated));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.token.set(null);
    this.currentUser.set(null);
  }

  private handleAuthSuccess(res: AuthResponse) {
    if (res && res.token) {
      localStorage.setItem(this.tokenKey, res.token);
      localStorage.setItem(this.userKey, JSON.stringify(res.user));
      this.token.set(res.token);
      this.currentUser.set(res.user);
    }
  }

  loginDemoUser(): Observable<AuthResponse> {
    return this.login({ email: 'user@visualizer.com', password: 'user123' });
  }

  loginDemoAdmin(): Observable<AuthResponse> {
    return this.login({ email: 'admin@visualizer.com', password: 'admin123' });
  }
}
