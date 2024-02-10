"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var FBXLoader_1 = require("three/examples/jsm/loaders/FBXLoader");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
var light = new THREE.PointLight(0xffffff, 50);
light.position.set(0.8, 1.4, 1.0);
scene.add(light);
var ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);
//const material = new THREE.MeshNormalMaterial()
var fbxLoader = new FBXLoader_1.FBXLoader();
fbxLoader.load("../assets/model.fbx", function (object) {
    // object.traverse(function (child) {
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    scene.add(object);
}, function (error) {
    console.log(error);
});
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
var stats = new stats_module_1.default();
document.body.appendChild(stats.dom);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();
}
function render() {
    renderer.render(scene, camera);
}
animate();
