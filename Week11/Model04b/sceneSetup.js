// hellocube-walkthrough/js/sceneSetup.js
import * as THREE from 'three';
// Tidak perlu OrbitControls di sini lagi

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    return scene;
}

export function initCamera(aspectRatio) {
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    // Posisi awal kamera akan ditentukan oleh PointerLockControls atau logika spawn
    // Kita bisa set posisi awal dasar di sini, tapi kontroler akan memindahkannya.
    camera.position.set(0, 1.7, 5); // Tinggi mata rata-rata, sedikit di belakang origin
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}

// initControls untuk OrbitControls tidak diperlukan lagi di sini