// hellocube-shadows/js/animation.js
export function startAnimationLoop(renderer, scene, camera, controls, objectsToAnimate) {
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Hanya update controls

        // Tidak ada animasi objek default di sini
        // if (objectsToAnimate && objectsToAnimate.length > 0) { ... }

        renderer.render(scene, camera);
    }
    animate();
}