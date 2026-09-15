import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header glass-panel">
      <div class="container flex items-center justify-between">
        <!-- Brand Logo -->
        <a routerLink="/" class="brand-logo flex items-center gap-3">
          <div class="logo-icon">
            <i class="fa-solid fa-paintbrush"></i>
          </div>
          <div class="logo-text">
            <span class="logo-title">SmartPaint</span>
            <span class="logo-badge">Visualizer</span>
          </div>
        </a>

        <!-- Navigation Links -->
        <nav class="nav-links flex items-center gap-1">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
          </a>
          <a routerLink="/visualizer" routerLinkActive="active" class="nav-item">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Visualizer Studio</span>
          </a>
          <a routerLink="/compare" routerLinkActive="active" class="nav-item">
            <i class="fa-solid fa-table-columns"></i>
            <span>Before / After</span>
          </a>
          <a routerLink="/colors" routerLinkActive="active" class="nav-item">
            <i class="fa-solid fa-swatchbook"></i>
            <span>Colors & Patterns</span>
          </a>
          <a routerLink="/projects" routerLinkActive="active" class="nav-item">
            <i class="fa-solid fa-folder-open"></i>
            <span>My Designs</span>
          </a>
          <a *ngIf="authService.isAdmin" routerLink="/admin" routerLinkActive="active" class="nav-item admin-link">
            <i class="fa-solid fa-chart-line"></i>
            <span>Admin</span>
          </a>
        </nav>

        <!-- Right Side Controls -->
        <div class="header-actions flex items-center gap-3">
          <!-- How to Use Tutorial Button -->
          <button (click)="openTutorial.emit()" class="btn btn-secondary btn-sm" title="How to use visualizer">
            <i class="fa-regular fa-circle-question"></i>
            <span>Guide</span>
          </button>

          <!-- User State -->
          <ng-container *ngIf="authService.currentUser() as user; else loginBtn">
            <div class="user-menu flex items-center gap-2">
              <span class="user-pill" [class.admin-pill]="user.role === 'admin'">
                <i [class]="user.role === 'admin' ? 'fa-solid fa-shield-halved' : 'fa-solid fa-circle-user'"></i>
                <span class="user-name">{{ user.name }}</span>
              </span>
              <button (click)="authService.logout()" class="btn btn-outline btn-sm logout-btn" title="Sign Out">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </ng-container>

          <ng-template #loginBtn>
            <div class="flex items-center gap-2">
              <button (click)="quickLoginDemoUser()" class="btn btn-secondary btn-sm" title="Instant demo login">
                <span>Demo User</span>
              </button>
              <button (click)="quickLoginAdmin()" class="btn btn-secondary btn-sm" title="Instant admin login">
                <span>Admin</span>
              </button>
              <a routerLink="/auth" class="btn btn-primary btn-sm">
                <span>Sign In</span>
              </a>
            </div>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      border-radius: 0;
      border-top: none;
      border-left: none;
      border-right: none;
      padding: 0.85rem 0;
      background: var(--bg-glass);
    }
    .brand-logo {
      text-decoration: none;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    .logo-text {
      display: flex;
      align-items: baseline;
      gap: 0.35rem;
    }
    .logo-title {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #FFFFFF, #CBD5E1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .logo-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: #38BDF8;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .nav-links {
      background: rgba(15, 23, 42, 0.5);
      padding: 0.3rem 0.5rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
    }
    .nav-item {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.45rem 0.95rem;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-muted);
      border-radius: var(--radius-full);
      transition: all var(--transition-fast);
    }
    .nav-item:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.06);
    }
    .nav-item.active {
      color: #FFFFFF;
      background: var(--accent-primary);
      box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
    }
    .admin-link.active {
      background: linear-gradient(135deg, #EC4899, #8B5CF6);
    }
    .user-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .user-pill.admin-pill {
      border-color: rgba(236, 72, 153, 0.4);
      background: rgba(236, 72, 153, 0.1);
      color: #F472B6;
    }
    .logout-btn {
      padding: 0.45rem 0.65rem;
    }
    @media (max-width: 900px) {
      .nav-links span {
        display: none;
      }
      .nav-item {
        padding: 0.5rem;
      }
    }
  `]
})
export class NavbarComponent {
  openTutorial = output<void>();

  constructor(public authService: AuthService) {}

  quickLoginDemoUser() {
    this.authService.loginDemoUser().subscribe();
  }

  quickLoginAdmin() {
    this.authService.loginDemoAdmin().subscribe();
  }
}
