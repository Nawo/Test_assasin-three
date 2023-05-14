import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { config } from './player-config';
import { setupScene, loadPlayerModel } from './setup';
import Stats from 'stats.js';

const { renderer, camera, scene } = setupScene();
const controls = new OrbitControls( camera, renderer.domElement );

let playerModel = [];
loadPlayerModel(scene, '/assassins_walk.glb', playerModel);

const { speed } = config;

const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotateX(1.57);
plane.scale.set(50, 50, 50);
scene.add( plane );

controls.update();

let right = false;
let left = false;
let up = false;
let down = false;

let keys = [];

function keyPressedTrue(e) {
    keys[e.key] = true;
}

let mixer;

window.addEventListener("keydown", keyPressedTrue);
window.addEventListener("keyup", (e) => {
    delete keys[e.key];

    mixer = new THREE.AnimationMixer( playerModel[1].scene );
    const clips = playerModel[1].animations;
    const clip = THREE.AnimationClip.findByName( clips, 'Armature|Armature|mixamo.com|Layer0' );
    const action = mixer.clipAction( clip );
    action.play();
});

const clock = new THREE.Clock();
const stats = new Stats()
stats.showPanel(0);
document.body.appendChild(stats.dom)

function animate() {

    stats.begin();
	requestAnimationFrame( animate );

    if(mixer) {
        mixer.update(clock.getDelta());
    }

	controls.update();

	renderer.render( scene, camera );

    if (keys['a'] && playerModel) {
        playerModel[0].position.x = playerModel[0].position.x + speed;
        playerModel[0].rotation.y = 1.57;
    }

    if (keys['d'] && playerModel) {
        playerModel[0].position.x = playerModel[0].position.x - speed;
        playerModel[0].rotation.y = -1.57;
    }

    if (keys['w'] && playerModel) {
        playerModel[0].position.z = playerModel[0].position.z + speed;
        playerModel[0].rotation.y = 0;
    }

    if (keys['s'] && playerModel) {
        playerModel[0].position.z = playerModel[0].position.z - speed;
        playerModel[0].rotation.y = 3.14;
    }

    console.log(playerModel);
    stats.end()
}
animate();