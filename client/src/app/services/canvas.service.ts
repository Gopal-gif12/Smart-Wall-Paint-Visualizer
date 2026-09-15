import { Injectable } from '@angular/core';
import { Point2D, WallLayer } from '../models/project.model';
import { PaintColor } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  // Generate high-resolution procedural sample room on canvas
  drawSampleRoom(ctx: CanvasRenderingContext2D, width: number, height: number, roomType: string = 'Living Room') {
    ctx.clearRect(0, 0, width, height);

    // 1. Ceiling
    const ceilGrad = ctx.createLinearGradient(0, 0, 0, height * 0.2);
    ceilGrad.addColorStop(0, '#EAECEE');
    ceilGrad.addColorStop(1, '#D5D8DC');
    ctx.fillStyle = ceilGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width * 0.85, height * 0.15);
    ctx.lineTo(width * 0.15, height * 0.15);
    ctx.closePath();
    ctx.fill();

    // 2. Main Back Wall
    const wallGrad = ctx.createLinearGradient(0, height * 0.15, 0, height * 0.72);
    wallGrad.addColorStop(0, '#EDE8E1');
    wallGrad.addColorStop(0.5, '#E2DDD6');
    wallGrad.addColorStop(1, '#D1CCC4');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(width * 0.15, height * 0.15, width * 0.7, height * 0.57);

    // 3. Left Wall (with shadow angle)
    const leftGrad = ctx.createLinearGradient(0, 0, width * 0.15, 0);
    leftGrad.addColorStop(0, '#C9C4BD');
    leftGrad.addColorStop(1, '#DBD6CF');
    ctx.fillStyle = leftGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width * 0.15, height * 0.15);
    ctx.lineTo(width * 0.15, height * 0.72);
    ctx.lineTo(0, height * 0.88);
    ctx.closePath();
    ctx.fill();

    // 4. Right Wall (window light cast)
    const rightGrad = ctx.createLinearGradient(width * 0.85, 0, width, 0);
    rightGrad.addColorStop(0, '#DDD8D1');
    rightGrad.addColorStop(1, '#F2EEE7');
    ctx.fillStyle = rightGrad;
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width * 0.85, height * 0.15);
    ctx.lineTo(width * 0.85, height * 0.72);
    ctx.lineTo(width, height * 0.88);
    ctx.closePath();
    ctx.fill();

    // 5. Hardwood Flooring
    const floorGrad = ctx.createLinearGradient(0, height * 0.72, 0, height);
    floorGrad.addColorStop(0, '#8D6E63');
    floorGrad.addColorStop(0.4, '#795548');
    floorGrad.addColorStop(1, '#4E342E');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.72);
    ctx.lineTo(width * 0.85, height * 0.72);
    ctx.lineTo(width, height * 0.88);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.lineTo(0, height * 0.88);
    ctx.closePath();
    ctx.fill();

    // Floor wood plank lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.lineWidth = 1;
    for (let i = 0.05; i < 0.95; i += 0.08) {
      ctx.beginPath();
      ctx.moveTo(width * (0.5 + (i - 0.5) * 0.7), height * 0.72);
      ctx.lineTo(width * (0.5 + (i - 0.5) * 1.5), height);
      ctx.stroke();
    }

    // 6. Baseboards (Trim)
    ctx.fillStyle = '#F8F9FA';
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.71);
    ctx.lineTo(width * 0.85, height * 0.71);
    ctx.lineTo(width * 0.85, height * 0.72);
    ctx.lineTo(width * 0.15, height * 0.72);
    ctx.closePath();
    ctx.fill();

    // 7. Architectural Window on Right Wall
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.moveTo(width * 0.88, height * 0.22);
    ctx.lineTo(width * 0.98, height * 0.18);
    ctx.lineTo(width * 0.98, height * 0.65);
    ctx.lineTo(width * 0.88, height * 0.62);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4A5568';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Sunlight Ray onto Floor & Wall
    const sunGrad = ctx.createLinearGradient(width * 0.95, height * 0.2, width * 0.4, height * 0.85);
    sunGrad.addColorStop(0, 'rgba(255, 250, 230, 0.35)');
    sunGrad.addColorStop(1, 'rgba(255, 250, 230, 0.02)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.moveTo(width * 0.88, height * 0.22);
    ctx.lineTo(width * 0.98, height * 0.65);
    ctx.lineTo(width * 0.55, height * 0.9);
    ctx.lineTo(width * 0.35, height * 0.78);
    ctx.closePath();
    ctx.fill();

    // 8. Designer Sofa / Furniture
    if (roomType === 'Living Room') {
      // Sofa Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.79, width * 0.28, height * 0.05, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sofa Backrest
      ctx.fillStyle = '#263238';
      ctx.beginPath();
      ctx.roundRect(width * 0.26, height * 0.56, width * 0.48, height * 0.16, [14, 14, 4, 4]);
      ctx.fill();

      // Sofa Cushions
      ctx.fillStyle = '#37474F';
      ctx.beginPath();
      ctx.roundRect(width * 0.24, height * 0.64, width * 0.52, height * 0.11, [10, 10, 8, 8]);
      ctx.fill();

      // Accent Pillows
      ctx.fillStyle = '#FFB74D';
      ctx.beginPath();
      ctx.roundRect(width * 0.27, height * 0.60, width * 0.08, height * 0.08, 6);
      ctx.fill();

      ctx.fillStyle = '#4DD0E1';
      ctx.beginPath();
      ctx.roundRect(width * 0.65, height * 0.60, width * 0.08, height * 0.08, 6);
      ctx.fill();

      // Modern Floor Lamp
      ctx.strokeStyle = '#212121';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.20, height * 0.74);
      ctx.lineTo(width * 0.20, height * 0.40);
      ctx.lineTo(width * 0.24, height * 0.38);
      ctx.stroke();

      // Lamp Shade
      ctx.fillStyle = '#FFF8E1';
      ctx.beginPath();
      ctx.moveTo(width * 0.22, height * 0.38);
      ctx.lineTo(width * 0.26, height * 0.38);
      ctx.lineTo(width * 0.28, height * 0.44);
      ctx.lineTo(width * 0.20, height * 0.44);
      ctx.closePath();
      ctx.fill();
    } else if (roomType === 'Bedroom') {
      // Bed Headboard
      ctx.fillStyle = '#3E2723';
      ctx.beginPath();
      ctx.roundRect(width * 0.28, height * 0.48, width * 0.44, height * 0.22, [8, 8, 0, 0]);
      ctx.fill();

      // Mattress & Duvet
      ctx.fillStyle = '#ECEFF1';
      ctx.beginPath();
      ctx.roundRect(width * 0.25, height * 0.62, width * 0.50, height * 0.15, [6, 6, 4, 4]);
      ctx.fill();

      // Pillows
      ctx.fillStyle = '#CFD8DC';
      ctx.fillRect(width * 0.30, height * 0.54, width * 0.16, height * 0.08);
      ctx.fillRect(width * 0.54, height * 0.54, width * 0.16, height * 0.08);
    }
  }

  // Render wall paint or pattern with realistic lighting preservation
  applyWallColor(
    ctx: CanvasRenderingContext2D,
    wall: WallLayer,
    canvasWidth: number,
    canvasHeight: number,
    dualTone?: { enabled: boolean; secondaryColor?: string; orientation: 'horizontal' | 'vertical'; splitRatio: number }
  ) {
    if (!wall.polygon || wall.polygon.length < 3) return;

    ctx.save();

    // 1. Define clipping mask for the wall polygon
    ctx.beginPath();
    const first = wall.polygon[0];
    ctx.moveTo(first.x * canvasWidth, first.y * canvasHeight);
    for (let i = 1; i < wall.polygon.length; i++) {
      const p = wall.polygon[i];
      ctx.lineTo(p.x * canvasWidth, p.y * canvasHeight);
    }
    ctx.closePath();
    ctx.clip();

    // 2. Primary Wall Paint Application using realistic blend modes
    const hexColor = (wall.color && wall.color.hex) || '#5B84B1';
    const opacity = wall.opacity !== undefined ? wall.opacity : 0.85;

    // Multiply blend preserves shadows, contours, and texture depth
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = opacity;

    if (dualTone && dualTone.enabled && dualTone.secondaryColor) {
      // Split wall color
      const isHoriz = dualTone.orientation === 'horizontal';
      const ratio = dualTone.splitRatio || 0.5;

      // Find bounding box of polygon
      const xs = wall.polygon.map(p => p.x * canvasWidth);
      const ys = wall.polygon.map(p => p.y * canvasHeight);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      if (isHoriz) {
        const splitY = minY + (maxY - minY) * ratio;
        ctx.fillStyle = hexColor;
        ctx.fillRect(minX, minY, maxX - minX, splitY - minY);
        ctx.fillStyle = dualTone.secondaryColor;
        ctx.fillRect(minX, splitY, maxX - minX, maxY - splitY);
      } else {
        const splitX = minX + (maxX - minX) * ratio;
        ctx.fillStyle = hexColor;
        ctx.fillRect(minX, minY, splitX - minX, maxY - minY);
        ctx.fillStyle = dualTone.secondaryColor;
        ctx.fillRect(splitX, minY, maxX - splitX, maxY - minY);
      }
    } else {
      ctx.fillStyle = hexColor;
      ctx.fill();
    }

    // 3. Second pass: Color / Soft-Light for vibrancy & hue saturation
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = opacity * 0.75;
    ctx.fillStyle = hexColor;
    ctx.fill();

    // 4. Finish Simulation: Specular sheen highlights
    const finish = (wall.finish || 'matte').toLowerCase();
    if (finish === 'satin' || finish === 'semi-gloss' || finish === 'glossy') {
      const sheenIntensity = finish === 'glossy' ? 0.35 : (finish === 'semi-gloss' ? 0.22 : 0.12);
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = sheenIntensity;

      const sheenGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      ctx.fillStyle = sheenGrad;
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw polygon selection handles, lines, and closing cursor
  drawSelectionGuides(
    ctx: CanvasRenderingContext2D,
    points: Point2D[],
    canvasWidth: number,
    canvasHeight: number,
    isClosed: boolean,
    hoverClose: boolean,
    activePointIdx: number = -1
  ) {
    if (!points || points.length === 0) return;

    ctx.save();

    // 1. Polygon Connecting Path
    ctx.beginPath();
    ctx.moveTo(points[0].x * canvasWidth, points[0].y * canvasHeight);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x * canvasWidth, points[i].y * canvasHeight);
    }

    if (isClosed) {
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 3]);
    } else {
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Vertex Handles
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const px = p.x * canvasWidth;
      const py = p.y * canvasHeight;

      const isFirst = i === 0;
      const isActive = i === activePointIdx;

      ctx.beginPath();
      const radius = isFirst ? (hoverClose ? 9 : 7) : (isActive ? 7 : 5);
      ctx.arc(px, py, radius, 0, Math.PI * 2);

      if (isFirst && !isClosed) {
        ctx.fillStyle = hoverClose ? '#10B981' : '#F59E0B';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
      } else if (isActive) {
        ctx.fillStyle = '#EC4899';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
      } else {
        ctx.fillStyle = '#6366F1';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
      }

      ctx.fill();
      ctx.stroke();

      // Close hint tooltip on first point
      if (isFirst && !isClosed && points.length >= 3) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.beginPath();
        ctx.roundRect(px + 10, py - 12, 85, 22, 4);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText('Click to Close', px + 15, py + 3);
      }
    }

    ctx.restore();
  }

  // Generate high-resolution export image with color card legend
  generateExportImage(
    originalCanvas: HTMLCanvasElement,
    projectTitle: string,
    walls: WallLayer[]
  ): string {
    const exportWidth = originalCanvas.width;
    const bannerHeight = 120;
    const exportHeight = originalCanvas.height + bannerHeight;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return originalCanvas.toDataURL('image/png');

    // Draw main room canvas
    ctx.drawImage(originalCanvas, 0, 0);

    // Draw bottom metadata card
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, originalCanvas.height, exportWidth, bannerHeight);

    // Border line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originalCanvas.height);
    ctx.lineTo(exportWidth, originalCanvas.height);
    ctx.stroke();

    // App Branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Outfit, sans-serif';
    ctx.fillText('Smart Wall Paint Visualizer', 24, originalCanvas.height + 40);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(projectTitle || 'Custom Room Paint Design', 24, originalCanvas.height + 66);

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Generated on ${dateStr} • Real Room Lighting Simulation`, 24, originalCanvas.height + 90);

    // Swatches on right side
    let swatchX = exportWidth - 320;
    const activeWalls = walls.filter(w => w.color);

    activeWalls.slice(0, 3).forEach((w, idx) => {
      const hex = w.color?.hex || '#5B84B1';
      const name = w.color?.name || 'Paint Shade';
      const code = w.color?.code || '';
      const finish = w.finish || 'matte';

      const x = swatchX + idx * 100;
      const y = originalCanvas.height + 25;

      // Color Swatch Rect
      ctx.fillStyle = hex;
      ctx.beginPath();
      ctx.roundRect(x, y, 28, 28, 6);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Info
      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(name.slice(0, 12), x + 36, y + 14);

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(`${code} (${finish})`, x + 36, y + 28);
    });

    return exportCanvas.toDataURL('image/png');
  }
}
