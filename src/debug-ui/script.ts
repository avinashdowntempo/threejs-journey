import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const gui = new GUI({
  width: 500,
  title: "Debug UI",
  closeFolders: true,
});
gui.close();

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});
const colorsFolder = gui.addFolder("Colors");
// colorsFolder.close();
const geometriesFolder = gui.addFolder("Geometries");
// geometriesFolder.close();
const animationsFolder = gui.addFolder("Animations");
// animationsFolder.close();
const guiObjects = {
  count: 700,
  color: "#ff0000",
};

// Sizes
const sizes: { width: number; height: number } = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let geometry;

// Create 700 triangles (450 values)
const setGeometry = function (fromGui = false) {
  const positionsArray = new Float32Array(guiObjects.count * 9);
  for (let i = 0; i < guiObjects.count * 9; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 2;
  }
  const posAttributes = new THREE.BufferAttribute(positionsArray, 3);
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", posAttributes);
  if (fromGui) {
    mesh.geometry.dispose();
    mesh.geometry = geometry;
  }
};

setGeometry();

geometriesFolder
  .add(guiObjects, "count")
  .min(1)
  .max(300)
  .step(2)
  .onChange(() => {
    console.log(guiObjects.count);
    setGeometry(true);
  });

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
  new THREE.MeshBasicMaterial({ color: guiObjects.color, wireframe: false })
);
scene.add(mesh);

geometriesFolder.add(mesh.material, "wireframe");
colorsFolder.addColor(guiObjects, "color").onChange(() => {
  mesh.material.color.set(guiObjects.color);
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
animationsFolder.add(camera.position, "z").min(0).max(10).step(0.01);
camera.lookAt(mesh.position);

const controls = new OrbitControls(camera, canvas);

controls.autoRotate = true;
controls.enableDamping = true;
animationsFolder.add(controls, "autoRotate");
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
