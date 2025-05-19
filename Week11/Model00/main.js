// hellocube/js/main.js
import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './sceneSetup.js';
import { createCube, addLights } from './cube.js';
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
    // Jika menggunakan MeshNormalMaterial, baris ini bisa dikomentari
    addLights(scene); 

    // 3. Tangani Perubahan Ukuran Jendela
    // Kita perlu meneruskan fungsi handleResize yang sudah di-bind dengan argumennya
    // atau membungkusnya dalam fungsi anonim agar event listener tidak mengacaukan 'this'
    window.addEventListener('resize', () => {
        handleResize(camera, renderer);
    });

    // 4. Mulai Loop Animasi
    // Kirim objek yang ingin dianimasikan (dalam hal ini, kubus)
    startAnimationLoop(renderer, scene, camera, [cube]);

    // Pemanggilan awal handleResize untuk memastikan ukuran awal sudah benar
    handleResize(camera, renderer); 
}