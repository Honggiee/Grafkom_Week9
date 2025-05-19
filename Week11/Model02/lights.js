// hellocube-textured-phong/js/lights.js
import * as THREE from 'three';

export function addLights(scene) {
    // Ambient light untuk mengisi area gelap
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Warna, Intensitas
    scene.add(ambientLight);

    // Directional light untuk bayangan dan highlight phong
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    // directionalLight.castShadow = true; // Aktifkan jika ingin bayangan (perlu setup tambahan di renderer dan objek)
    scene.add(directionalLight);

    // Point light tambahan (opsional)
    const pointLight = new THREE.PointLight(0xffccaa, 0.5, 100); // Warna, Intensitas, Jarak
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Helper untuk melihat posisi directional light (opsional, untuk debugging)
    // const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(helper);
}