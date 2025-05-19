// hellocube-raycast-hover/js/main.js
import * as THREE from 'three';
import { initScene, initCamera, initRenderer, initOrbitControls } from './sceneSetup.js';
import { addLights } from './lights.js';
// Impor OBJECTS_BASE_Y_WORLD
import { layoutSceneObjects, OBJECTS_BASE_Y_WORLD } from './sceneObjects.js';
import { initInteraction } from './interactionManager.js'; // Impor manager interaksi
import { startAnimationLoop } from './animation.js';
import { handleResize } from './utils.js';

const canvas = document.getElementById('webglCanvas');
if (!canvas) {
    console.error("Canvas element #webglCanvas not found!");
} else {
    // TextureLoader tidak lagi dibutuhkan jika semua objek berwarna solid
    // const textureLoader = new THREE.TextureLoader();
    // const uvTexturePath = 'textures/uv_grid_opengl.png';

    // Langsung setup scene tanpa menunggu tekstur
    function setupScene() {
        const scene = initScene();
        const camera = initCamera(window.innerWidth / window.innerHeight);
        const renderer = initRenderer(canvas);

        const controls = initOrbitControls(camera, renderer.domElement);
        const targetY = OBJECTS_BASE_Y_WORLD + 0.5; // Target orbit sedikit di atas dasar objek
        controls.target.set(0, targetY, 0);
        controls.update();

        addLights(scene);
        // layoutSceneObjects sekarang mengembalikan objek yang bisa di-hover
        const interactableObjects = layoutSceneObjects(scene); 

        // Inisialisasi raycasting dan event listener hover
        initInteraction(camera, interactableObjects, renderer);

        window.addEventListener('resize', () => {
            handleResize(camera, renderer);
        });

        startAnimationLoop(renderer, scene, camera, controls);
        handleResize(camera, renderer);
    }

    setupScene(); // Panggil fungsi setup

    // Jika Anda ingin tetap menggunakan tekstur untuk plane, kembalikan logika TextureLoader
    // textureLoader.load(uvTexturePath, (loadedTexture) => { /* ... panggil setupScene() di sini ... */ });
}