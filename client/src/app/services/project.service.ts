import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomProject, SampleRoom } from '../models/project.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getSampleRooms(): Observable<SampleRoom[]> {
    return this.http.get<SampleRoom[]>(`${this.apiUrl}/projects/samples/rooms`);
  }

  getUserProjects(): Observable<RoomProject[]> {
    return this.http.get<RoomProject[]>(`${this.apiUrl}/projects`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getProjectById(id: string): Observable<RoomProject> {
    return this.http.get<RoomProject>(`${this.apiUrl}/projects/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  saveProject(project: Partial<RoomProject>): Observable<{ message: string; project: RoomProject }> {
    return this.http.post<{ message: string; project: RoomProject }>(
      `${this.apiUrl}/projects`,
      project,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  updateProject(id: string, project: Partial<RoomProject>): Observable<{ message: string; project: RoomProject }> {
    return this.http.put<{ message: string; project: RoomProject }>(
      `${this.apiUrl}/projects/${id}`,
      project,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/projects/${id}`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  uploadRoomImage(file: File): Observable<{ message: string; imageUrl: string; filename: string }> {
    const formData = new FormData();
    formData.append('roomImage', file);
    return this.http.post<{ message: string; imageUrl: string; filename: string }>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}
