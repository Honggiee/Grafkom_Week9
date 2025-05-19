// hellocube-camera-orbit/js/sceneObjects.js
import * as THREE from 'three';

// --- Fungsi-fungsi pembuatan objek (kubus, bola, kerucut, plane) ---
function createFullyEmissiveTexturedCube(
    size, uvTexture, emissiveColorTint = 0xffffff, emissiveIntensity = 1.5,
    edgeColor, initialPosition = { x: 0, y: 0, z: 0 }
) {
    const cubeContainer = new THREE.Object3D();
    const geometry = new THREE.BoxGeometry(size, size, size);
    const emissiveFaceMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000, emissive: emissiveColorTint, emissiveMap: uvTexture,
        emissiveIntensity: emissiveIntensity, metalness: 0.0, roughness: 1.0,
    });
    const emissiveCubeMesh = new THREE.Mesh(geometry, emissiveFaceMaterial);
    emissiveCubeMesh.castShadow = true;
    cubeContainer.add(emissiveCubeMesh);

    const finalEdgeColor = edgeColor || emissiveColorTint;
    const edgesMaterial = new THREE.LineBasicMaterial({ color: finalEdgeColor });
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgesMaterial);
    cubeContainer.add(wireframe);

    cubeContainer.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    return cubeContainer;
}

function createShinySphere(
    radius, texture, shininess, initialPosition = { x: 0, y: 0, z: 0 }, segments = 32
) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshPhongMaterial({
        map: texture, color: 0xffffff, shininess: shininess, specular: 0xaaaaaa,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    return sphere;
}

function createShinyCone(
    radius, height, texture, shininess, initialPosition = { x: 0, y: 0, z: 0 }, radialSegments = 32
) {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshPhongMaterial({
        map: texture, color: 0xffffff, shininess: shininess, specular: 0xaaaaaa,
    });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    cone.castShadow = true;
    cone.receiveShadow = true;
    return cone;
}

function createTexturedPlane(size, texture, colorTint = 0xffffff) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshStandardMaterial({
        map: texture, color: colorTint, side: THREE.DoubleSide,
        roughness: 0.8, metalness: 0.2
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    return plane;
}
// --- Akhir fungsi pembuatan objek ---

// Definisikan dan ekspor konstanta untuk Y dasar objek
export const OBJECTS_BASE_Y_WORLD = -2.5;

export function layoutSceneObjects(scene, uvTexture) {
    const groundPlaneY = OBJECTS_BASE_Y_WORLD;

    const planeSize = 20;
    const groundPlane = createTexturedPlane(planeSize, uvTexture, 0x888888);
    groundPlane.position.y = groundPlaneY;
    scene.add(groundPlane);

    const spacing = 3.0;
    let currentX = -spacing;

    const cubeSize = 1.8;
    const cubeEmissiveTint = 0xffffff;
    const cubeEmissiveIntensity = 1.2;
    const cubeEdgeColor = 0xffddaa;
    const cubeYPosition = groundPlaneY + (cubeSize / 2);
    const fullyEmissiveCube = createFullyEmissiveTexturedCube(
        cubeSize, uvTexture, cubeEmissiveTint, cubeEmissiveIntensity,
        cubeEdgeColor, { x: currentX, y: cubeYPosition, z: 0 }
    );
    fullyEmissiveCube.name = "fullyEmissiveCube";
    scene.add(fullyEmissiveCube);
    currentX += spacing;

    const sphereRadius = 0.9;
    const sphereShininess = 70;
    const sphereYPosition = groundPlaneY + sphereRadius;
    const shinySphere = createShinySphere(
        sphereRadius, uvTexture, sphereShininess,
        { x: currentX, y: sphereYPosition, z: 0 }
    );
    shinySphere.name = "shinySphere";
    scene.add(shinySphere);
    currentX += spacing;

    const coneRadius = 0.7;
    const coneHeight = 2.0;
    const coneShininess = 50;
    const coneYPosition = groundPlaneY + (coneHeight / 2);
    const shinyCone = createShinyCone(
        coneRadius, coneHeight, uvTexture, coneShininess,
        { x: currentX, y: coneYPosition, z: 0 }
    );
    shinyCone.name = "shinyCone";
    scene.add(shinyCone);

    // Tidak ada objek yang perlu dianimasikan (selain kamera via controls)
}