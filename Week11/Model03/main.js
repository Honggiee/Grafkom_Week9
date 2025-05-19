// hellocube-shadows/js/main.js
import * as THREE from "three";
import {
  initScene,
  initCamera,
  initRenderer,
  initControls,
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
      camera.position.set(2, 4, 10); // Sesuaikan posisi kamera agar bayangan terlihat baik
      camera.lookAt(0, 0, 0);

      const renderer = initRenderer(canvas);
      const controls = initControls(camera, renderer.domElement);

      addLights(scene);
      const animatedObjects = layoutSceneObjects(scene, loadedTexture);

      window.addEventListener("resize", () => {
        handleResize(camera, renderer);
      });

      startAnimationLoop(renderer, scene, camera, controls, animatedObjects);
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
