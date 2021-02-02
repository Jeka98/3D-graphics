const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xEEEEEE, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;


// Plane
const planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });

const plane = new THREE.Mesh( planeGeometry, planeMaterial );

plane.rotation.x =- 0.5 * Math.PI;

plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

plane.receiveShadow = true;

scene.add( plane );


// Box
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

const box = new THREE.Mesh( boxGeometry, boxMaterial );

box.position.x = 20;
box.position.y = 10;
box.position.z = 0;

box.castShadow = true;

scene.add( box );

// SpotLight
const spotLight = new THREE.SpotLight( 0xffffff, 1 );
spotLight.position.set( 100, 60, 20 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 500;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
spotLight.shadow.focus = 1;

scene.add( spotLight );




camera.position.x = 80;
camera.position.y = 20;
camera.position.z = -30;
camera.lookAt(scene.position);




// Helpers
const axesHelper = new THREE.AxesHelper( 25 );
scene.add( axesHelper );

const cameraShadowHelper = new THREE.CameraHelper( spotLight.shadow.camera );
scene.add( cameraShadowHelper );

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

const cameraHelper = new THREE.CameraHelper( camera );
scene.add( cameraHelper );

document.body.appendChild( renderer.domElement );
renderer.render( scene, camera );
