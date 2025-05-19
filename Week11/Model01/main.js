// hellocube-hierarchy/js/main.js
import * as THREE from "three";
import { initScene, initCamera, initRenderer } from "./sceneSetup.js";
import { createCubeHierarchy, addLights } from "./cube.js";
import { startAnimationLoop } from "./animation.js";
import { handleResize } from "./utils.js";

const canvas = document.getElementById("webglCanvas");
if (!canvas) {
  console.error("Canvas element #webglCanvas not found!");
} else {
  const scene = initScene();
  const camera = initCamera();
  camera.position.z = 10; // Sesuaikan posisi kamera untuk melihat hirarki
  const renderer = initRenderer(canvas);

  const animatedObjects = createCubeHierarchy(scene);

  // addLights(scene); // Tidak diperlukan untuk MeshBasicMaterial

  window.addEventListener("resize", () => {
    handleResize(camera, renderer);
  });

  startAnimationLoop(renderer, scene, camera, animatedObjects);

  handleResize(camera, renderer);
}
