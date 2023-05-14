import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function setupScene() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    console.log(document.body);

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 50, -100 );
    camera.lookAt( 0, 0, 0 );

    const scene = new THREE.Scene();
    const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
    scene.add( light );

    return {
        renderer,
        camera,
        scene
    }
}

export function loadPlayerModel(scene, modelPath, playerModel) {
    const loader = new GLTFLoader();

    loader.load(modelPath, function ( gltf ) {
        let model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(0.05, 0.05, 0.05);
        scene.add( model );
        playerModel.push(model);
        playerModel.push(gltf);
    }, 	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}, function ( error ) {
        console.error( error );
    } );

    console.log('xd');
}