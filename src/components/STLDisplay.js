import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const STLDisplay = ({ geometries }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (geometries.length === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a floor
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Add geometries
    const material = new THREE.MeshNormalMaterial();
    geometries.forEach((geometry, index) => {
      // Calculate bounding box to center objects above the floor
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox;
      const yOffset = bbox.min.y;

      // Rotate and translate each geometry to stand on the floor
      geometry.rotateX(Math.PI / 2);
      geometry.rotateY(Math.PI);
      geometry.rotateZ(Math.PI);
      geometry.translate(0, yOffset*1, 0)

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = index * 20; // Adjust spacing as needed
      scene.add(mesh);
    });

    // Set the camera position
    camera.position.set(0, 50, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [geometries]);

  return <div ref={mountRef}></div>;
};

export default STLDisplay;
