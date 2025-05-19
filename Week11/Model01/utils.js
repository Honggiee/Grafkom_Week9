// hellocube-hierarchy/js/utils.js

export function handleResize(camera, renderer) {
    // Update ukuran renderer dan aspek rasio kamera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Untuk layar retina
}