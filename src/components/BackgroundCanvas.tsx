import React, { useEffect, useRef } from 'react';

interface GridNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  baseAlpha: number;
  alpha: number;
  radius: number;
  active: boolean;
  pulseProgress: number;
}

interface EvaluationVector {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  alpha: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    window.addEventListener('resize', handleResize);

    // --- 1. Structured Engineering Grid (Matrice Cartésienne Rigoureuse) ---
    const gridSpacing = 64; // Distance between coordinate intersections
    let nodes: GridNode[] = [];

    const initGrid = () => {
      nodes = [];
      const cols = Math.ceil(width / gridSpacing);
      const rows = Math.ceil(height / gridSpacing);

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * gridSpacing;
          const y = r * gridSpacing;
          nodes.push({
            x,
            y,
            originX: x,
            originY: y,
            baseAlpha: 0.12,
            alpha: 0.12,
            radius: (c % 4 === 0 && r % 4 === 0) ? 1.8 : 1.0,
            active: false,
            pulseProgress: 0,
          });
        }
      }
    };
    initGrid();

    // --- 2. Action Vectors (Lignes de Preuve & Vecteurs de Décision) ---
    const vectors: EvaluationVector[] = [];
    const maxVectors = 12;

    const spawnVector = () => {
      if (vectors.length >= maxVectors) return;
      // Spawn along grid lines for engineering precision
      const isHorizontal = Math.random() > 0.5;
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (!startNode) return;

      const length = (Math.floor(Math.random() * 4) + 2) * gridSpacing;
      const toX = isHorizontal ? startNode.x + length * (Math.random() > 0.5 ? 1 : -1) : startNode.x;
      const toY = !isHorizontal ? startNode.y + length * (Math.random() > 0.5 ? 1 : -1) : startNode.y;

      vectors.push({
        fromX: startNode.x,
        fromY: startNode.y,
        toX,
        toY,
        progress: 0,
        speed: Math.random() * 0.015 + 0.008,
        alpha: Math.random() * 0.4 + 0.2,
      });
    };

    // --- 3. Observer Sensation (Percevoir le Contexte) ---
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let hasObserverMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      hasObserverMoved = true;
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- Concentric Structural Layers Angles ---
    let layerAngleOuter = 0;
    let layerAngleMiddle = 0;
    let layerAngleInner = 0;

    // --- Main Rendering Loop ---
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;

      // Slow, institutional rotation of concentric structural layers
      layerAngleOuter += 0.0006;
      layerAngleMiddle -= 0.0008;
      layerAngleInner += 0.001;

      // 1. Draw Architectural Cartesian Grid
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.025)'; // Cold slate gray

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw Concentric Structural Layers (Perception → Évaluation → Action)
      const maxDimension = Math.max(width, height);
      const rOuter = Math.min(360, maxDimension * 0.32);
      const rMiddle = Math.min(240, maxDimension * 0.22);
      const rInner = Math.min(140, maxDimension * 0.13);

      // Layer 1 (Outer): Perception Field Horizon
      ctx.beginPath();
      ctx.arc(centerX, centerY, rOuter, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Layer 1 tick marks
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(layerAngleOuter);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 24; i++) {
        const angle = (i * Math.PI * 2) / 24;
        const x1 = Math.cos(angle) * (rOuter - 4);
        const y1 = Math.sin(angle) * (rOuter - 4);
        const x2 = Math.cos(angle) * (rOuter + 4);
        const y2 = Math.sin(angle) * (rOuter + 4);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // Layer 2 (Middle): Evaluation & Risk Weighting
      ctx.beginPath();
      ctx.arc(centerX, centerY, rMiddle, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Layer 2 segments (Pondération)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(layerAngleMiddle);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        const start = (i * Math.PI) / 2 + 0.2;
        const end = start + 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, rMiddle, start, end);
        ctx.stroke();
      }
      ctx.restore();

      // Layer 3 (Inner): Bounded Autonomous Action Boundary
      ctx.beginPath();
      ctx.arc(centerX, centerY, rInner, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Update & Draw Grid Nodes
      const evalRadius = 220;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const distToMouse = Math.hypot(node.x - mouseX, node.y - mouseY);

        if (distToMouse < evalRadius) {
          const proximity = 1 - distToMouse / evalRadius;
          node.alpha = node.baseAlpha + proximity * 0.45;
        } else {
          node.alpha = node.baseAlpha;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = distToMouse < evalRadius
          ? `rgba(203, 213, 225, ${node.alpha})` // Cold silver
          : `rgba(148, 163, 184, ${node.alpha})`;
        ctx.fill();
      }

      // 4. Random Engineering Action Vectors
      if (Math.random() < 0.03) {
        spawnVector();
      }

      for (let v = vectors.length - 1; v >= 0; v--) {
        const vec = vectors[v];
        vec.progress += vec.speed;

        if (vec.progress >= 1) {
          vectors.splice(v, 1);
          continue;
        }

        const headX = vec.fromX + (vec.toX - vec.fromX) * vec.progress;
        const headY = vec.fromY + (vec.toY - vec.fromY) * vec.progress;
        const tailProgress = Math.max(0, vec.progress - 0.25);
        const tailX = vec.fromX + (vec.toX - vec.fromX) * tailProgress;
        const tailY = vec.fromY + (vec.toY - vec.fromY) * tailProgress;

        // Draw straight precision vector line
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = `rgba(148, 163, 184, ${vec.alpha * (1 - vec.progress)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Vector head coordinate
        ctx.beginPath();
        ctx.arc(headX, headY, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${vec.alpha * 1.5})`;
        ctx.fill();
      }

      // 5. Context Perception Crosshair on Cursor (Percevoir avant d'agir)
      if (hasObserverMoved) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';

        // Fine horizontal & vertical crosshair lines
        ctx.beginPath();
        ctx.moveTo(mouseX - 30, mouseY);
        ctx.lineTo(mouseX - 8, mouseY);
        ctx.moveTo(mouseX + 8, mouseY);
        ctx.lineTo(mouseX + 30, mouseY);

        ctx.moveTo(mouseX, mouseY - 30);
        ctx.lineTo(mouseX, mouseY - 8);
        ctx.moveTo(mouseX, mouseY + 8);
        ctx.lineTo(mouseX, mouseY + 30);
        ctx.stroke();

        // Micro-aperture ring
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};
