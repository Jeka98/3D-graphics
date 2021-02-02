const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xEEEEEE, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


// Plane
const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });

const plane = new THREE.Mesh( planeGeometry, planeMaterial );

plane.rotation.x =- 0.5 * Math.PI;

plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add( plane );


// Box
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

const box = new THREE.Mesh( boxGeometry, boxMaterial );

box.position.x = -10;
box.position.y = 5;
box.position.z = 0;

scene.add( box );


camera.position.x = 50;
camera.position.y = 20;
camera.position.z = -30;
camera.lookAt(scene.position);


document.body.appendChild( renderer.domElement );
renderer.render( scene, camera );
