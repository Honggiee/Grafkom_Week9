// hellocube-walkthrough/js/main.js
import * as THREE from "three";
import { initScene, initCamera, initRenderer } from "./sceneSetup.js";
import { addLights } from "./lights.js";
// Impor OBJECTS_BASE_Y_WORLD
import { layoutSceneObjects, OBJECTS_BASE_Y_WORLD } from "./sceneObjects.js";
import { initWalkControls } from "./controlsManager.js";
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
      // Posisi kamera awal mungkin perlu disesuaikan sedikit
      // Misalnya, jika objek sekarang lebih dekat atau ground plane berubah Y-nya.
      // Posisi awal (1.7 adalah tinggi mata rata-rata) relatif terhadap ground.
      camera.position.set(0, OBJECTS_BASE_Y_WORLD + 1.7, 5);

      const renderer = initRenderer(canvas);

      // Inisialisasi kontrol walkthrough
      const playerControls = initWalkControls(
        camera,
        renderer.domElement,
        scene
      );

      addLights(scene);
      // layoutSceneObjects tidak lagi mengembalikan objek untuk dianimasikan orbitnya
      layoutSceneObjects(scene, loadedTexture);

      window.addEventListener("resize", () => {
        handleResize(camera, renderer);
      });

      // Kirim OBJECTS_BASE_Y_WORLD sebagai groundY ke loop animasi
      startAnimationLoop(
        renderer,
        scene,
        camera,
        playerControls,
        OBJECTS_BASE_Y_WORLD
      );
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
