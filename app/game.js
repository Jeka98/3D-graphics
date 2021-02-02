const init = () => {
	let step = 0;

	const initStats = () => {
		const stats = new Stats();
	
		stats.setMode(0);
	
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
	
		document.body.appendChild(stats.domElement);
	
		return stats;
	}

	const stats = initStats();

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 80;
	camera.position.y = 30;
	camera.position.z = -30;
	camera.lookAt(scene.position);
	scene.add( camera );
	
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xEEEEEE, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;

	document.body.appendChild( renderer.domElement );
	
	
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
	

	const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

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
	
		
	
	const loadHelpers = () => {
		const axesHelper = new THREE.AxesHelper( 25 );
		scene.add( axesHelper );
		
		const cameraShadowHelper = new THREE.CameraHelper( spotLight.shadow.camera );
		scene.add( cameraShadowHelper );
		
		const spotLightHelper = new THREE.SpotLightHelper( spotLight );
		scene.add( spotLightHelper );
		
		const cameraHelper = new THREE.CameraHelper( camera );
		scene.add( cameraHelper );
	}
	
	const renderScene = () => {
		stats.update();

		box.rotation.x += 0.02;
		box.rotation.y += 0.02;
		box.rotation.z += 0.02;

		step += 0.04;

		box.position.x = 20 + (10 * (Math.cos(step)));
		box.position.y = 2 +(15 * Math.abs(Math.sin(step)));

		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	}

	loadHelpers();
	renderScene();
} 

window.addEventListener('load', () => {
	init();
});
