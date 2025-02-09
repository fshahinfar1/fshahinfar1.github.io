import * as THREE from './three.module.js'
// import { GLTFLoader } from './GLTFLoader.js';

function show3DScene() {
  const base = document.getElementById('3dDiv');
  const width = 640;
  const height = 480;
  const ratio = width / height;
  // Setup the scene, camera and rederer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(255, 255, 255)")
  const camera = new THREE.PerspectiveCamera( 45, ratio, 1, 500 );
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  base.appendChild( renderer.domElement );
  // Place objects
  // Light
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.x = 2;
  directionalLight.position.y = 2;
  directionalLight.position.z = 5;
  scene.add( directionalLight );
  // 3D cube
  const geometry = new THREE.BoxGeometry();
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const material = new THREE.MeshStandardMaterial( { color: 0x9000ff } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  // Line
  // const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  // const points = [];
  // points.push( new THREE.Vector3( - 10, 0, 0 ) );
  // points.push( new THREE.Vector3( 0, 10, 0 ) );
  // points.push( new THREE.Vector3( 10, 0, 0 ) );
  // const geometry = new THREE.BufferGeometry().setFromPoints( points );
  // const line = new THREE.Line( geometry, material );
  // scene.add( line );
  // Object
  // const loader = new GLTFLoader();
  // const objPath = 'path/to/model.glb'; 
  // loader.load(objPath, function ( gltf ) {
  //   scene.add( gltf.scene );
  // }, undefined, function ( error ) {
  //   console.error( error );
  // });


  // Render the scene
  function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  animate();
}

window.addEventListener('load', () => {
  const elem = document.getElementById('easterEgg');
  if (elem.offsetParent !== null) {
    console.log('Easter Egg Planted :)');
    elem.addEventListener('click', show3DScene);
  } else {
    console.log('No easter Egg on small screens');
  }
});
