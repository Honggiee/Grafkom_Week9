// hellocube-walkthrough/js/animation.js
import * as THREE from 'three';
import { updatePlayerMovement } from './controlsManager.js'; // Impor fungsi update player

export function startAnimationLoop(renderer, scene, camera, playerControls, objectsToAnimate, groundY) {
    const clock = new THREE.Clock();
    const orbitSpeed = 0.3;

    function animate() {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();

        // Update pergerakan player (WASD)
        updatePlayerMovement(deltaTime, playerControls.controls, playerControls.moveState, groundY);

        // Animasikan objek yang mengorbit
        if (objectsToAnimate && objectsToAnimate.length > 0) {
            objectsToAnimate.forEach(obj => {
                if (obj.name === "orbitPivot") {
                    obj.rotation.y += orbitSpeed * deltaTime;
                }
            });
        }

        renderer.render(scene, camera);
    }
    animate();
}