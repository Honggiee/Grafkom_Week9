// hellocube-shadows/js/lights.js
import * as THREE from 'three';

export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Turunkan intensitas ambient agar bayangan lebih terlihat
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Warna dan intensitas
    directionalLight.position.set(8, 15, 10); // Posisikan cahaya untuk arah bayangan yang baik
    
    // AKTIFKAN CAST SHADOW UNTUK CAHAYA INI
    directionalLight.castShadow = true;

    // KONFIGURASI SHADOW MAP PADA CAHAYA
    directionalLight.shadow.mapSize.width = 2048; // Resolusi peta bayangan (lebih tinggi = lebih detail, lebih mahal)
    directionalLight.shadow.mapSize.height = 2048;
    
    // Atur frustum kamera bayangan (area yang dicakup oleh bayangan)
    // Ini perlu disesuaikan berdasarkan ukuran scene Anda
    const shadowCameraSize = 15; // Seberapa besar area yang dicakup bayangan
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -shadowCameraSize;
    directionalLight.shadow.camera.right = shadowCameraSize;
    directionalLight.shadow.camera.top = shadowCameraSize;
    directionalLight.shadow.camera.bottom = -shadowCameraSize;

    // Opsional: Shadow bias untuk menghindari shadow acne (artefak pada permukaan sendiri)
    directionalLight.shadow.bias = -0.0005; // Coba nilai kecil negatif
    // directionalLight.shadow.normalBias = 0.01;


    scene.add(directionalLight);

    // Opsional: Helper untuk melihat frustum kamera bayangan (untuk debugging)
    // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(shadowHelper);
    // const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(lightHelper);


    // Point light (biasanya PointLight juga bisa cast shadow, tapi lebih mahal dari DirectionalLight)
    // Untuk contoh ini, kita biarkan PointLight tanpa bayangan agar tidak terlalu kompleks.
    const pointLight = new THREE.PointLight(0xffccaa, 0.4, 50);
    pointLight.position.set(-8, 5, -5);
    // pointLight.castShadow = true; // Jika ingin point light juga cast shadow
    scene.add(pointLight);
}