// hellocube-textured-phong/js/sceneObjects.js
import * as THREE from "three";

// Fungsi untuk membuat KUBUS EMISIF PENUH, dengan pola emisi dari TEKSTUR UV
function createFullyEmissiveTexturedCube(
  size,
  uvTexture, // Tekstur UV yang akan digunakan untuk pola emisi
  emissiveColorTint = 0xffffff, // Warna untuk MENGALIKAN tekstur emisi. Putih = warna asli tekstur.
  emissiveIntensity = 1.5, // Seberapa kuat emisinya
  edgeColor, // Warna spesifik untuk rusuk
  initialPosition = { x: 0, y: 0, z: 0 }
) {
  const cubeContainer = new THREE.Object3D();
  cubeContainer.position.set(
    initialPosition.x,
    initialPosition.y,
    initialPosition.z
  );

  const geometry = new THREE.BoxGeometry(size, size, size);

  // Material untuk Sisi Emisif dengan pola dari Tekstur UV
  const emissiveFaceMaterial = new THREE.MeshStandardMaterial({
    // map: uvTexture, // Jika Anda ingin tekstur juga terlihat sebagai warna dasar (albedo)
    // selain sebagai pola emisi. Bisa dihilangkan jika hanya ingin emisi.
    color: 0x000000, // Set warna dasar (albedo) ke hitam, sehingga HANYA emisi yang terlihat.
    // Ini memastikan bahwa apa pun yang tidak memancarkan (bagian hitam dari emissiveMap)
    // akan tetap hitam dan tidak terpengaruh oleh cahaya scene.

    emissive: emissiveColorTint, // Warna ini dikalikan dengan nilai dari emissiveMap.
    // Jika emissiveMap berwarna, dan tint putih, maka warna asli map yang bersinar.
    // Jika emissiveMap grayscale, tint akan memberi warna pada emisi.
    emissiveMap: uvTexture, // Tekstur UV Anda menjadi sumber pola emisi.
    emissiveIntensity: emissiveIntensity,

    metalness: 0.0, // Tidak metalik untuk emisi murni
    roughness: 1.0, // Tidak ada kilap untuk emisi murni
  });
  const emissiveCubeMesh = new THREE.Mesh(geometry, emissiveFaceMaterial);
  cubeContainer.add(emissiveCubeMesh);

  // Material untuk Rusuk
  const finalEdgeColor = edgeColor || emissiveColorTint; // Default ke warna tint emisi jika tidak ada edgeColor
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: finalEdgeColor,
  });
  const wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgesMaterial
  );
  cubeContainer.add(wireframe);

  return cubeContainer;
}

// Fungsi untuk membuat bola dengan material Phong (shiny) dan tekstur (tetap sama)
function createShinySphere(
  radius,
  texture,
  shininess,
  initialPosition = { x: 0, y: 0, z: 0 },
  segments = 32
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
  return sphere;
}

// Fungsi untuk membuat kerucut dengan material Phong (shiny) dan tekstur (tetap sama)
function createShinyCone(
  radius,
  height,
  texture,
  shininess,
  initialPosition = { x: 0, y: 0, z: 0 },
  radialSegments = 32
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
  return cone;
}

// Fungsi untuk membuat plane dengan tekstur (tetap sama)
function createTexturedPlane(size, texture, colorTint = 0xffffff) {
  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: colorTint,
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0.2,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  return plane;
}

export function layoutSceneObjects(scene, uvTexture) {
  const objectsToAnimate = [];
  const spacing = 3.0;
  let currentX = -spacing;

  const planeSize = 15;
  const groundPlane = createTexturedPlane(planeSize, uvTexture, 0x999999); // Plane sedikit lebih gelap
  const groundPlaneY = -2.5;
  groundPlane.position.y = groundPlaneY;
  scene.add(groundPlane);

  // Kubus: Sepenuhnya Emisif, pola emisi dari uvTexture
  const cubeSize = 2;
  // Jika tekstur UV Anda (uv_grid_opengl.png) sudah berwarna seperti yang Anda inginkan untuk emisi:
  const cubeEmissiveTint = 0xffffff; // PUTIH, agar warna asli dari uvTexture yang bersinar.
  // Jika tekstur UV Anda grayscale dan Anda ingin memberinya WARNA emisi:
  // const cubeEmissiveTint = 0xffaa00; // Misalnya, Oranye.

  const cubeEmissiveIntensity = 1.5; // Intensitas emisi. Coba naikkan ini jika kurang terang.
  const cubeEdgeColor = 0xffddaa; // Warna rusuk (misalnya, krem terang)
  const cubeYPosition = groundPlaneY + cubeSize / 2;

  const fullyEmissiveCube = createFullyEmissiveTexturedCube(
    cubeSize,
    uvTexture, // INI adalah tekstur UV Anda
    cubeEmissiveTint,
    cubeEmissiveIntensity,
    cubeEdgeColor,
    { x: currentX, y: cubeYPosition, z: 0 }
  );
  fullyEmissiveCube.name = "fullyEmissiveCube";
  scene.add(fullyEmissiveCube);
  currentX += spacing;

  // Bola (Shiny) - tetap menggunakan uvTexture untuk permukaannya
  const sphereRadius = 1.0;
  const sphereShininess = 90;
  const sphereYPosition = groundPlaneY + sphereRadius;
  const shinySphere = createShinySphere(
    sphereRadius,
    uvTexture, // Bola juga menggunakan tekstur UV
    sphereShininess,
    { x: currentX, y: sphereYPosition, z: 0 }
  );
  shinySphere.name = "shinySphere";
  scene.add(shinySphere);
  currentX += spacing;

  // Kerucut (Shiny) - tetap menggunakan uvTexture untuk permukaannya
  const coneRadius = 0.8;
  const coneHeight = 2.2;
  const coneShininess = 60;
  const coneYPosition = groundPlaneY + coneHeight / 2;
  const shinyCone = createShinyCone(
    coneRadius,
    coneHeight,
    uvTexture, // Kerucut juga menggunakan tekstur UV
    coneShininess,
    { x: currentX, y: coneYPosition, z: 0 }
  );
  shinyCone.name = "shinyCone";
  scene.add(shinyCone);

  return objectsToAnimate;
}
