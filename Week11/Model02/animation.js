// hellocube-textured-phong/js/animation.js
import * as THREE from 'three'; // Diperlukan jika menggunakan THREE.Clock atau Vector3

export function startAnimationLoop(renderer, scene, camera, controls, objectsToAnimate) {
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const deltaTime = clock.getDelta(); // Waktu sejak frame terakhir

        // Update OrbitControls
        controls.update();

        // Animasi objek
        if (objectsToAnimate && objectsToAnimate.length > 0) {
            objectsToAnimate.forEach(objData => {
                let obj;
                let selfRotation = null;

                // Cek apakah objData adalah objek langsung atau objek dengan konfigurasi
                if (objData.mesh && objData.selfRotation) {
                    obj = objData.mesh;
                    selfRotation = objData.selfRotation;
                } else {
                    obj = objData; // Asumsi objek Three.js langsung
                }

                if (obj && obj.isObject3D) { // Pastikan itu adalah objek 3D
                    // Rotasi utama (misalnya untuk parentContainer)
                    if (!selfRotation && obj.name === "parentContainer") {
                        obj.rotation.x += 0.005;
                        obj.rotation.y += 0.002;
                    }
                    // Rotasi diri sendiri jika dikonfigurasi
                    if (selfRotation) {
                        obj.rotation.x += selfRotation.x;
                        obj.rotation.y += selfRotation.y;
                        obj.rotation.z += selfRotation.z;
                    }
                }
            });
        }

        renderer.render(scene, camera);
    }
    animate();
}