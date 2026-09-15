import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaintService } from '../../services/paint.service';
import { AuthService } from '../../services/auth.service';
import { PaintColor } from '../../models/color.model';
import { WallpaperPattern } from '../../models/pattern.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page container">
      <!-- Admin Top Header -->
      <div class="page-header flex items-center justify-between mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="badge badge-warning">Administrator Portal</span>
            <span class="text-xs text-subtle">System v1.0 • MEAN Stack</span>
          </div>
          <h1 class="page-title mt-1">Management & KPI Analytics</h1>
          <p class="page-subtitle">Monitor visualizer platform engagement, manage paint color shade catalogs, and configure patterns.</p>
        </div>

        <div class="flex items-center gap-3">
          <button (click)="openAddColorModal = true" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i>
            <span>Add New Paint Shade</span>
          </button>
          <button (click)="loadStats()" class="btn btn-secondary" title="Refresh metrics">
            <i class="fa-solid fa-rotate"></i>
          </button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div class="kpi-grid mb-8">
        <div class="kpi-card card">
          <div class="kpi-header flex items-center justify-between">
            <span class="kpi-title">Room Photo Uploads</span>
            <div class="kpi-icon" style="background: rgba(59, 130, 246, 0.15); color: #3B82F6">
              <i class="fa-solid fa-cloud-arrow-up"></i>
            </div>
          </div>
          <div class="kpi-value">{{ stats?.kpis?.totalUploads || 45 }}</div>
          <span class="kpi-trend text-success"><i class="fa-solid fa-arrow-trend-up"></i> +18% this week</span>
        </div>

        <div class="kpi-card card">
          <div class="kpi-header flex items-center justify-between">
            <span class="kpi-title">Saved Room Designs</span>
            <div class="kpi-icon" style="background: rgba(16, 185, 129, 0.15); color: #10B981">
              <i class="fa-solid fa-folder-open"></i>
            </div>
          </div>
          <div class="kpi-value">{{ stats?.kpis?.totalProjects || 12 }}</div>
          <span class="kpi-trend text-success"><i class="fa-solid fa-arrow-trend-up"></i> +24% conversion</span>
        </div>

        <div class="kpi-card card">
          <div class="kpi-header flex items-center justify-between">
            <span class="kpi-title">Registered Accounts</span>
            <div class="kpi-icon" style="background: rgba(139, 92, 246, 0.15); color: #8B5CF6">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div class="kpi-value">{{ stats?.kpis?.totalUsers || 28 }}</div>
          <span class="kpi-subtext">Active interior designers & users</span>
        </div>

        <div class="kpi-card card">
          <div class="kpi-header flex items-center justify-between">
            <span class="kpi-title">Catalog Shades</span>
            <div class="kpi-icon" style="background: rgba(236, 72, 153, 0.15); color: #EC4899">
              <i class="fa-solid fa-swatchbook"></i>
            </div>
          </div>
          <div class="kpi-value">{{ stats?.kpis?.totalColors || colors.length }}</div>
          <span class="kpi-subtext">Across 7 color families</span>
        </div>
      </div>

      <!-- MAIN MANAGEMENT TABS -->
      <div class="admin-tabs flex items-center gap-2 mb-6">
        <button 
          (click)="activeTab = 'shades'" 
          class="admin-tab-btn" 
          [class.active]="activeTab === 'shades'"
        >
          <i class="fa-solid fa-palette"></i>
          <span>Paint Shades Catalog ({{ colors.length }})</span>
        </button>
        <button 
          (click)="activeTab = 'patterns'" 
          class="admin-tab-btn" 
          [class.active]="activeTab === 'patterns'"
        >
          <i class="fa-solid fa-border-all"></i>
          <span>Wallpaper Textures ({{ patterns.length }})</span>
        </button>
        <button 
          (click)="activeTab = 'activity'" 
          class="admin-tab-btn" 
          [class.active]="activeTab === 'activity'"
        >
          <i class="fa-solid fa-list-check"></i>
          <span>User Activity Log</span>
        </button>
      </div>

      <!-- TAB 1: Paint Shades Manager -->
      <div *ngIf="activeTab === 'shades'" class="tab-pane card">
        <div class="table-header flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <input 
              [(ngModel)]="searchColorQuery" 
              placeholder="Filter shades by name or code..." 
              class="form-input search-input"
            >
          </div>
          <span class="text-xs text-subtle">Showing {{ getFilteredColors().length }} shades</span>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Swatch</th>
                <th>Code</th>
                <th>Shade Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>HEX / RGB</th>
                <th>Popular</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of getFilteredColors()">
                <td>
                  <span class="table-swatch" [style.background-color]="c.hex"></span>
                </td>
                <td class="font-mono text-sm">{{ c.code }}</td>
                <td class="font-bold">{{ c.name }}</td>
                <td><span class="brand-badge">{{ c.brand }}</span></td>
                <td>{{ c.category }}</td>
                <td>
                  <span class="hex-pill">{{ c.hex }}</span>
                </td>
                <td>
                  <span *ngIf="c.popular" class="badge badge-warning">Yes</span>
                  <span *ngIf="!c.popular" class="text-subtle text-xs">No</span>
                </td>
                <td>
                  <button (click)="deleteColor(c)" class="btn-icon-sm text-danger" title="Delete shade">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 2: Wallpapers & Patterns Manager -->
      <div *ngIf="activeTab === 'patterns'" class="tab-pane card">
        <div class="patterns-admin-grid">
          <div *ngFor="let p of patterns" class="pattern-admin-card card">
            <div class="pattern-preview-box" [innerHTML]="p.svgPattern"></div>
            <div class="flex items-center justify-between mt-2">
              <div>
                <span class="font-bold block text-sm">{{ p.name }}</span>
                <span class="text-xs text-subtle">{{ p.category }} • {{ p.code }}</span>
              </div>
              <button (click)="deletePattern(p)" class="btn-icon-sm text-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: Recent Activity Log -->
      <div *ngIf="activeTab === 'activity'" class="tab-pane card">
        <h3 class="text-lg font-bold mb-3">Recent Saved Room Design Actions</h3>
        <div class="activity-list flex flex-col gap-3">
          <div *ngFor="let item of stats?.recentProjects" class="activity-item flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="activity-dot"></div>
              <div>
                <span class="font-bold block text-sm">{{ item.title }}</span>
                <span class="text-xs text-subtle">{{ item.roomType }} • {{ item.wallsCount }} wall zone(s)</span>
              </div>
            </div>
            <span class="text-xs text-subtle">{{ formatDate(item.updatedAt || item.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- ADD NEW COLOR MODAL -->
      <div *ngIf="openAddColorModal" class="modal-backdrop flex items-center justify-center animate-fade">
        <div class="modal-card glass-panel">
          <div class="modal-header flex items-center justify-between mb-4">
            <h3 class="modal-title">Add New Paint Color Shade</h3>
            <button (click)="openAddColorModal = false" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="modal-body flex flex-col gap-3">
            <div class="form-group">
              <label class="form-label">Shade Name *</label>
              <input [(ngModel)]="newColor.name" placeholder="e.g. Aegean Breeze" class="form-input">
            </div>

            <div class="grid-2 gap-3">
              <div class="form-group">
                <label class="form-label">Shade Code</label>
                <input [(ngModel)]="newColor.code" placeholder="e.g. BL-205" class="form-input">
              </div>

              <div class="form-group">
                <label class="form-label">Color HEX *</label>
                <div class="flex items-center gap-2">
                  <input type="color" [(ngModel)]="newColor.hex" class="color-picker-input">
                  <input [(ngModel)]="newColor.hex" placeholder="#1E3A5F" class="form-input flex-1">
                </div>
              </div>
            </div>

            <div class="grid-2 gap-3">
              <div class="form-group">
                <label class="form-label">Brand</label>
                <select [(ngModel)]="newColor.brand" class="form-select">
                  <option value="Behr">Behr</option>
                  <option value="Asian Paints">Asian Paints</option>
                  <option value="Dulux">Dulux</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Color Family</label>
                <select [(ngModel)]="newColor.category" class="form-select">
                  <option value="Warm Neutrals">Warm Neutrals</option>
                  <option value="Ocean Blues">Ocean Blues</option>
                  <option value="Forest & Sage Greens">Forest & Sage Greens</option>
                  <option value="Terracotta & Warmth">Terracotta & Warmth</option>
                  <option value="Pastels & Blushes">Pastels & Blushes</option>
                  <option value="Crisp Whites & Greys">Crisp Whites & Greys</option>
                  <option value="Royal & Dramatic">Royal & Dramatic</option>
                </select>
              </div>
            </div>

            <label class="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" [(ngModel)]="newColor.popular">
              <span class="form-label m-0">Mark as Trending / Popular</span>
            </label>
          </div>

          <div class="modal-footer flex items-center justify-between mt-6 pt-4">
            <button (click)="openAddColorModal = false" class="btn btn-secondary">Cancel</button>
            <button (click)="submitNewColor()" class="btn btn-primary">Save Paint Shade</button>
          </div>
        </div>
      </div>

      <!-- Toast Feedback -->
      <div *ngIf="toastMsg" class="toast-feedback animate-fade">
        <i class="fa-solid fa-check"></i>
        <span>{{ toastMsg }}</span>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 2rem 1.5rem 5rem;
    }
    .page-title {
      font-size: 2.2rem;
      font-weight: 800;
    }
    .page-subtitle {
      font-size: 0.95rem;
      color: var(--text-muted);
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .kpi-card {
      padding: 1.5rem;
    }
    .kpi-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .kpi-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .kpi-value {
      font-family: var(--font-heading);
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0.75rem 0 0.25rem;
    }
    .kpi-trend {
      font-size: 0.8rem;
      font-weight: 600;
    }
    .kpi-subtext {
      font-size: 0.8rem;
      color: var(--text-subtle);
    }
    .admin-tabs {
      background: var(--bg-card);
      padding: 0.35rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
      width: fit-content;
    }
    .admin-tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.1rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);
    }
    .admin-tab-btn.active {
      background: var(--accent-primary);
      color: #FFFFFF;
    }
    .search-input {
      width: 280px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .data-table th {
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }
    .data-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--border-subtle);
      font-size: 0.9rem;
    }
    .table-swatch {
      display: block;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
    }
    .brand-badge {
      font-size: 0.75rem;
      background: var(--bg-card-hover);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      color: #38BDF8;
    }
    .hex-pill {
      font-family: monospace;
      font-size: 0.8rem;
      background: var(--bg-card);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .patterns-admin-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
    .pattern-admin-card {
      padding: 0.75rem;
    }
    .pattern-preview-box {
      height: 90px;
      background: #FFFFFF;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .activity-item {
      padding: 0.75rem 1rem;
      background: var(--bg-card);
      border-radius: var(--radius-md);
    }
    .activity-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #38BDF8;
    }
    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(9, 13, 22, 0.82);
      backdrop-filter: blur(8px);
      z-index: 200;
      padding: 1rem;
    }
    .modal-card {
      width: 100%;
      max-width: 500px;
      background: var(--bg-surface);
      border: 1px solid var(--border-highlight);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .toast-feedback {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #10B981;
      color: #FFFFFF;
      padding: 0.7rem 1.4rem;
      border-radius: var(--radius-full);
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 999;
    }
    @media (max-width: 1024px) {
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
      .patterns-admin-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class AdminComponent implements OnInit {
  activeTab: 'shades' | 'patterns' | 'activity' = 'shades';
  stats: any = null;
  colors: PaintColor[] = [];
  patterns: WallpaperPattern[] = [];

  searchColorQuery = '';
  openAddColorModal = false;

  newColor = {
    name: '',
    code: '',
    hex: '#3B82F6',
    brand: 'Behr',
    category: 'Ocean Blues',
    popular: false
  };

  toastMsg = '';

  constructor(
    private paintService: PaintService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadColorsAndPatterns();
  }

  loadStats() {
    this.paintService.getAdminStats().subscribe({
      next: (s) => (this.stats = s),
      error: () => {}
    });
  }

  loadColorsAndPatterns() {
    this.paintService.getColors().subscribe(c => (this.colors = c));
    this.paintService.getPatterns().subscribe(p => (this.patterns = p));
  }

  getFilteredColors(): PaintColor[] {
    if (!this.searchColorQuery.trim()) return this.colors;
    const q = this.searchColorQuery.toLowerCase();
    return this.colors.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.code.toLowerCase().includes(q) ||
      c.hex.toLowerCase().includes(q)
    );
  }

  submitNewColor() {
    if (!this.newColor.name || !this.newColor.hex) {
      alert('Please fill in shade name and color hex');
      return;
    }

    this.paintService.addColor(this.newColor).subscribe({
      next: (res) => {
        this.colors.unshift(res.color);
        this.openAddColorModal = false;
        this.showToast(`Added ${res.color.name} to paint catalog`);
        this.newColor = {
          name: '',
          code: '',
          hex: '#3B82F6',
          brand: 'Behr',
          category: 'Ocean Blues',
          popular: false
        };
      },
      error: () => {
        this.showToast('Failed to add color');
      }
    });
  }

  deleteColor(c: PaintColor) {
    const id = c._id || c.code;
    if (confirm(`Remove "${c.name}" from catalog?`)) {
      this.paintService.deleteColor(id).subscribe(() => {
        this.colors = this.colors.filter(item => (item._id || item.code) !== id);
        this.showToast(`Deleted ${c.name}`);
      });
    }
  }

  deletePattern(p: WallpaperPattern) {
    const id = p._id || p.code;
    if (confirm(`Remove pattern "${p.name}"?`)) {
      this.paintService.deletePattern(id).subscribe(() => {
        this.patterns = this.patterns.filter(item => (item._id || item.code) !== id);
        this.showToast(`Deleted ${p.name}`);
      });
    }
  }

  formatDate(d?: string) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  showToast(msg: string) {
    this.toastMsg = msg;
    setTimeout(() => {
      if (this.toastMsg === msg) this.toastMsg = '';
    }, 3000);
  }
}
