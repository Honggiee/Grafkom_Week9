// hellocube-camera-orbit/js/animation.js
export function startAnimationLoop(renderer, scene, camera, controls) {
    function animate() {
        requestAnimationFrame(animate);

        if (controls) {
            controls.update();
        }

        renderer.render(scene, camera);
    }
    animate();
}