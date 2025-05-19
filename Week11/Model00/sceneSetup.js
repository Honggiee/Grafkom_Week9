// hellocube/js/sceneSetup.js
import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // Warna latar yang sama dengan CSS body
    return scene;
}

export function initCamera() {
    const camera = new THREE.PerspectiveCamera(
        75, // Field of View
        window.innerWidth / window.innerHeight, // Aspect Ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.z = 5; // Posisikan kamera sedikit ke belakang
    return camera;
}

export function initRenderer(canvasElement) {
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: true // Membuat tepi objek lebih halus
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    return renderer;
}