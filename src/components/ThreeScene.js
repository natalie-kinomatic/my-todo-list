import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const ThreeScene = ({ geometry }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);

    // Add OrbitControls for better debugging
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    currentRef.appendChild(renderer.domElement);
    camera.position.set(0, 50, 150);

    // Set the background color of the scene
    scene.background = new THREE.Color(0xb2f2bb); // Scene background color

    // Add a floor
    const floorGeometry = new THREE.PlaneGeometry(500, 500);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x81c784, side: THREE.DoubleSide }); // Floor color
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2; // Rotate the floor to be horizontal
    floor.position.y = -50; // Position the floor under the object
    scene.add(floor);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (geometry && sceneRef.current) {
      const scene = sceneRef.current;

      // Remove previous objects if any
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Add the floor again
      const floorGeometry = new THREE.PlaneGeometry(500, 500);
      const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x81c784, side: THREE.DoubleSide }); // Floor color
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = Math.PI / 2; // Rotate the floor to be horizontal
      floor.position.y = -50; // Position the floor under the object
      scene.add(floor);

      // Center the geometry
      geometry.center();

      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0;
      scene.add(mesh);
    }
  }, [geometry]);

  return <div ref={mountRef} style={{ width: '100%', height: '80vh' }} />;
};

export default ThreeScene;


