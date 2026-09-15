import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop flex items-center justify-center animate-fade">
      <div class="modal-card glass-panel">
        <!-- Header -->
        <div class="modal-header flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="step-badge">{{ currentStep + 1 }} / {{ steps.length }}</div>
            <h3 class="modal-title">{{ steps[currentStep].title }}</h3>
          </div>
          <button (click)="close.emit()" class="close-btn" title="Close Guide">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Content Body -->
        <div class="modal-body">
          <div class="step-illustration">
            <div class="icon-circle" [style.background]="steps[currentStep].accent">
              <i [class]="steps[currentStep].icon"></i>
            </div>
            <p class="step-subtitle">{{ steps[currentStep].subtitle }}</p>
          </div>

          <div class="step-details card">
            <p class="step-description">{{ steps[currentStep].description }}</p>
            <ul class="step-tips">
              <li *ngFor="let tip of steps[currentStep].tips">
                <i class="fa-solid fa-check text-success"></i>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Navigation -->
        <div class="modal-footer flex items-center justify-between">
          <button 
            (click)="prevStep()" 
            [disabled]="currentStep === 0" 
            class="btn btn-secondary btn-sm"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Previous</span>
          </button>

          <!-- Step Indicators -->
          <div class="step-dots flex items-center gap-2">
            <span 
              *ngFor="let step of steps; let i = index" 
              class="dot" 
              [class.active]="i === currentStep"
              (click)="currentStep = i"
            ></span>
          </div>

          <button 
            *ngIf="currentStep < steps.length - 1" 
            (click)="nextStep()" 
            class="btn btn-primary btn-sm"
          >
            <span>Next</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>

          <button 
            *ngIf="currentStep === steps.length - 1" 
            (click)="close.emit()" 
            class="btn btn-accent btn-sm"
          >
            <span>Start Designing!</span>
            <i class="fa-solid fa-wand-magic-sparkles"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
      max-width: 580px;
      background: var(--bg-surface);
      border: 1px solid var(--border-highlight);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      box-shadow: var(--shadow-lg);
    }
    .modal-header {
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-subtle);
    }
    .step-badge {
      background: rgba(99, 102, 241, 0.2);
      color: #818CF8;
      border: 1px solid rgba(99, 102, 241, 0.35);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
    }
    .modal-title {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      transition: all var(--transition-fast);
    }
    .close-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
    }
    .modal-body {
      padding: 1.5rem 0;
    }
    .step-illustration {
      text-align: center;
      margin-bottom: 1.25rem;
    }
    .icon-circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin: 0 auto 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      color: #FFFFFF;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    }
    .step-subtitle {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .step-details {
      background: var(--bg-card);
      padding: 1.25rem;
    }
    .step-description {
      font-size: 0.95rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .step-tips {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .step-tips li {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.9rem;
      color: var(--text-main);
    }
    .text-success {
      color: #10B981;
    }
    .modal-footer {
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-subtle);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--bg-card-hover);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .dot.active {
      width: 24px;
      border-radius: var(--radius-full);
      background: var(--accent-primary);
    }
  `]
})
export class TutorialModalComponent {
  close = output<void>();
  currentStep = 0;

  steps = [
    {
      title: 'Step 1: Choose Your Room',
      subtitle: 'Upload a real room photo or select a sample room',
      icon: 'fa-solid fa-cloud-arrow-up',
      accent: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
      description: 'Start by uploading any JPG or PNG photo of your living room, bedroom, dining area, or kitchen. Alternatively, try out our built-in curated architectural room templates.',
      tips: [
        'Take photos in bright daylight for best color rendering',
        'Built-in sample rooms come with suggested wall outlines'
      ]
    },
    {
      title: 'Step 2: Mark Wall Areas',
      subtitle: 'Use the Polygon Tool to click along wall corners',
      icon: 'fa-solid fa-draw-polygon',
      accent: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      description: 'Select the Polygon tool and click along the perimeter of the wall you want to paint. To complete the outline, simply click back on the starting point (highlighted in green).',
      tips: [
        'Click each corner of the wall to outline the polygon',
        'After closing, drag any point to fine-tune alignment',
        'Add multiple wall layers for accent walls and side walls'
      ]
    },
    {
      title: 'Step 3: Apply Paint & Finish',
      subtitle: 'Choose from 60+ curated shades and realistic finishes',
      icon: 'fa-solid fa-brush',
      accent: 'linear-gradient(135deg, #EC4899, #F43F5E)',
      description: 'Browse curated paint shades from Behr, Asian Paints, and Dulux. Adjust opacity and choose your desired sheen finish (Matte, Satin, Semi-Gloss, or High-Gloss).',
      tips: [
        'Our lighting-preserving blend keeps shadows and natural contours visible',
        'Test dual-tone split walls or seamless wallpaper patterns'
      ]
    },
    {
      title: 'Step 4: Compare & Export',
      subtitle: 'Side-by-side comparison slider and high-res print export',
      icon: 'fa-solid fa-download',
      accent: 'linear-gradient(135deg, #10B981, #059669)',
      description: 'Use the interactive Before/After split slider to inspect how the new paint transforms your space. Save the design to your account or download a high-res image with swatch legend.',
      tips: [
        'Drag the split slider across the screen to reveal before & after',
        'Export image contains swatch cards with exact paint codes for painters'
      ]
    }
  ];

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
