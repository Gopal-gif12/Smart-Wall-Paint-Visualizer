import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaintService } from '../../services/paint.service';
import { AuthService } from '../../services/auth.service';
import { PaintColor } from '../../models/color.model';
import { WallpaperPattern } from '../../models/pattern.model';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="colors-page container">
      <!-- Top Title & Navigation Tabs -->
      <div class="page-header flex items-center justify-between mb-6">
        <div>
          <span class="badge badge-primary">Color Library</span>
          <h1 class="page-title mt-1">Curated Shades & Wallpapers</h1>
          <p class="page-subtitle">Authentic color formulas matched to Behr, Asian Paints, and Dulux collections.</p>
        </div>

        <div class="tabs-pill flex items-center">
          <button 
            (click)="activeTab = 'colors'" 
            class="tab-btn" 
            [class.active]="activeTab === 'colors'"
          >
            <i class="fa-solid fa-palette"></i>
            <span>Paint Colors ({{ colors.length }})</span>
          </button>
          <button 
            (click)="activeTab = 'patterns'" 
            class="tab-btn" 
            [class.active]="activeTab === 'patterns'"
          >
            <i class="fa-solid fa-border-all"></i>
            <span>Wallpapers ({{ patterns.length }})</span>
          </button>
        </div>
      </div>

      <!-- TAB 1: PAINT COLORS -->
      <div *ngIf="activeTab === 'colors'" class="tab-content animate-fade">
        <!-- Search, Brand & Category Filter Bar -->
        <div class="filter-bar card mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3 flex-1">
            <!-- Search -->
            <div class="search-box flex-1">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input 
                [(ngModel)]="searchQuery" 
                (input)="applyFilters()" 
                placeholder="Search shades by name, code (e.g. BL-201), or hex (#1E3A5F)..."
                class="form-input search-field"
              >
            </div>

            <!-- Category Dropdown -->
            <select [(ngModel)]="selectedCategory" (change)="applyFilters()" class="form-select select-w">
              <option value="All">All Color Families</option>
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Brand Pills -->
          <div class="brand-pills flex items-center gap-1 ml-4">
            <button 
              *ngFor="let b of ['All', 'Behr', 'Asian Paints', 'Dulux']" 
              (click)="selectedBrand = b; applyFilters()"
              class="brand-pill-btn"
              [class.active]="selectedBrand === b"
            >
              {{ b }}
            </button>
          </div>
        </div>

        <!-- Color Cards Grid -->
        <div class="colors-grid">
          <div *ngFor="let color of filteredColors" class="color-card card">
            <!-- Swatch Tile -->
            <div class="swatch-tile" [style.background-color]="color.hex">
              <button 
                (click)="toggleFavorite(color.code)" 
                class="fav-btn"
                [class.favorited]="isFavorited(color.code)"
                title="Save to favorites"
              >
                <i [class]="isFavorited(color.code) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
              </button>
              <span *ngIf="color.popular" class="popular-tag">Trending</span>
            </div>

            <!-- Card Info -->
            <div class="card-body">
              <div class="flex items-center justify-between mb-1">
                <span class="color-brand">{{ color.brand }}</span>
                <span class="color-code">{{ color.code }}</span>
              </div>
              <h3 class="color-name">{{ color.name }}</h3>

              <div class="color-specs flex items-center justify-between mt-2">
                <button (click)="copyHex(color.hex)" class="hex-badge" title="Copy HEX to clipboard">
                  <span>{{ color.hex }}</span>
                  <i class="fa-regular fa-copy"></i>
                </button>
                <span class="rgb-text">RGB: {{ color.rgb }}</span>
              </div>

              <!-- Tags -->
              <div class="room-tags flex items-center gap-1 mt-3">
                <span *ngFor="let tag of color.tags?.slice(0, 2)" class="room-tag">{{ tag }}</span>
              </div>

              <!-- Try in Studio CTA Button -->
              <button (click)="tryInStudio(color)" class="btn btn-primary btn-sm mt-4 w-full">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>Try in Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: WALLPAPERS & PATTERNS -->
      <div *ngIf="activeTab === 'patterns'" class="tab-content animate-fade">
        <div class="patterns-grid">
          <div *ngFor="let p of patterns" class="pattern-item card">
            <div class="pattern-display" [innerHTML]="p.svgPattern"></div>
            <div class="pattern-body">
              <span class="badge badge-neutral mb-1">{{ p.category }}</span>
              <h3 class="pattern-title">{{ p.name }}</h3>
              <p class="pattern-desc">{{ p.description }}</p>
              <div class="pattern-meta flex items-center justify-between mt-3">
                <span class="text-xs text-subtle">Style: {{ p.style }}</span>
                <span class="text-xs text-subtle">Scale: {{ p.scale }}px</span>
              </div>
              <a routerLink="/visualizer" class="btn btn-secondary btn-sm mt-3 w-full">
                <i class="fa-solid fa-brush"></i>
                <span>Apply in Studio</span>
              </a>
            </div>
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
    .colors-page {
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
    .tabs-pill {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: 0.25rem;
    }
    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.1rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      border-radius: var(--radius-full);
      transition: all var(--transition-fast);
    }
    .tab-btn.active {
      background: var(--accent-primary);
      color: #FFFFFF;
      box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4);
    }
    .filter-bar {
      padding: 0.85rem 1.25rem;
    }
    .search-box {
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-subtle);
    }
    .search-field {
      padding-left: 2.5rem;
      width: 100%;
    }
    .select-w {
      min-width: 180px;
    }
    .brand-pill-btn {
      padding: 0.35rem 0.85rem;
      font-size: 0.82rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      background: var(--bg-card-hover);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
      transition: all var(--transition-fast);
    }
    .brand-pill-btn.active {
      background: rgba(56, 189, 248, 0.18);
      border-color: #38BDF8;
      color: #38BDF8;
    }
    .colors-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .color-card {
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .swatch-tile {
      height: 140px;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .fav-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(6px);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }
    .fav-btn.favorited {
      color: #EC4899;
    }
    .popular-tag {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #FBBF24;
    }
    .card-body {
      padding: 1.25rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .color-brand {
      font-size: 0.75rem;
      font-weight: 600;
      color: #38BDF8;
      text-transform: uppercase;
    }
    .color-code {
      font-size: 0.75rem;
      color: var(--text-subtle);
    }
    .color-name {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .hex-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--text-main);
      transition: all var(--transition-fast);
    }
    .hex-badge:hover {
      border-color: var(--accent-primary);
    }
    .rgb-text {
      font-size: 0.72rem;
      color: var(--text-subtle);
    }
    .room-tags {
      flex-wrap: wrap;
    }
    .room-tag {
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      color: var(--text-subtle);
    }
    .w-full { width: 100%; }

    /* Patterns Grid */
    .patterns-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .pattern-item {
      padding: 0;
      overflow: hidden;
    }
    .pattern-display {
      height: 160px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .pattern-body {
      padding: 1.25rem;
    }
    .pattern-title {
      font-size: 1.1rem;
      margin-bottom: 0.35rem;
    }
    .pattern-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
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

    @media (max-width: 1200px) {
      .colors-grid { grid-template-columns: repeat(3, 1fr); }
      .patterns-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 800px) {
      .colors-grid { grid-template-columns: repeat(2, 1fr); }
      .patterns-grid { grid-template-columns: 1fr; }
      .filter-bar { flex-direction: column; align-items: stretch; gap: 1rem; }
    }
    @media (max-width: 500px) {
      .colors-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ColorsComponent implements OnInit {
  activeTab: 'colors' | 'patterns' = 'colors';
  colors: PaintColor[] = [];
  filteredColors: PaintColor[] = [];
  patterns: WallpaperPattern[] = [];
  categories: string[] = [];

  searchQuery = '';
  selectedCategory = 'All';
  selectedBrand = 'All';
  toastMsg = '';

  constructor(
    private paintService: PaintService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.paintService.getColors().subscribe(colors => {
      this.colors = colors;
      this.filteredColors = colors;
      this.categories = Array.from(new Set(colors.map(c => c.category))).sort();
    });

    this.paintService.getPatterns().subscribe(patterns => {
      this.patterns = patterns;
    });
  }

  applyFilters() {
    let list = [...this.colors];
    if (this.selectedCategory !== 'All') {
      list = list.filter(c => c.category === this.selectedCategory);
    }
    if (this.selectedBrand !== 'All') {
      list = list.filter(c => c.brand === this.selectedBrand);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.hex.toLowerCase().includes(q)
      );
    }
    this.filteredColors = list;
  }

  copyHex(hex: string) {
    navigator.clipboard.writeText(hex);
    this.showToast(`Copied ${hex} to clipboard!`);
  }

  isFavorited(code: string): boolean {
    const u = this.authService.currentUser();
    return !!u && !!u.favoriteColors && u.favoriteColors.includes(code);
  }

  toggleFavorite(code: string) {
    if (!this.authService.isLoggedIn) {
      this.showToast('Please sign in to save your favorite shades!');
      return;
    }
    this.authService.toggleFavorite(code).subscribe(() => {
      this.showToast('Favorites updated');
    });
  }

  tryInStudio(color: PaintColor) {
    // Navigate to visualizer studio
    this.router.navigate(['/visualizer']);
  }

  showToast(msg: string) {
    this.toastMsg = msg;
    setTimeout(() => {
      if (this.toastMsg === msg) this.toastMsg = '';
    }, 3000);
  }
}
