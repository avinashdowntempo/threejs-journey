import * as THREE from "three";
import gsap from "gsap";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Sizes
const sizes: { width: number; height: number } = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// const loop=()=>{
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, y: 2 });
gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });
gsap.to(mesh.position, { duration: 1, delay: 4, y: 0 });
// }

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
// const clock = new THREE.Clock()

const tick = () => {
  // loop();
  // const elapsedTime = clock.getElapsedTime()

  // // Update objects
  // mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
