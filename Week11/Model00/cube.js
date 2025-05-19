// hellocube/js/cube.js
import * as THREE from 'three';

export function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1); // Lebar, Tinggi, Kedalaman
    
    // MeshNormalMaterial menampilkan warna berdasarkan normal vektor permukaan.
    // Tidak memerlukan cahaya untuk terlihat. Bagus untuk debugging atau efek sederhana.
    const material = new THREE.MeshNormalMaterial(); 
    
    // Alternatif jika ingin warna solid (membutuhkan cahaya agar terlihat baik):
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Hijau

    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

export function addLights(scene) {
    // Ini hanya diperlukan jika Anda menggunakan material seperti MeshStandardMaterial
    // Untuk MeshNormalMaterial, ini tidak wajib.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Warna, Intensitas
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5); // Arahkan dari atas-kanan-depan
    scene.add(directionalLight);
}