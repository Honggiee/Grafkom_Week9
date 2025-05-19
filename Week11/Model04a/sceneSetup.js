// hellocube-camera-orbit/js/sceneSetup.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // Impor kembali

export function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

export function initCamera(aspectRatio) {
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 4, 10); // Posisi awal kamera
  return camera;
}

export function initRenderer(canvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

// Fungsi untuk menginisialisasi OrbitControls
export function initOrbitControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 3; // Batas zoom in
  controls.maxDistance = 25; // Batas zoom out
  // controls.target.set(0, 0, 0); // Set target orbit (pusat scene biasanya)
  return controls;
}
