// hellocube-raycast-hover/js/lights.js
import * as THREE from 'three';

export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Tingkatkan ambient sedikit
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true; // Tetap aktifkan jika plane menerima bayangan
    directionalLight.shadow.mapSize.width = 1024; // Bisa diturunkan jika tidak fokus ke bayangan
    directionalLight.shadow.mapSize.height = 1024;
    const shadowCameraSize = 10;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 30;
    directionalLight.shadow.camera.left = -shadowCameraSize;
    directionalLight.shadow.camera.right = shadowCameraSize;
    directionalLight.shadow.camera.top = shadowCameraSize;
    directionalLight.shadow.camera.bottom = -shadowCameraSize;
    directionalLight.shadow.bias = -0.001;
    scene.add(directionalLight);
}