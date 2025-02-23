import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Sizes
const sizes: { width: number; height: number } = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Create 700 triangles (450 values)
const count = 700;
const positionsArray = new Float32Array(count * 9);
for (let i = 0; i < count * 9; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 2;
}

const posAttributes = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", posAttributes);

// handle fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
// handle resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});
// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(mesh.position);

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.enableDamping = true;

scene.add(camera);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
