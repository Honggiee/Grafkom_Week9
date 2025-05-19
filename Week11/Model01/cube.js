// hellocube-hierarchy/js/cube.js
import * as THREE from "three";

// Fungsi untuk membuat objek kubus dasar (bisa juga untuk induk)
function createBaseCube(size, color, initialPosition = { x: 0, y: 0, z: 0 }) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  return cube;
}

// Fungsi untuk membuat objek bola
function createSphere(
  radius,
  color,
  initialPosition = { x: 0, y: 0, z: 0 },
  segments = 32
) {
  const geometry = new THREE.SphereGeometry(radius, segments, segments); // Radius, widthSegments, heightSegments
  const material = new THREE.MeshBasicMaterial({ color: color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  return sphere;
}

// Fungsi untuk membuat kubus induk yang transparan dengan rusuk
function createTransparentWireframeCube(
  size,
  edgeColor = 0xffffff,
  faceOpacity = 0.1,
  initialPosition = { x: 0, y: 0, z: 0 }
) {
  // Objek utama (Mesh) untuk transformasi dan sebagai induk
  const parentObject = new THREE.Object3D();
  parentObject.position.set(
    initialPosition.x,
    initialPosition.y,
    initialPosition.z
  );

  // Geometri kubus
  const geometry = new THREE.BoxGeometry(size, size, size);

  // Material untuk sisi transparan (opsional, bisa juga tidak ada mesh sama sekali jika hanya mau rusuk)
  // Jika Anda ingin benar-benar hanya rusuk, bagian ini bisa di-skip dan hanya LineSegments yang dibuat.
  // Namun, memiliki mesh transparan bisa berguna untuk interaksi atau efek lain.
  const transparentMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa, // Warna sisi, tidak terlalu penting jika sangat transparan
    transparent: true,
    opacity: faceOpacity,
    // depthWrite: false // Bisa diperlukan jika ada masalah z-fighting dengan objek lain
  });
  const transparentCubeMesh = new THREE.Mesh(geometry, transparentMaterial);
  parentObject.add(transparentCubeMesh); // Tambahkan mesh transparan ke parentObject

  // Material dan Geometri untuk Rusuk
  const edgesGeometry = new THREE.EdgesGeometry(geometry); // Membuat geometri hanya dari rusuk
  const edgesMaterial = new THREE.LineBasicMaterial({ color: edgeColor });
  const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  parentObject.add(wireframe); // Tambahkan rusuk ke parentObject

  return parentObject; // Mengembalikan Object3D yang berisi mesh transparan dan rusuknya
}

export function createCubeHierarchy(scene) {
  const objectsToAnimate = [];

  // Kubus Induk (Parent) - Transparan dengan Rusuk
  const parentCubeSize = 2;
  const parentCubeEdgeColor = 0xffffff; // Putih untuk rusuk
  const parentCubeFaceOpacity = 0.15; // Sedikit terlihat untuk sisi
  const parentContainer = createTransparentWireframeCube(
    parentCubeSize,
    parentCubeEdgeColor,
    parentCubeFaceOpacity,
    { x: 0, y: 0, z: 0 }
  );
  parentContainer.name = "parentContainer";
  scene.add(parentContainer);
  objectsToAnimate.push(parentContainer); // Induk akan dianimasikan

  // Bola Anak 1 (Child Sphere 1)
  const child1Radius = 0.5; // Ukuran bola (sebelumnya child1Size = 1)
  const child1Color = 0x00ff00; // Hijau
  // Posisi relatif terhadap pusat objek induk
  const child1RelativePosition = {
    x: parentCubeSize / 2 + child1Radius + 0.2,
    y: 0,
    z: 0,
  };
  const childSphere1 = createSphere(
    child1Radius,
    child1Color,
    child1RelativePosition
  );
  childSphere1.name = "childSphere1";
  parentContainer.add(childSphere1); // Menambahkan anak ke induk

  // Bola Anak 2 (Child Sphere 2)
  const child2Radius = 0.375; // Ukuran bola (sebelumnya child2Size = 0.75)
  const child2Color = 0x0000ff; // Biru
  const child2RelativePosition = {
    x: 0,
    y: parentCubeSize / 2 + child2Radius + 0.2,
    z: 0,
  };
  const childSphere2 = createSphere(
    child2Radius,
    child2Color,
    child2RelativePosition
  );
  childSphere2.name = "childSphere2";
  parentContainer.add(childSphere2);

  // Bola Cucu (Grandchild Sphere) - anak dari childSphere1
  const grandchildRadius = 0.25; // Ukuran bola (sebelumnya grandchildSize = 0.5)
  const grandchildColor = 0xffff00; // Kuning
  // Posisi relatif terhadap pusat childSphere1 (yang sudah diposisikan relatif ke parent)
  const grandchildRelativePosition = {
    x: 0,
    y: child1Radius + grandchildRadius + 0.1,
    z: 0,
  };
  const grandchildSphere = createSphere(
    grandchildRadius,
    grandchildColor,
    grandchildRelativePosition
  );
  grandchildSphere.name = "grandchildSphere";
  childSphere1.add(grandchildSphere); // Cucu ditambahkan ke childSphere1

  return objectsToAnimate;
}

// Fungsi addLights tetap sama, tidak berdampak pada MeshBasicMaterial objek kita
export function addLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
}
