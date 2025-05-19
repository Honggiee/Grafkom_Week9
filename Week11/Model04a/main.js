// hellocube-camera-orbit/js/main.js
import * as THREE from "three";
import {
  initScene,
  initCamera,
  initRenderer,
  initOrbitControls,
} from "./sceneSetup.js";
import { addLights } from "./lights.js";
import { layoutSceneObjects } from "./sceneObjects.js";
import { startAnimationLoop } from "./animation.js";
import { handleResize } from "./utils.js";

const canvas = document.getElementById("webglCanvas");
if (!canvas) {
  console.error("Canvas element #webglCanvas not found!");
} else {
  const textureLoader = new THREE.TextureLoader();
  const uvTexturePath = "uv.jpeg";

  textureLoader.load(
    uvTexturePath,
    (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.colorSpace = THREE.SRGBColorSpace;

      const scene = initScene();
      const camera = initCamera(window.innerWidth / window.innerHeight);
      const renderer = initRenderer(canvas);

      // Inisialisasi OrbitControls
      const controls = initOrbitControls(camera, renderer.domElement);

      // Atur target kontrol ke pusat scene atau area objek
      // Menggunakan nilai groundPlaneY yang sama seperti yang digunakan di sceneObjects.js (-2.5)
      const knownGroundPlaneY = -2.5; // Nilai groundPlaneY yang diketahui dari sceneObjects.js
      const targetY = knownGroundPlaneY + 1.0; // Target sedikit di atas plane, di mana objek berada
      controls.target.set(0, targetY, 0);
      controls.update(); // Panggil update sekali setelah set target

      addLights(scene);
      layoutSceneObjects(scene, loadedTexture); // Tidak perlu menangkap return value jika kosong

      window.addEventListener("resize", () => {
        handleResize(camera, renderer);
      });

      // Kirim controls ke loop animasi
      startAnimationLoop(renderer, scene, camera, controls);
      handleResize(camera, renderer);
    },
    undefined,
    (error) => {
      console.error(
        `An error occurred loading the texture: ${uvTexturePath}`,
        error
      );
      alert(
        "Gagal memuat tekstur. Pastikan file 'textures/uv_grid_opengl.png' ada dan server berjalan dengan benar."
      );
    }
  );
}
