import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CanvasService } from '../../services/canvas.service';
import { PaintService } from '../../services/paint.service';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { PaintColor, PaintFinish } from '../../models/color.model';
import { WallpaperPattern } from '../../models/pattern.model';
import { WallLayer, Point2D, SampleRoom, RoomProject } from '../../models/project.model';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="visualizer-page">
      <!-- Studio Top Action Bar -->
      <div class="studio-topbar glass-panel flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button (click)="fileInput.click()" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <span>Upload Room Photo</span>
          </button>
          <input #fileInput type="file" accept="image/png, image/jpeg, image/webp" (change)="onFileUpload($event)" style="display: none">

          <!-- Sample Room Quick Dropdown -->
          <div class="flex items-center gap-2">
            <label class="topbar-label">Template:</label>
            <select [(ngModel)]="selectedSampleId" (change)="loadSampleRoom(selectedSampleId)" class="form-select select-sm">
              <option value="custom" disabled *ngIf="isCustomImage">Custom Uploaded Photo</option>
              <option *ngFor="let s of sampleRooms" [value]="s.id">{{ s.name }} ({{ s.type }})</option>
            </select>
          </div>
        </div>

        <!-- Project Title -->
        <div class="project-title-box flex items-center gap-2">
          <input [(ngModel)]="projectTitle" class="title-input" placeholder="Project Name (e.g., Living Room Makeover)">
          <span class="badge badge-neutral">{{ roomType }}</span>
        </div>

        <!-- Top Right Actions -->
        <div class="flex items-center gap-2">
          <button (click)="openCompare()" class="btn btn-secondary btn-sm" title="Interactive Before & After slider">
            <i class="fa-solid fa-table-columns"></i>
            <span>Compare</span>
          </button>
          <button (click)="exportImage()" class="btn btn-secondary btn-sm" title="Download high-resolution image with color card">
            <i class="fa-solid fa-download"></i>
            <span>Export Plan</span>
          </button>
          <button (click)="saveProject()" [disabled]="isSaving" class="btn btn-accent btn-sm">
            <i class="fa-solid" [class.fa-floppy-disk]="!isSaving" [class.fa-spinner]="isSaving" [class.fa-spin]="isSaving"></i>
            <span>{{ isSaving ? 'Saving...' : 'Save Design' }}</span>
          </button>
        </div>
      </div>

      <!-- Main Studio Workspace Grid -->
      <div class="studio-workspace">
        
        <!-- Left: Interactive Canvas Viewport -->
        <div class="canvas-viewport card">
          <!-- Canvas Toolbar Floating Pill -->
          <div class="canvas-toolbar glass-panel flex items-center justify-between">
            <div class="flex items-center gap-1">
              <button 
                (click)="activeTool = 'polygon'" 
                class="tool-btn" 
                [class.active]="activeTool === 'polygon'"
                title="Polygon Wall Selection (Click to add points, click start to close)"
              >
                <i class="fa-solid fa-draw-polygon"></i>
                <span>Polygon Tool</span>
              </button>

              <button 
                (click)="activeTool = 'brush'" 
                class="tool-btn" 
                [class.active]="activeTool === 'brush'"
                title="Freehand Brush tool"
              >
                <i class="fa-solid fa-paintbrush"></i>
                <span>Brush</span>
              </button>

              <button 
                (click)="activeTool = 'eraser'" 
                class="tool-btn" 
                [class.active]="activeTool === 'eraser'"
                title="Eraser tool"
              >
                <i class="fa-solid fa-eraser"></i>
                <span>Eraser</span>
              </button>

              <div class="tool-divider"></div>

              <button (click)="undo()" [disabled]="historyIndex <= 0" class="tool-btn-icon" title="Undo">
                <i class="fa-solid fa-rotate-left"></i>
              </button>
              <button (click)="redo()" [disabled]="historyIndex >= history.length - 1" class="tool-btn-icon" title="Redo">
                <i class="fa-solid fa-rotate-right"></i>
              </button>
              <button (click)="clearCurrentWallMask()" class="tool-btn-icon text-danger" title="Clear active wall outline">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

            <!-- Hint text -->
            <div class="canvas-hint">
              <span *ngIf="activeTool === 'polygon' && !isPolygonClosed">
                <i class="fa-regular fa-hand-pointer"></i> Click wall corners to outline. Click first point (green) to close.
              </span>
              <span *ngIf="activeTool === 'polygon' && isPolygonClosed">
                <i class="fa-solid fa-circle-check text-success"></i> Wall enclosed. Drag points to adjust or choose paint!
              </span>
              <span *ngIf="activeTool === 'brush'">
                <i class="fa-solid fa-paint-brush"></i> Click & drag freehand over wall area.
              </span>
            </div>
          </div>

          <!-- Canvas Element -->
          <div class="canvas-wrapper" #canvasWrapper>
            <canvas 
              #mainCanvas 
              (mousedown)="onCanvasMouseDown($event)"
              (mousemove)="onCanvasMouseMove($event)"
              (mouseup)="onCanvasMouseUp($event)"
              (mouseleave)="onCanvasMouseLeave($event)"
              class="main-canvas"
            ></canvas>
          </div>

          <!-- Notification Banner -->
          <div *ngIf="statusMessage" class="status-toast animate-fade">
            <i class="fa-solid fa-circle-info"></i>
            <span>{{ statusMessage }}</span>
          </div>
        </div>

        <!-- Right: Wall Layers & Color Palettes Panel -->
        <div class="studio-sidebar flex flex-col gap-4">

          <!-- Section 1: Wall Layers Selector -->
          <div class="sidebar-section card">
            <div class="section-title-row flex items-center justify-between mb-3">
              <h4 class="section-heading">Wall Zones</h4>
              <button (click)="addNewWallLayer()" class="btn btn-secondary btn-sm" title="Add another wall zone">
                <i class="fa-solid fa-plus"></i>
                <span>Add Wall</span>
              </button>
            </div>

            <div class="wall-layers-list flex flex-col gap-2">
              <div 
                *ngFor="let wall of walls; let idx = index" 
                class="wall-layer-item flex items-center justify-between"
                [class.active]="activeWallIndex === idx"
                (click)="switchActiveWall(idx)"
              >
                <div class="flex items-center gap-3">
                  <span class="wall-color-preview" [style.background-color]="wall.color?.hex || '#6366F1'"></span>
                  <div>
                    <span class="wall-name">{{ wall.name }}</span>
                    <span class="wall-meta">
                      {{ wall.polygon.length }} pts • {{ wall.finish }} • {{ (wall.opacity * 100).toFixed(0) }}%
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-1" (click)="$event.stopPropagation()">
                  <button *ngIf="walls.length > 1" (click)="removeWallLayer(idx)" class="btn-icon-sm" title="Remove this wall layer">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Paint Finish, Opacity & Dual Tone -->
          <div class="sidebar-section card">
            <h4 class="section-heading mb-3">Finish & Effects</h4>
            
            <!-- Opacity Slider -->
            <div class="form-group mb-3">
              <div class="flex items-center justify-between">
                <label class="form-label">Color Opacity</label>
                <span class="slider-val">{{ (currentWall.opacity * 100).toFixed(0) }}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05" 
                [(ngModel)]="currentWall.opacity" 
                (input)="renderCanvas()"
              >
            </div>

            <!-- Finish Type Radio Pills -->
            <div class="form-group mb-3">
              <label class="form-label">Sheen Finish</label>
              <div class="finish-pills flex items-center gap-1">
                <button 
                  *ngFor="let f of finishTypes" 
                  (click)="setWallFinish(f)"
                  class="finish-pill"
                  [class.active]="currentWall.finish === f"
                >
                  {{ f | titlecase }}
                </button>
              </div>
            </div>

            <!-- Dual-Tone Wall Toggle -->
            <div class="dual-tone-box">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" [(ngModel)]="dualTone.enabled" (change)="renderCanvas()">
                  <span class="form-label m-0">Dual-Tone Accent Wall</span>
                </label>
                <span *ngIf="dualTone.enabled" class="badge badge-primary">Active</span>
              </div>

              <div *ngIf="dualTone.enabled" class="dual-tone-controls mt-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-subtle text-xs">Secondary Split Color:</span>
                  <input type="color" [(ngModel)]="dualTone.secondaryColor" (input)="renderCanvas()" class="color-picker-input">
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <button 
                    (click)="dualTone.orientation = 'horizontal'; renderCanvas()" 
                    class="btn btn-secondary btn-sm flex-1"
                    [class.active-split]="dualTone.orientation === 'horizontal'"
                  >
                    Horizontal Split
                  </button>
                  <button 
                    (click)="dualTone.orientation = 'vertical'; renderCanvas()" 
                    class="btn btn-secondary btn-sm flex-1"
                    [class.active-split]="dualTone.orientation === 'vertical'"
                  >
                    Vertical Split
                  </button>
                </div>
                <div class="form-group mb-0">
                  <div class="flex items-center justify-between">
                    <span class="text-subtle text-xs">Split Position</span>
                    <span class="slider-val">{{ (dualTone.splitRatio * 100).toFixed(0) }}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="0.8" 
                    step="0.05" 
                    [(ngModel)]="dualTone.splitRatio" 
                    (input)="renderCanvas()"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: Color Palette & Wallpaper Drawer -->
          <div class="sidebar-section card flex-1 flex flex-col">
            <div class="tabs-header flex items-center gap-2 mb-3">
              <button 
                (click)="paletteTab = 'colors'" 
                class="tab-btn" 
                [class.active]="paletteTab === 'colors'"
              >
                <i class="fa-solid fa-palette"></i>
                <span>Paint Shades ({{ filteredColors.length }})</span>
              </button>
              <button 
                (click)="paletteTab = 'patterns'" 
                class="tab-btn" 
                [class.active]="paletteTab === 'patterns'"
              >
                <i class="fa-solid fa-border-all"></i>
                <span>Wallpapers</span>
              </button>
            </div>

            <!-- TAB 1: Paint Colors -->
            <div *ngIf="paletteTab === 'colors'" class="palette-tab flex-1 flex flex-col">
              <!-- Search & Filter Controls -->
              <div class="palette-filters flex items-center gap-2 mb-3">
                <input 
                  [(ngModel)]="searchQuery" 
                  (input)="filterColors()" 
                  placeholder="Search name, code, hex..." 
                  class="form-input search-sm flex-1"
                >
                <select [(ngModel)]="selectedCategory" (change)="filterColors()" class="form-select select-sm">
                  <option value="All">All Categories</option>
                  <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
                </select>
              </div>

              <!-- Brand Filter Buttons -->
              <div class="brand-pills flex items-center gap-1 mb-3">
                <button 
                  *ngFor="let b of ['All', 'Behr', 'Asian Paints', 'Dulux']" 
                  (click)="selectedBrand = b; filterColors()"
                  class="brand-pill"
                  [class.active]="selectedBrand === b"
                >
                  {{ b }}
                </button>
              </div>

              <!-- Color Swatches Grid -->
              <div class="swatches-grid">
                <button 
                  *ngFor="let color of filteredColors" 
                  (click)="applyColor(color)"
                  class="swatch-card"
                  [class.selected]="currentWall.color?.code === color.code"
                  [title]="color.name + ' (' + color.code + ')'"
                >
                  <span class="swatch-color-circle" [style.background-color]="color.hex"></span>
                  <span class="swatch-name">{{ color.name }}</span>
                  <span class="swatch-code">{{ color.code }}</span>
                </button>
              </div>
            </div>

            <!-- TAB 2: Wallpaper Patterns -->
            <div *ngIf="paletteTab === 'patterns'" class="patterns-tab">
              <p class="text-subtle text-xs mb-3">Select seamless decorative wallpaper texture overlay:</p>
              <div class="patterns-grid">
                <div 
                  *ngFor="let p of patterns" 
                  (click)="applyPattern(p)"
                  class="pattern-card card"
                  [class.selected]="currentWall.pattern === p.code"
                >
                  <div class="pattern-preview" [innerHTML]="p.svgPattern"></div>
                  <span class="pattern-name">{{ p.name }}</span>
                  <span class="pattern-cat">{{ p.category }} • {{ p.style }}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .visualizer-page {
      padding: 1rem 1.5rem 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .studio-topbar {
      padding: 0.75rem 1.25rem;
    }
    .topbar-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .select-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }
    .project-title-box {
      flex: 1;
      max-width: 380px;
      margin: 0 1.5rem;
    }
    .title-input {
      background: transparent;
      border: none;
      border-bottom: 1px dashed var(--border-highlight);
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-main);
      padding: 0.2rem 0;
      width: 100%;
    }
    .title-input:focus {
      outline: none;
      border-bottom-color: var(--accent-primary);
    }
    .studio-workspace {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 1.25rem;
      align-items: start;
    }
    .canvas-viewport {
      padding: 0.75rem;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .canvas-toolbar {
      padding: 0.5rem 0.85rem;
      margin-bottom: 0.75rem;
    }
    .tool-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      transition: all var(--transition-fast);
    }
    .tool-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.06);
    }
    .tool-btn.active {
      background: var(--accent-primary);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
    }
    .tool-divider {
      width: 1px;
      height: 24px;
      background: var(--border-subtle);
      margin: 0 0.4rem;
    }
    .tool-btn-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      transition: all var(--transition-fast);
    }
    .tool-btn-icon:hover:not(:disabled) {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
    }
    .tool-btn-icon:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .text-danger { color: #EF4444 !important; }
    .canvas-hint {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .text-success { color: #10B981; }
    .canvas-wrapper {
      width: 100%;
      height: 640px;
      background: #000000;
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .main-canvas {
      cursor: crosshair;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .status-toast {
      position: absolute;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(16, 22, 35, 0.95);
      border: 1px solid var(--accent-primary);
      box-shadow: var(--shadow-lg);
      padding: 0.6rem 1.25rem;
      border-radius: var(--radius-full);
      font-size: 0.88rem;
      font-weight: 500;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      z-index: 20;
    }
    /* Studio Sidebar */
    .studio-sidebar {
      height: calc(100vh - 150px);
      overflow-y: auto;
    }
    .sidebar-section {
      padding: 1.25rem;
    }
    .section-heading {
      font-size: 0.95rem;
      font-weight: 700;
    }
    .wall-layer-item {
      padding: 0.65rem 0.85rem;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .wall-layer-item:hover {
      background: var(--bg-card-hover);
    }
    .wall-layer-item.active {
      border-color: var(--accent-primary);
      background: rgba(99, 102, 241, 0.12);
    }
    .wall-color-preview {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    .wall-name {
      display: block;
      font-size: 0.88rem;
      font-weight: 600;
    }
    .wall-meta {
      display: block;
      font-size: 0.75rem;
      color: var(--text-subtle);
    }
    .btn-icon-sm {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-subtle);
      border-radius: 4px;
    }
    .btn-icon-sm:hover {
      color: #EF4444;
      background: rgba(239, 68, 68, 0.15);
    }
    .slider-val {
      font-size: 0.85rem;
      font-weight: 600;
      color: #38BDF8;
    }
    .finish-pills {
      display: flex;
      flex-wrap: wrap;
    }
    .finish-pill {
      flex: 1;
      padding: 0.4rem 0.2rem;
      font-size: 0.78rem;
      font-weight: 600;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      text-align: center;
      transition: all var(--transition-fast);
    }
    .finish-pill:hover {
      color: var(--text-main);
    }
    .finish-pill.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: #FFFFFF;
    }
    .dual-tone-box {
      background: rgba(15, 23, 42, 0.4);
      border: 1px dashed var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 0.85rem;
    }
    .color-picker-input {
      width: 40px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
    }
    .active-split {
      background: var(--accent-primary) !important;
      color: #FFFFFF !important;
    }
    .tab-btn {
      flex: 1;
      padding: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      border-bottom: 2px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all var(--transition-fast);
    }
    .tab-btn:hover {
      color: var(--text-main);
    }
    .tab-btn.active {
      color: #38BDF8;
      border-bottom-color: #38BDF8;
    }
    .brand-pills {
      display: flex;
      gap: 0.35rem;
    }
    .brand-pill {
      font-size: 0.75rem;
      padding: 0.25rem 0.55rem;
      border-radius: var(--radius-full);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }
    .brand-pill.active {
      background: rgba(56, 189, 248, 0.15);
      border-color: #38BDF8;
      color: #38BDF8;
    }
    .swatches-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.65rem;
      max-height: 260px;
      overflow-y: auto;
      padding-right: 0.35rem;
    }
    .swatch-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.6rem 0.35rem;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      text-align: center;
    }
    .swatch-card:hover {
      border-color: var(--border-highlight);
      transform: translateY(-2px);
    }
    .swatch-card.selected {
      border-color: #38BDF8;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
      background: rgba(56, 189, 248, 0.08);
    }
    .swatch-color-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-bottom: 0.4rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .swatch-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
    .swatch-code {
      font-size: 0.68rem;
      color: var(--text-subtle);
    }
    .patterns-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      max-height: 300px;
      overflow-y: auto;
    }
    .pattern-card {
      padding: 0.75rem;
      cursor: pointer;
      text-align: center;
    }
    .pattern-card.selected {
      border-color: var(--accent-paint);
      box-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
    }
    .pattern-preview {
      width: 100%;
      height: 60px;
      background: #FFFFFF;
      border-radius: var(--radius-sm);
      overflow: hidden;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pattern-name {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .pattern-cat {
      display: block;
      font-size: 0.7rem;
      color: var(--text-subtle);
    }
    @media (max-width: 1024px) {
      .studio-workspace {
        grid-template-columns: 1fr;
      }
      .studio-sidebar {
        height: auto;
      }
    }
  `]
})
export class VisualizerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainCanvas', { static: true }) mainCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasWrapper', { static: true }) canvasWrapperRef!: ElementRef<HTMLDivElement>;

  // Tool & Canvas State
  activeTool: 'polygon' | 'brush' | 'eraser' = 'polygon';
  activeWallIndex = 0;
  isPolygonClosed = false;
  hoverClose = false;
  draggingPointIdx = -1;
  isDrawingBrush = false;

  // Visualizer Layers & Settings
  projectTitle = 'My Modern Living Room';
  roomType = 'Living Room';
  selectedSampleId = 'sample-living-1';
  isCustomImage = false;
  customImageElement: HTMLImageElement | null = null;

  walls: WallLayer[] = [
    {
      name: 'Accent Wall',
      polygon: [
        { x: 0.15, y: 0.15 },
        { x: 0.85, y: 0.15 },
        { x: 0.85, y: 0.72 },
        { x: 0.15, y: 0.72 }
      ],
      color: { code: 'BL-201', name: 'Pacific Navy', hex: '#1E3A5F' },
      finish: 'matte',
      opacity: 0.86
    }
  ];

  dualTone = {
    enabled: false,
    secondaryColor: '#E8D8C8',
    orientation: 'horizontal' as 'horizontal' | 'vertical',
    splitRatio: 0.5
  };

  finishTypes: PaintFinish[] = ['matte', 'eggshell', 'satin', 'semi-gloss', 'glossy'];
  paletteTab: 'colors' | 'patterns' = 'colors';

  // Catalogs
  colors: PaintColor[] = [];
  filteredColors: PaintColor[] = [];
  categories: string[] = [];
  patterns: WallpaperPattern[] = [];
  sampleRooms: SampleRoom[] = [];

  // Filters
  searchQuery = '';
  selectedCategory = 'All';
  selectedBrand = 'All';

  // Undo / Redo History
  history: string[] = [];
  historyIndex = -1;

  statusMessage = '';
  isSaving = false;

  constructor(
    private canvasService: CanvasService,
    private paintService: PaintService,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get currentWall(): WallLayer {
    return this.walls[this.activeWallIndex] || this.walls[0];
  }

  ngOnInit() {
    this.loadCatalogs();
    this.route.queryParams.subscribe(params => {
      if (params['sampleId']) {
        this.selectedSampleId = params['sampleId'];
        this.loadSampleRoom(params['sampleId']);
      }
    });
  }

  ngAfterViewInit() {
    this.setupCanvasSize();
    this.renderCanvas();
    this.saveHistoryState();
  }

  setupCanvasSize() {
    const canvas = this.mainCanvasRef.nativeElement;
    const wrapper = this.canvasWrapperRef.nativeElement;
    canvas.width = wrapper.clientWidth || 900;
    canvas.height = wrapper.clientHeight || 640;
  }

  @HostListener('window:resize')
  onResize() {
    this.setupCanvasSize();
    this.renderCanvas();
  }

  loadCatalogs() {
    this.paintService.getColors().subscribe(colors => {
      this.colors = colors;
      this.filteredColors = colors;
      this.categories = Array.from(new Set(colors.map(c => c.category))).sort();
    });

    this.paintService.getPatterns().subscribe(patterns => {
      this.patterns = patterns;
    });

    this.projectService.getSampleRooms().subscribe(rooms => {
      this.sampleRooms = rooms;
    });
  }

  loadSampleRoom(roomId: string) {
    const room = this.sampleRooms.find(r => r.id === roomId);
    if (!room) return;

    this.isCustomImage = false;
    this.customImageElement = null;
    this.roomType = room.type;
    this.projectTitle = `${room.name} Design`;

    if (room.suggestedWalls && room.suggestedWalls.length > 0) {
      this.walls = room.suggestedWalls.map(sw => ({
        name: sw.name,
        polygon: JSON.parse(JSON.stringify(sw.polygon)),
        color: { code: 'CURATED', name: 'Curated Shade', hex: sw.defaultColor },
        finish: sw.defaultFinish,
        opacity: 0.86
      }));
      this.activeWallIndex = 0;
      this.isPolygonClosed = true;
    }

    this.renderCanvas();
    this.saveHistoryState();
    this.showToast(`Loaded ${room.name} template with suggested walls`);
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        this.customImageElement = img;
        this.isCustomImage = true;
        this.selectedSampleId = 'custom';
        this.projectTitle = file.name.replace(/\.[^/.]+$/, '') + ' Renovation';
        
        // Reset wall polygon for user to mark manually
        this.walls = [
          {
            name: 'Wall 1',
            polygon: [],
            color: this.currentWall.color || { code: 'BL-201', name: 'Pacific Navy', hex: '#1E3A5F' },
            finish: 'matte',
            opacity: 0.86
          }
        ];
        this.activeWallIndex = 0;
        this.isPolygonClosed = false;

        this.renderCanvas();
        this.saveHistoryState();
        this.showToast('Room photo uploaded! Click corners with the Polygon Tool to mark walls.');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  renderCanvas() {
    const canvas = this.mainCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Base Room
    if (this.isCustomImage && this.customImageElement) {
      ctx.drawImage(this.customImageElement, 0, 0, canvas.width, canvas.height);
    } else {
      this.canvasService.drawSampleRoom(ctx, canvas.width, canvas.height, this.roomType);
    }

    // 2. Apply Paint to Each Wall Layer
    this.walls.forEach((wall, idx) => {
      const isCurrentActive = idx === this.activeWallIndex;
      this.canvasService.applyWallColor(
        ctx,
        wall,
        canvas.width,
        canvas.height,
        isCurrentActive && this.dualTone.enabled ? this.dualTone : undefined
      );
    });

    // 3. Draw Polygon Guides for Active Wall (if in polygon mode)
    if (this.activeTool === 'polygon') {
      this.canvasService.drawSelectionGuides(
        ctx,
        this.currentWall.polygon,
        canvas.width,
        canvas.height,
        this.isPolygonClosed,
        this.hoverClose,
        this.draggingPointIdx
      );
    }
  }

  // Canvas Mouse Interactions
  onCanvasMouseDown(event: MouseEvent) {
    if (this.activeTool !== 'polygon') return;

    const coords = this.getCanvasNormalizedCoords(event);
    const canvas = this.mainCanvasRef.nativeElement;
    const poly = this.currentWall.polygon;

    // Check if clicking existing point to drag
    for (let i = 0; i < poly.length; i++) {
      const px = poly[i].x * canvas.width;
      const py = poly[i].y * canvas.height;
      const ex = coords.x * canvas.width;
      const ey = coords.y * canvas.height;
      if (Math.hypot(px - ex, py - ey) < 12) {
        if (i === 0 && !this.isPolygonClosed && poly.length >= 3) {
          // Close polygon!
          this.isPolygonClosed = true;
          this.hoverClose = false;
          this.renderCanvas();
          this.saveHistoryState();
          this.showToast('Wall selection closed! Choose your paint shade.');
          return;
        }
        this.draggingPointIdx = i;
        return;
      }
    }

    // If not closed, add new point
    if (!this.isPolygonClosed) {
      poly.push({ x: coords.x, y: coords.y });
      this.renderCanvas();
      this.saveHistoryState();
    }
  }

  onCanvasMouseMove(event: MouseEvent) {
    const coords = this.getCanvasNormalizedCoords(event);
    const canvas = this.mainCanvasRef.nativeElement;
    const poly = this.currentWall.polygon;

    // If dragging an existing vertex
    if (this.draggingPointIdx >= 0) {
      poly[this.draggingPointIdx] = { x: coords.x, y: coords.y };
      this.renderCanvas();
      return;
    }

    // Check hover on first point to close
    if (!this.isPolygonClosed && poly.length >= 3) {
      const first = poly[0];
      const fx = first.x * canvas.width;
      const fy = first.y * canvas.height;
      const ex = coords.x * canvas.width;
      const ey = coords.y * canvas.height;
      const dist = Math.hypot(fx - ex, fy - ey);
      const isNear = dist < 15;
      if (this.hoverClose !== isNear) {
        this.hoverClose = isNear;
        this.renderCanvas();
      }
    }
  }

  onCanvasMouseUp(event: MouseEvent) {
    if (this.draggingPointIdx >= 0) {
      this.draggingPointIdx = -1;
      this.saveHistoryState();
    }
  }

  onCanvasMouseLeave(event: MouseEvent) {
    this.draggingPointIdx = -1;
    this.hoverClose = false;
  }

  private getCanvasNormalizedCoords(event: MouseEvent): Point2D {
    const canvas = this.mainCanvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    return {
      x: Math.max(0, Math.min(1, clientX / rect.width)),
      y: Math.max(0, Math.min(1, clientY / rect.height))
    };
  }

  // Wall Layer Actions
  addNewWallLayer() {
    const num = this.walls.length + 1;
    this.walls.push({
      name: `Wall ${num}`,
      polygon: [],
      color: { code: 'WN-101', name: 'Tuscan Beige', hex: '#E8D8C8' },
      finish: 'matte',
      opacity: 0.86
    });
    this.activeWallIndex = this.walls.length - 1;
    this.isPolygonClosed = false;
    this.renderCanvas();
    this.showToast(`Created ${this.currentWall.name}. Outline its area on canvas.`);
  }

  switchActiveWall(idx: number) {
    this.activeWallIndex = idx;
    this.isPolygonClosed = this.currentWall.polygon.length >= 3;
    this.renderCanvas();
  }

  removeWallLayer(idx: number) {
    if (this.walls.length <= 1) return;
    this.walls.splice(idx, 1);
    this.activeWallIndex = Math.max(0, this.activeWallIndex - 1);
    this.renderCanvas();
    this.saveHistoryState();
  }

  clearCurrentWallMask() {
    this.currentWall.polygon = [];
    this.isPolygonClosed = false;
    this.renderCanvas();
    this.saveHistoryState();
    this.showToast('Cleared active wall outline.');
  }

  // Paint Selection
  applyColor(color: PaintColor) {
    this.currentWall.color = {
      code: color.code,
      name: color.name,
      hex: color.hex
    };
    this.currentWall.pattern = undefined;
    this.renderCanvas();
    this.saveHistoryState();
    this.showToast(`Applied ${color.name} (${color.code})`);
  }

  applyPattern(pattern: WallpaperPattern) {
    this.currentWall.pattern = pattern.code;
    this.renderCanvas();
    this.saveHistoryState();
    this.showToast(`Applied ${pattern.name} wallpaper texture`);
  }

  setWallFinish(finish: PaintFinish) {
    this.currentWall.finish = finish;
    this.renderCanvas();
    this.saveHistoryState();
  }

  filterColors() {
    let result = [...this.colors];
    if (this.selectedCategory !== 'All') {
      result = result.filter(c => c.category === this.selectedCategory);
    }
    if (this.selectedBrand !== 'All') {
      result = result.filter(c => c.brand === this.selectedBrand);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.hex.toLowerCase().includes(q)
      );
    }
    this.filteredColors = result;
  }

  // History Undo / Redo
  saveHistoryState() {
    const state = JSON.stringify({
      walls: this.walls,
      isPolygonClosed: this.isPolygonClosed,
      dualTone: this.dualTone
    });

    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(state);
    if (this.history.length > 25) this.history.shift();
    this.historyIndex = this.history.length - 1;
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreHistoryState(this.history[this.historyIndex]);
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreHistoryState(this.history[this.historyIndex]);
    }
  }

  private restoreHistoryState(jsonStr: string) {
    try {
      const data = JSON.parse(jsonStr);
      this.walls = data.walls;
      this.isPolygonClosed = data.isPolygonClosed;
      this.dualTone = data.dualTone;
      this.renderCanvas();
    } catch (e) {}
  }

  // Export & Navigation Actions
  exportImage() {
    const canvas = this.mainCanvasRef.nativeElement;
    const dataUrl = this.canvasService.generateExportImage(canvas, this.projectTitle, this.walls);
    const link = document.createElement('a');
    link.download = `${this.projectTitle.replace(/\s+/g, '_')}_painted_plan.png`;
    link.href = dataUrl;
    link.click();
    this.showToast('Exported high-res painted room image with color swatch legend!');
  }

  openCompare() {
    // Generate both original and painted snapshots
    const canvas = this.mainCanvasRef.nativeElement;
    const paintedData = canvas.toDataURL('image/png');

    // Store in localStorage for Compare page
    localStorage.setItem('compare_painted', paintedData);
    localStorage.setItem('compare_title', this.projectTitle);

    this.router.navigate(['/compare'], {
      queryParams: { roomType: this.roomType, isCustom: this.isCustomImage }
    });
  }

  saveProject() {
    if (!this.authService.isLoggedIn) {
      this.showToast('Please sign in or use Demo User to save your design!');
      this.router.navigate(['/auth']);
      return;
    }

    this.isSaving = true;
    const canvas = this.mainCanvasRef.nativeElement;
    const previewImage = canvas.toDataURL('image/jpeg', 0.85);

    const payload: Partial<RoomProject> = {
      title: this.projectTitle,
      roomType: this.roomType,
      originalImage: this.isCustomImage ? 'custom_upload' : this.selectedSampleId,
      previewImage: previewImage,
      walls: this.walls,
      dualTone: this.dualTone,
      notes: `Applied ${this.walls.length} painted wall zone(s) with ${this.currentWall.finish} finish.`
    };

    this.projectService.saveProject(payload).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.showToast('Project saved successfully to My Designs!');
      },
      error: (err) => {
        this.isSaving = false;
        this.showToast('Could not save design. Check backend connection.');
      }
    });
  }

  showToast(msg: string) {
    this.statusMessage = msg;
    setTimeout(() => {
      if (this.statusMessage === msg) {
        this.statusMessage = '';
      }
    }, 4000);
  }
}
