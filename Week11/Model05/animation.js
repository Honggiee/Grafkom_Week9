// hellocube-raycast-hover/js/animation.js
// Tidak perlu THREE.Clock jika hanya update controls
// import * as THREE from 'three';

export function startAnimationLoop(renderer, scene, camera, controls) {
    function animate() {
        requestAnimationFrame(animate);

        if (controls) {
            controls.update();
        }

        renderer.render(scene, camera);
    }
    animate();
}