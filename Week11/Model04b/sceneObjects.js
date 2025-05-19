// hellocube-walkthrough/js/sceneObjects.js
import * as THREE from 'three';

// --- Fungsi-fungsi pembuatan objek (kubus, bola, kerucut, plane) tetap sama ---
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


export function layoutSceneObjects(scene, uvTexture) {
    const objectsToAnimate = [];

    const groundPlaneY = -1.0; // Naikkan sedikit ground plane untuk posisi kamera awal yang lebih baik

    const planeSize = 20;
    const groundPlane = createTexturedPlane(planeSize, uvTexture, 0x888888);
    groundPlane.position.y = groundPlaneY;
    scene.add(groundPlane);

    const orbitPivot = new THREE.Object3D();
    orbitPivot.name = "orbitPivot";
    orbitPivot.position.y = 0; // Pivot di y=0, objek anak akan relatif
    scene.add(orbitPivot);
    objectsToAnimate.push(orbitPivot);

    const orbitRadius = 4.0;
    const numObjects = 3;
    const angleIncrement = (Math.PI * 2) / numObjects;

    const cubeSize = 1.8;
    const cubeEmissiveTint = 0xffffff;
    const cubeEmissiveIntensity = 1.2;
    const cubeEdgeColor = 0xffddaa;
    const cubeYPosition = groundPlaneY + (cubeSize / 2);
    const cubeAngle = 0;
    const cubeX = Math.cos(cubeAngle) * orbitRadius;
    const cubeZ = Math.sin(cubeAngle) * orbitRadius;
    const fullyEmissiveCube = createFullyEmissiveTexturedCube(
        cubeSize, uvTexture, cubeEmissiveTint, cubeEmissiveIntensity,
        cubeEdgeColor, { x: cubeX, y: cubeYPosition - orbitPivot.position.y, z: cubeZ } 
    );
    orbitPivot.add(fullyEmissiveCube);

    const sphereRadius = 0.9;
    const sphereShininess = 70;
    const sphereYPosition = groundPlaneY + sphereRadius;
    const sphereAngle = angleIncrement;
    const sphereX = Math.cos(sphereAngle) * orbitRadius;
    const sphereZ = Math.sin(sphereAngle) * orbitRadius;
    const shinySphere = createShinySphere(
        sphereRadius, uvTexture, sphereShininess,
        { x: sphereX, y: sphereYPosition - orbitPivot.position.y, z: sphereZ }
    );
    orbitPivot.add(shinySphere);

    const coneRadius = 0.7;
    const coneHeight = 2.0;
    const coneShininess = 50;
    const coneYPosition = groundPlaneY + (coneHeight / 2);
    const coneAngle = angleIncrement * 2;
    const coneX = Math.cos(coneAngle) * orbitRadius;
    const coneZ = Math.sin(coneAngle) * orbitRadius;
    const shinyCone = createShinyCone(
        coneRadius, coneHeight, uvTexture, coneShininess,
        { x: coneX, y: coneYPosition - orbitPivot.position.y, z: coneZ }
    );
    orbitPivot.add(shinyCone);

    return objectsToAnimate;
}