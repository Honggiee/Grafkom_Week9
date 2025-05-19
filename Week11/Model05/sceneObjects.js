// hellocube-raycast-hover/js/sceneObjects.js
import * as THREE from 'three';

const HOVER_COLOR = new THREE.Color(0xffaa00); // Oranye untuk hover

// Fungsi untuk membuat kubus dengan warna solid
function createColorCube(size, color, initialPosition = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    // Gunakan MeshPhongMaterial atau MeshStandardMaterial agar bisa berubah warna & bereaksi thd cahaya
    const material = new THREE.MeshPhongMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    
    cube.userData.originalColor = color.clone(); // Simpan warna asli
    cube.userData.isHoverable = true; // Tandai sebagai objek yang bisa di-hover
    
    cube.castShadow = true;
    // cube.receiveShadow = true; // Biasanya tidak perlu untuk objek kecil ini
    return cube;
}

// Fungsi untuk membuat bola dengan warna solid
function createColorSphere(radius, color, initialPosition = { x: 0, y: 0, z: 0 }, segments = 32) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(initialPosition.x, initialPosition.y, initialPosition.z);

    sphere.userData.originalColor = color.clone();
    sphere.userData.isHoverable = true;

    sphere.castShadow = true;
    sphere.receiveShadow = true;
    return sphere;
}

// Fungsi untuk membuat kerucut dengan warna solid
function createColorCone(radius, height, color, initialPosition = { x: 0, y: 0, z: 0 }, radialSegments = 32) {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(initialPosition.x, initialPosition.y, initialPosition.z);

    cone.userData.originalColor = color.clone();
    cone.userData.isHoverable = true;

    cone.castShadow = true;
    cone.receiveShadow = true;
    return cone;
}

// Fungsi untuk membuat plane dengan warna solid
function createColorPlane(size, color = 0x555555) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshStandardMaterial({ // Standard material baik untuk plane
        color: color,
        side: THREE.DoubleSide,
        roughness: 0.9, // Kurang reflektif
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true; // Plane menerima bayangan
    // plane.userData.isHoverable = false; // Plane tidak di-hover (default)
    return plane;
}

export const OBJECTS_BASE_Y_WORLD = -1.5; // Ketinggian dasar objek

export function layoutSceneObjects(scene) {
    const interactableObjects = []; // Kumpulkan objek yang bisa di-hover

    const groundPlaneY = OBJECTS_BASE_Y_WORLD;

    const planeSize = 15;
    const groundPlane = createColorPlane(planeSize, new THREE.Color(0x444444));
    groundPlane.position.y = groundPlaneY;
    scene.add(groundPlane);

    const spacing = 2.5;
    let currentX = -spacing;

    const cubeSize = 1.5;
    const cubeColor = new THREE.Color(0x00ff00); // Hijau
    const cubeYPosition = groundPlaneY + (cubeSize / 2);
    const solidCube = createColorCube(
        cubeSize, cubeColor, { x: currentX, y: cubeYPosition, z: 0 }
    );
    scene.add(solidCube);
    interactableObjects.push(solidCube);
    currentX += spacing;

    const sphereRadius = 0.8;
    const sphereColor = new THREE.Color(0xff0000); // Merah
    const sphereYPosition = groundPlaneY + sphereRadius;
    const solidSphere = createColorSphere(
        sphereRadius, sphereColor, { x: currentX, y: sphereYPosition, z: 0 }
    );
    scene.add(solidSphere);
    interactableObjects.push(solidSphere);
    currentX += spacing;

    const coneRadius = 0.7;
    const coneHeight = 1.8;
    const coneColor = new THREE.Color(0x0000ff); // Biru
    const coneYPosition = groundPlaneY + (coneHeight / 2);
    const solidCone = createColorCone(
        coneRadius, coneHeight, coneColor, { x: currentX, y: coneYPosition, z: 0 }
    );
    scene.add(solidCone);
    interactableObjects.push(solidCone);

    return interactableObjects; // Kembalikan objek yang bisa di-hover
}