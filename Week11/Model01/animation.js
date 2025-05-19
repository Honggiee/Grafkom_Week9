// hellocube-hierarchy/js/animation.js

export function startAnimationLoop(renderer, scene, camera, objectsToAnimate) {
    function animate() {
        requestAnimationFrame(animate);

        if (objectsToAnimate && objectsToAnimate.length > 0) {
            objectsToAnimate.forEach(obj => {
                if (obj && typeof obj.rotation !== 'undefined') {
                    obj.rotation.x += 0.01;
                    obj.rotation.y += 0.005;
                }
            });
        }

        renderer.render(scene, camera);
    }
    animate();
}