// hellocube-walkthrough/js/main.js
import * as THREE from "three";
import { initScene, initCamera, initRenderer } from "./sceneSetup.js"; // initControls tidak diimpor lagi
import { addLights } from "./lights.js";
import { layoutSceneObjects } from "./sceneObjects.js";
import { initWalkControls } from "./controlsManager.js"; // Impor kontrol baru
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

      // Inisialisasi kontrol walkthrough
      const playerControls = initWalkControls(
        camera,
        renderer.domElement,
        scene
      );
      const groundY = -1.0; // Samakan dengan di sceneObjects

      addLights(scene);
      const animatedObjects = layoutSceneObjects(scene, loadedTexture);

      window.addEventListener("resize", () => {
        handleResize(camera, renderer); // Kamera masih perlu di-resize
      });

      // Kirim playerControls ke loop animasi
      startAnimationLoop(
        renderer,
        scene,
        camera,
        playerControls,
        animatedObjects,
        groundY
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
