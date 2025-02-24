import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const textureLoader = new THREE.TextureLoader();
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("loading progressing");
};
loadingManager.onError = () => {
  console.log("loading error");
};

// THREE.NearestFilter
// THREE.NearestMipmapNearestFilter
// THREE.NearestMipmapLinearFilter
// THREE.LinearFilter
// THREE.LinearMipmapNearestFilter
// THREE.LinearMipmapLinearFilter

const texture = textureLoader.load("/textures/face.webp"); //use images of size that are power of 2 for better performance (eg: 512x512, 1024x1024)
texture.generateMipmaps = false; //if nearest filter is used, then generateMipmaps can be false to save memory
texture.minFilter = THREE.NearestFilter;
const texture2 = textureLoader.load("/textures/4.png");
texture2.generateMipmaps = false;
texture2.minFilter = THREE.NearestFilter;
const texture3 = textureLoader.load("/textures/2.avif");
// texture3.minFilter = THREE.NearestFilter;
texture3.magFilter = THREE.NearestFilter;
const texture4 = textureLoader.load("/textures/3.avif");
texture4.minFilter = THREE.NearestFilter;
const texture5 = textureLoader.load("/textures/5.webp");
texture5.minFilter = THREE.NearestFilter;
texture5.repeat.x = 2;
texture5.repeat.y = 2;
texture5.wrapS = THREE.RepeatWrapping;

texture5.minFilter = THREE.NearestFilter;
texture5.wrapT = THREE.RepeatWrapping;
texture5.offset.x = 0.5;
texture5.offset.y = 0.5;
texture5.rotation = Math.PI * 0.25;
texture5.center.x = 0.5;
texture5.center.y = 0.5;

// const image = new Image();
// image.src = "/1.webp";
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//   console.log("image loaded");
//   texture.needsUpdate = true;
// };
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

// let geometry;

// Create 700 triangles (450 values)
// const setGeometry = function (fromGui = false) {
//   const positionsArray = new Float32Array(guiObjects.count * 9);
//   for (let i = 0; i < guiObjects.count * 9; i++) {
//     positionsArray[i] = (Math.random() - 0.5) * 2;
//   }
//   const posAttributes = new THREE.BufferAttribute(positionsArray, 3);
//   geometry = new THREE.BufferGeometry();
//   geometry.setAttribute("position", posAttributes);
//   if (fromGui) {
//     mesh.geometry.dispose();
//     mesh.geometry = geometry;
//   }
// };

// setGeometry();

geometriesFolder
  .add(guiObjects, "count")
  .min(1)
  .max(300)
  .step(2)
  .onChange(() => {
    console.log(guiObjects.count);
    // setGeometry(true);
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
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ wireframe: false, map: texture })
);

const mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 500, 500),
  new THREE.MeshBasicMaterial({ wireframe: false, map: texture2 })
);

const mesh3 = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 500, 1, false),
  new THREE.MeshBasicMaterial({ wireframe: false, map: texture3 })
);

const mesh4 = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 500, 500),
  new THREE.MeshBasicMaterial({ wireframe: false, map: texture4 })
);

const mesh5 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ wireframe: false, map: texture5 })
);

mesh2.position.x = 2;
mesh3.position.x = -2;
mesh4.position.y = 2;
mesh5.position.y = -2;

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);

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
