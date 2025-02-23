import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas

// interface CursorPosition {
//   x: number;
//   y: number;
// }

// let cursor: CursorPosition = {
//   x: 0,
//   y: 0,
// };

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// document.addEventListener("mousemove", (event: MouseEvent) => {
//   const x = event.clientX;
//   const y = event.clientY;
//   console.log("Mouse X:", x, "Mouse Y:", y);
//   cursor.x = x / sizes.width - 0.5;
//   cursor.y = -(y / sizes.height - 0.5);
// });

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
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(mesh.position);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate

// const loop = () => {
//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
//   camera.position.y = cursor.y * 4;
//   camera.lookAt(mesh.position);
// };
// console.log(loop);

const tick = () => {
  // below is the alternate for controls
  // loop();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
