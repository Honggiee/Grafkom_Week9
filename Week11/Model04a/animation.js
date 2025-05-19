// hellocube-camera-orbit/js/animation.js
import * as THREE from 'three'; // Diperlukan untuk THREE.Clock dan THREE.Vector3

export function startAnimationLoop(renderer, scene, camera) { // Tidak perlu controls lagi
    const clock = new THREE.Clock();

    const orbitRadius = 10;        // Jarak kamera dari pusat orbit
    const orbitSpeed = 0.2;        // Kecepatan orbit (radian per detik)
    const cameraHeight = 4;        // Ketinggian kamera (posisi Y)
    
    // Titik yang akan dilihat dan dikelilingi kamera
    // Sesuaikan Y target ini agar konsisten dengan tinggi objek Anda
    const orbitTargetPosition = new THREE.Vector3(0, -2.5 + 1.0, 0); // Sama dengan targetY di main.js sebelumnya

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime(); // Total waktu yang telah berlalu

        // Hitung posisi kamera baru untuk orbit
        camera.position.x = orbitTargetPosition.x + orbitRadius * Math.cos(elapsedTime * orbitSpeed);
        camera.position.z = orbitTargetPosition.z + orbitRadius * Math.sin(elapsedTime * orbitSpeed);
        camera.position.y = cameraHeight; // Jaga ketinggian kamera tetap

        // Arahkan kamera untuk selalu melihat ke titik target orbit
        camera.lookAt(orbitTargetPosition);

        // Tidak ada update controls di sini lagi

        renderer.render(scene, camera);
    }
    animate();
}