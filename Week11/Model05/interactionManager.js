// hellocube-raycast-hover/js/interactionManager.js
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredObject = null;

const HOVER_COLOR = new THREE.Color(0xffaa00); // Oranye

function onPointerMove(event, camera, interactableObjects, rendererDomElement) {
    // Hitung posisi pointer dalam koordinat perangkat yang dinormalisasi (-1 hingga +1)
    pointer.x = (event.clientX / rendererDomElement.clientWidth) * 2 - 1;
    pointer.y = -(event.clientY / rendererDomElement.clientHeight) * 2 + 1;

    // Update raycaster dengan kamera dan posisi pointer
    raycaster.setFromCamera(pointer, camera);

    // Hitung objek yang berpotongan dengan sinar picking
    const intersects = raycaster.intersectObjects(interactableObjects); // Hanya cek objek yang bisa di-hover

    if (intersects.length > 0) {
        const firstIntersected = intersects[0].object;

        if (hoveredObject !== firstIntersected) {
            // Keluar dari objek lama (jika ada)
            if (hoveredObject && hoveredObject.userData.isHoverable) {
                hoveredObject.material.color.set(hoveredObject.userData.originalColor);
            }

            // Masuk ke objek baru
            hoveredObject = firstIntersected;
            if (hoveredObject.userData.isHoverable) {
                hoveredObject.material.color.set(HOVER_COLOR);
            }
        }
    } else {
        // Tidak ada interseksi, pointer keluar dari semua objek
        if (hoveredObject && hoveredObject.userData.isHoverable) {
            hoveredObject.material.color.set(hoveredObject.userData.originalColor);
        }
        hoveredObject = null;
    }
}

export function initInteraction(camera, interactableObjects, renderer) {
    const rendererDomElement = renderer.domElement;
    // Tambahkan event listener ke elemen renderer (canvas)
    rendererDomElement.addEventListener('pointermove', (event) => 
        onPointerMove(event, camera, interactableObjects, rendererDomElement)
    );
}

// Fungsi untuk membersihkan state hover jika diperlukan (misalnya saat kontrol kamera berubah)
export function clearHoverState() {
    if (hoveredObject && hoveredObject.userData.isHoverable) {
        hoveredObject.material.color.set(hoveredObject.userData.originalColor);
    }
    hoveredObject = null;
}