// hellocube/js/cube.js
import * as THREE from "three";

export function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1); // Lebar, Tinggi, Kedalaman

  // Menggunakan MeshBasicMaterial untuk warna solid tanpa shading
  // Anda bisa memilih warna apa saja. Contoh: 0x00ff00 (hijau), 0xff0000 (merah), 0x0077ff (biru)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Warna hijau solid

  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

export function addLights(scene) {
  // Fungsi ini tidak lagi diperlukan untuk kubus dengan MeshBasicMaterial,
  // tapi bisa berguna jika Anda menambahkan objek lain dengan material berbeda.
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
}
