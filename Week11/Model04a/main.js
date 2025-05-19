// hellocube-camera-orbit/js/main.js
import * as THREE from "three";
import {
  initScene,
  initCamera,
  initRenderer,
  initOrbitControls,
} from "./sceneSetup.js";
import { addLights } from "./lights.js";
// Impor OBJECTS_BASE_Y_WORLD dari sceneObjects.js
import { layoutSceneObjects, OBJECTS_BASE_Y_WORLD } from "./sceneObjects.js";
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

      const controls = initOrbitControls(camera, renderer.domElement);

      // Atur target OrbitControls ke sekitar pusat objek statis
      const targetY = OBJECTS_BASE_Y_WORLD + 1.0; // Sedikit di atas dasar objek
      controls.target.set(0, targetY, 0);
      controls.update();

      addLights(scene);
      layoutSceneObjects(scene, loadedTexture);

      window.addEventListener("resize", () => {
        handleResize(camera, renderer);
      });

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
