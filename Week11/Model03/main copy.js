// hellocube-textured-phong/js/main.js
import * as THREE from 'three';
import { initScene, initCamera, initRenderer, initControls } from './sceneSetup.js';
import { addLights } from './lights.js';
import { layoutSceneObjects } from './sceneObjects.js'; 
import { startAnimationLoop } from './animation.js';
import { handleResize } from './utils.js';

const canvas = document.getElementById('webglCanvas');
if (!canvas) {
    console.error("Canvas element #webglCanvas not found!");
} else {
    const textureLoader = new THREE.TextureLoader();
    const uvTexturePath = 'uv.jpeg'; // Tekstur ini akan digunakan untuk plane, bola, kerucut

    textureLoader.load(
        uvTexturePath,
        (loadedTexture) => {
            loadedTexture.wrapS = THREE.RepeatWrapping;
            loadedTexture.wrapT = THREE.RepeatWrapping;
            loadedTexture.colorSpace = THREE.SRGBColorSpace;

            const scene = initScene();
            const camera = initCamera(window.innerWidth / window.innerHeight);
            // Posisi kamera mungkin perlu sedikit disesuaikan lagi
            camera.position.set(0, 2.5, 10); // Naikkan sedikit y, mundurkan z
            camera.lookAt(0, 0, 0); // Arahkan ke tengah barisan objek

            const renderer = initRenderer(canvas);
            const controls = initControls(camera, renderer.domElement);
            // controls.target.set(0, 0, 0); // Sesuaikan jika pusat perhatian berubah

            addLights(scene);
            const animatedObjects = layoutSceneObjects(scene, loadedTexture); 

            window.addEventListener('resize', () => {
                handleResize(camera, renderer);
            });

            startAnimationLoop(renderer, scene, camera, controls, animatedObjects);
            handleResize(camera, renderer);
        },
        undefined,
        (error) => {
            console.error(`An error occurred loading the texture: ${uvTexturePath}`, error);
            alert("Gagal memuat tekstur. Pastikan file 'textures/uv_grid_opengl.png' ada dan server berjalan dengan benar.");
        }
    );
}