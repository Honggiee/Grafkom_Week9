// hellocube-camera-orbit/js/lights.js
import * as THREE from 'three';

export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(8, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    const shadowCameraSize = 15;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -shadowCameraSize;
    directionalLight.shadow.camera.right = shadowCameraSize;
    directionalLight.shadow.camera.top = shadowCameraSize;
    directionalLight.shadow.camera.bottom = -shadowCameraSize;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffccaa, 0.4, 50);
    pointLight.position.set(-8, 5, -5);
    scene.add(pointLight);
}