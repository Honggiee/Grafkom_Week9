// hellocube-walkthrough/js/animation.js
import * as THREE from 'three';
import { updatePlayerMovement } from './controlsManager.js';

// objectsToAnimate dan orbitSpeed tidak lagi diperlukan di sini
export function startAnimationLoop(renderer, scene, camera, playerControls, groundY) { 
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();

        // Update pergerakan player (WASD)
        updatePlayerMovement(deltaTime, playerControls.controls, playerControls.moveState, groundY);

        // Tidak ada lagi animasi untuk orbitPivot karena objek statis
        // if (objectsToAnimate && objectsToAnimate.length > 0) { ... }

        renderer.render(scene, camera);
    }
    animate();
}