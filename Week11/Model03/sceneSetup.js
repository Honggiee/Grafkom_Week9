// hellocube-shadows/js/sceneSetup.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    // scene.fog = new THREE.Fog(0x111111, 10, 30); // Opsional: tambahkan fog
    return scene;
}

export function initCamera(aspectRatio) {
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 3, 10); // Sesuaikan posisi awal jika perlu
    return camera;
}

export function initRenderer(canvasElement) {
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // AKTIFKAN SHADOW MAP PADA RENDERER
    renderer.shadowMap.enabled = true;
    // Jenis shadow map (PCFSoftShadowMap lebih lembut tapi lebih mahal)
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Opsi lain: THREE.BasicShadowMap, THREE.PCFShadowMap

    // Opsional: Tone mapping (bisa membantu jika ada area yang sangat terang karena emisi)
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.0;

    return renderer;
}

export function initControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // controls.minDistance = 2;
    // controls.maxDistance = 20;
    return controls;
}