// hellocube-textured-phong/js/sceneSetup.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    return scene;
}

export function initCamera(aspectRatio) {
    const camera = new THREE.PerspectiveCamera(
        75, // FOV
        aspectRatio, // Aspect Ratio
        0.1, // Near
        1000 // Far
    );
    camera.position.set(0, 2, 7); // Posisikan kamera agar lebih enak dilihat dengan orbit controls
    return camera;
}

export function initRenderer(canvasElement) {
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Aktifkan output encoding yang benar untuk warna yang lebih akurat, terutama dengan lighting
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Aktifkan tone mapping jika perlu (untuk tampilan HDR yang lebih baik, opsional)
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.0;
    return renderer;
}

export function initControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true; // Efek "lembut" saat berhenti
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; // Batasi panning agar tetap di plane XZ
    controls.minDistance = 2;
    controls.maxDistance = 20;
    // controls.maxPolarAngle = Math.PI / 2; // Batasi agar tidak bisa melihat dari bawah
    return controls;
}