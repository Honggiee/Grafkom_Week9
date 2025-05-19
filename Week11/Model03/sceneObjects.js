// hellocube-shadows/js/sceneObjects.js
import * as THREE from 'three';

// Fungsi untuk membuat KUBUS EMISIF PENUH, dengan pola emisi dari TEKSTUR UV
function createFullyEmissiveTexturedCube(
    size, uvTexture, emissiveColorTint = 0xffffff, emissiveIntensity = 1.5,
    edgeColor, initialPosition = { x: 0, y: 0, z: 0 }
) {
    const cubeContainer = new THREE.Object3D();
    cubeContainer.position.set(initialPosition.x, initialPosition.y, initialPosition.z);

    const geometry = new THREE.BoxGeometry(size, size, size);
    const emissiveFaceMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: emissiveColorTint,
        emissiveMap: uvTexture,
        emissiveIntensity: emissiveIntensity,
        metalness: 0.0,
        roughness: 1.0,
    });
    const emissiveCubeMesh = new THREE.Mesh(geometry, emissiveFaceMaterial);
    emissiveCubeMesh.castShadow = true; // Kubus melempar bayangan
    // emissiveCubeMesh.receiveShadow = false; // Kubus emisif biasanya tidak menerima bayangan dengan baik
    cubeContainer.add(emissiveCubeMesh);

    const finalEdgeColor = edgeColor || emissiveColorTint;
    const edgesMaterial = new THREE.LineBasicMaterial({ color: finalEdgeColor });
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgesMaterial);
    // Rusuk biasanya tidak melempar bayangan secara signifikan
    cubeContainer.add(wireframe);

    return cubeContainer;
}

// Fungsi untuk membuat bola dengan material Phong (shiny) dan tekstur
function createShinySphere(
    radius, texture, shininess, initialPosition = { x: 0, y: 0, z: 0 }, segments = 32
) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        color: 0xffffff,
        shininess: shininess,
        specular: 0xaaaaaa,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    sphere.castShadow = true; // Bola melempar bayangan
    sphere.receiveShadow = true; // Bola bisa menerima bayangan dari objek lain (jarang terlihat jika objeknya sendiri)
    return sphere;
}

// Fungsi untuk membuat kerucut dengan material Phong (shiny) dan tekstur
function createShinyCone(
    radius, height, texture, shininess, initialPosition = { x: 0, y: 0, z: 0 }, radialSegments = 32
) {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        color: 0xffffff,
        shininess: shininess,
        specular: 0xaaaaaa,
    });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    cone.castShadow = true; // Kerucut melempar bayangan
    cone.receiveShadow = true; // Kerucut bisa menerima bayangan
    return cone;
}

// Fungsi untuk membuat plane dengan tekstur
function createTexturedPlane(size, texture, colorTint = 0xffffff) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: colorTint,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.2
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true; // PLANE MENERIMA BAYANGAN
    return plane;
}


export function layoutSceneObjects(scene, uvTexture) {
    const objectsToAnimate = [];
    const spacing = 3.0;
    let currentX = -spacing;

    const planeSize = 20; // Perbesar plane agar bayangan tidak terpotong
    const groundPlane = createTexturedPlane(planeSize, uvTexture, 0x888888); // Gelapkan sedikit plane
    const groundPlaneY = -2.5;
    groundPlane.position.y = groundPlaneY;
    scene.add(groundPlane);

    const cubeSize = 2;
    const cubeEmissiveTint = 0xffffff;
    const cubeEmissiveIntensity = 1.2; // Turunkan sedikit emisi agar bayangan lebih terlihat kontras
    const cubeEdgeColor = 0xffddaa;
    const cubeYPosition = groundPlaneY + (cubeSize / 2);
    const fullyEmissiveCube = createFullyEmissiveTexturedCube(
        cubeSize, uvTexture, cubeEmissiveTint, cubeEmissiveIntensity,
        cubeEdgeColor, { x: currentX, y: cubeYPosition, z: 0 }
    );
    fullyEmissiveCube.name = "fullyEmissiveCube";
    scene.add(fullyEmissiveCube);
    currentX += spacing;

    const sphereRadius = 1.0;
    const sphereShininess = 70; // Sedikit kurangi shininess
    const sphereYPosition = groundPlaneY + sphereRadius;
    const shinySphere = createShinySphere(
        sphereRadius, uvTexture, sphereShininess,
        { x: currentX, y: sphereYPosition, z: 0 }
    );
    shinySphere.name = "shinySphere";
    scene.add(shinySphere);
    currentX += spacing;

    const coneRadius = 0.8;
    const coneHeight = 2.2;
    const coneShininess = 50; // Sedikit kurangi shininess
    const coneYPosition = groundPlaneY + (coneHeight / 2);
    const shinyCone = createShinyCone(
        coneRadius, coneHeight, uvTexture, coneShininess,
        { x: currentX, y: coneYPosition, z: 0 }
    );
    shinyCone.name = "shinyCone";
    scene.add(shinyCone);

    return objectsToAnimate;
}