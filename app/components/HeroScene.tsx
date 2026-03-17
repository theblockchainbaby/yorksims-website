"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 120;
const ACCENT_COLOR = 0xe63946;
const BASE_COLOR = 0x444444;

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;

    // ── Particles ──────────────────────────────────────────────────────────
    const positions: Float32Array = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const colors: Float32Array = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const spread = 400;
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4;

      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.02,
      ));

      // ~15% red accent particles
      const isAccent = Math.random() < 0.15;
      const c = new THREE.Color(isAccent ? ACCENT_COLOR : BASE_COLOR);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Connection lines ────────────────────────────────────────────────────
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // We rebuild line geometry every frame
    let lineGeo = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.35 })
    );
    scene.add(lineMesh);

    // ── Mouse parallax ──────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ─────────────────────────────────────────────────────────────
    let frameId: number;
    const pos = particleGeo.attributes.position as THREE.BufferAttribute;

    function animate() {
      frameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.03;
      target.y += (mouse.y - target.y) * 0.03;
      scene.rotation.y = target.x * 0.15;
      scene.rotation.x = target.y * 0.08;

      // Slow auto-rotation
      scene.rotation.y += 0.0004;

      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.array[i * 3]     += velocities[i].x;
        pos.array[i * 3 + 1] += velocities[i].y;
        pos.array[i * 3 + 2] += velocities[i].z;

        // Wrap around
        const spread = 200;
        if (Math.abs(pos.array[i * 3])     > spread) velocities[i].x *= -1;
        if (Math.abs(pos.array[i * 3 + 1]) > spread) velocities[i].y *= -1;
        if (Math.abs(pos.array[i * 3 + 2]) > spread * 0.4) velocities[i].z *= -1;
      }
      pos.needsUpdate = true;

      // Rebuild connections
      linePositions.length = 0;
      lineColors.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos.array[i*3]   - pos.array[j*3];
          const dy = pos.array[i*3+1] - pos.array[j*3+1];
          const dz = pos.array[i*3+2] - pos.array[j*3+2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;

            linePositions.push(
              pos.array[i*3], pos.array[i*3+1], pos.array[i*3+2],
              pos.array[j*3], pos.array[j*3+1], pos.array[j*3+2],
            );

            // Color lines based on particle color (check if either is accent)
            const iAccent = colors[i*3] > 0.5;
            const jAccent = colors[j*3] > 0.5;
            const lineColor = (iAccent || jAccent)
              ? new THREE.Color(ACCENT_COLOR)
              : new THREE.Color(BASE_COLOR);

            lineColors.push(
              lineColor.r * alpha, lineColor.g * alpha, lineColor.b * alpha,
              lineColor.r * alpha, lineColor.g * alpha, lineColor.b * alpha,
            );
          }
        }
      }

      if (linePositions.length > 0) {
        const newGeo = new THREE.BufferGeometry();
        newGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
        newGeo.setAttribute("color",    new THREE.Float32BufferAttribute(lineColors, 3));
        lineMesh.geometry.dispose();
        lineMesh.geometry = newGeo;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
