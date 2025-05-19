// hellocube/js/main.js
import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './sceneSetup.js';
import { createCube, addLights } from './cube.js'; // addLights masih diimpor, tapi mungkin tidak dipanggil
import { startAnimationLoop } from './animation.js';
import { handleResize } from './utils.js';

// Ambil elemen canvas dari HTML
const canvas = document.getElementById('webglCanvas');
if (!canvas) {
    console.error("Canvas element #webglCanvas not found!");
} else {
    // 1. Inisialisasi Scene, Kamera, dan Renderer
    const scene = initScene();
    const camera = initCamera();
    const renderer = initRenderer(canvas);

    // 2. Buat Objek Kubus
    const cube = createCube();
    scene.add(cube); // Tambahkan kubus ke scene

    // (Opsional) Tambahkan cahaya jika menggunakan material yang membutuhkannya
    // Untuk MeshBasicMaterial, baris ini TIDAK diperlukan.
    // Jika Anda memiliki objek lain di scene yang membutuhkan cahaya, Anda bisa memanggilnya.
    // addLights(scene); 

    // 3. Tangani Perubahan Ukuran Jendela
    window.addEventListener('resize', () => {
        handleResize(camera, renderer);
    });

    // 4. Mulai Loop Animasi
    startAnimationLoop(renderer, scene, camera, [cube]);

    // Pemanggilan awal handleResize untuk memastikan ukuran awal sudah benar
    handleResize(camera, renderer); 
}