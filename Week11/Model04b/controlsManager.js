// hellocube-walkthrough/js/controlsManager.js
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

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
        blocker.style.display = 'flex'; // Kembalikan ke flex untuk centering
        instructions.style.display = '';
    });

    scene.add(controls.getObject()); // Menambahkan objek kontroler (yang berisi kamera) ke scene

    const moveState = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        // jump: false // Untuk nanti
    };

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveState.forward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveState.left = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveState.backward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveState.right = true;
                break;
            // case 'Space':
            //     moveState.jump = true;
            //     break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveState.forward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveState.left = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveState.backward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveState.right = false;
                break;
            // case 'Space':
            //     moveState.jump = false;
            //     break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return { controls, moveState };
}

const P_L_ACCEL_SPEED = 0.07;
const P_L_DECCEL_SPEED = 10.0;
//const P_L_MAX_SPEED = 0.3; // not used in this simple version
const P_L_PLAYER_HEIGHT = 1.7; // Tinggi kamera dari "kaki" player

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

export function updatePlayerMovement(deltaTime, controls, moveState, groundY = -1.0) {
    if (controls.isLocked === true) {
        const P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED = P_L_DECCEL_SPEED * deltaTime;

        velocity.x -= velocity.x * P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED;
        velocity.z -= velocity.z * P_L_DECCEL_SPEED_DELTA_TIME_COMPENSATED;
        // velocity.y -= 9.8 * 1.0 * deltaTime; // gravitasi sederhana (1.0 massa, tidak ada lompat)

        direction.z = Number(moveState.forward) - Number(moveState.backward);
        direction.x = Number(moveState.right) - Number(moveState.left);
        direction.normalize(); // memastikan gerakan diagonal konsisten

        if (moveState.forward || moveState.backward) velocity.z -= direction.z * P_L_ACCEL_SPEED;
        if (moveState.left || moveState.right) velocity.x -= direction.x * P_L_ACCEL_SPEED;
        
        // Apply movement
        controls.moveRight(-velocity.x * deltaTime); // Perhatikan -velocity.x karena moveRight positif ke kanan
        controls.moveForward(-velocity.z * deltaTime); // Perhatikan -velocity.z karena moveForward positif ke depan

        // Jaga pemain di atas ground plane (sangat sederhana, tanpa collision detection)
        // Objek kontrol (yang berisi kamera) adalah yang kita gerakkan.
        // Posisi Y nya adalah posisi "mata" pemain.
        if (controls.getObject().position.y < groundY + P_L_PLAYER_HEIGHT) {
            // velocity.y = 0; // Hentikan jatuh jika ada gravitasi
            controls.getObject().position.y = groundY + P_L_PLAYER_HEIGHT;
        }
    }
}