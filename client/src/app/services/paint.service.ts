import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaintColor } from '../models/color.model';
import { WallpaperPattern } from '../models/pattern.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaintService {
  private apiUrl = (typeof window !== 'undefined' && window.location.port !== '4200')
    ? '/api'
    : 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getColors(query?: { category?: string; brand?: string; popular?: boolean; search?: string }): Observable<PaintColor[]> {
    let params = new HttpParams();
    if (query) {
      if (query.category) params = params.set('category', query.category);
      if (query.brand) params = params.set('brand', query.brand);
      if (query.popular !== undefined) params = params.set('popular', query.popular.toString());
      if (query.search) params = params.set('search', query.search);
    }
    return this.http.get<PaintColor[]>(`${this.apiUrl}/colors`, { params });
  }

  getColorCategories(): Observable<{ categories: string[]; brands: string[] }> {
    return this.http.get<{ categories: string[]; brands: string[] }>(`${this.apiUrl}/colors/meta/categories`);
  }

  getColorById(id: string): Observable<PaintColor> {
    return this.http.get<PaintColor>(`${this.apiUrl}/colors/${id}`);
  }

  // Admin Color CRUD
  addColor(color: Partial<PaintColor>): Observable<{ message: string; color: PaintColor }> {
    return this.http.post<{ message: string; color: PaintColor }>(
      `${this.apiUrl}/colors`,
      color,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  updateColor(id: string, color: Partial<PaintColor>): Observable<{ message: string; color: PaintColor }> {
    return this.http.put<{ message: string; color: PaintColor }>(
      `${this.apiUrl}/colors/${id}`,
      color,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  deleteColor(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/colors/${id}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  // Patterns
  getPatterns(category?: string): Observable<WallpaperPattern[]> {
    let params = new HttpParams();
    if (category && category !== 'All') {
      params = params.set('category', category);
    }
    return this.http.get<WallpaperPattern[]>(`${this.apiUrl}/patterns`, { params });
  }

  addPattern(pattern: Partial<WallpaperPattern>): Observable<{ message: string; pattern: WallpaperPattern }> {
    return this.http.post<{ message: string; pattern: WallpaperPattern }>(
      `${this.apiUrl}/patterns`,
      pattern,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  deletePattern(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/patterns/${id}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  // Admin Analytics & KPIs
  getAdminStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/stats`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
