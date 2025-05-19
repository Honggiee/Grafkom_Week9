// hellocube-walkthrough/js/controlsManager.js
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OBJECTS_BASE_Y_WORLD } from './sceneObjects.js'; // Impor untuk konsistensi groundY

export function initWalkControls(camera, domElement, scene) {
    const controls = new PointerLockControls(camera, domElement);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'flex';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());

    const moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveState.forward = true; break;
            case 'ArrowLeft': case 'KeyA': moveState.left = true; break;
            case 'ArrowDown': case 'KeyS': moveState.backward = true; break;
            case 'ArrowRight': case 'KeyD': moveState.right = true; break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveState.forward = false; break;
            case 'ArrowLeft': case 'KeyA': moveState.left = false; break;
            case 'ArrowDown': case 'KeyS': moveState.backward = false; break;
            case 'ArrowRight': case 'KeyD': moveState.right = false; break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return { controls, moveState };
}

// TINGKATKAN KECEPATAN AKSELERASI
const P_L_ACCEL_SPEED = 0.2; // Coba nilai 0.15, 0.2, atau bahkan lebih tinggi
const P_L_DECCEL_SPEED = 10.0;
const P_L_PLAYER_HEIGHT = 1.7; // Tinggi "mata" pemain dari kakinya

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Menggunakan OBJECTS_BASE_Y_WORLD sebagai groundY default
export function updatePlayerMovement(deltaTime, controls, moveState, groundY = OBJECTS_BASE_Y_WORLD) {
    if (controls.isLocked === true) {
        const P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED = P_L_DECCEL_SPEED * deltaTime;

        velocity.x -= velocity.x * P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED;
        velocity.z -= velocity.z * P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED;

        direction.z = Number(moveState.forward) - Number(moveState.backward);
        direction.x = Number(moveState.right) - Number(moveState.left);
        direction.normalize(); // memastikan gerakan diagonal konsisten

        if (moveState.forward || moveState.backward) velocity.z -= direction.z * P_L_ACCEL_SPEED;
        if (moveState.left || moveState.right) velocity.x -= direction.x * P_L_ACCEL_SPEED;
        
        // Apply movement
        controls.moveRight(-velocity.x * deltaTime); 
        controls.moveForward(-velocity.z * deltaTime);

        // Jaga pemain di atas ground plane
        if (controls.getObject().position.y < groundY + P_L_PLAYER_HEIGHT) {
            controls.getObject().position.y = groundY + P_L_PLAYER_HEIGHT;
        }
    }
}