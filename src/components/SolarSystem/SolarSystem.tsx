"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SolarSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  function createStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    const starPositions = [];
    const starsCount = 1000; // Number of stars

    for (let i = 0; i < starsCount; i++) {
      const x = (Math.random() - 0.5) * 2000; // Extent of stars on the X axis
      const y = (Math.random() - 0.5) * 2000; // Extent of stars on the Y axis
      const z = (Math.random() - 0.5) * 2000; // Extent of stars on the Z axis
      starPositions.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    const starField = new THREE.Points(starsGeometry, starsMaterial);

    return starField;
  }

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("textureEarth.jpg"); // Sun
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planet
    const planetGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue for the planet
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = 5; // Set the initial position of the planet
    scene.add(planet);

    let angle = 0; // Angle to calculate the orbit position of the planet

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotating the Sun
      sun.rotation.y += 0.01;

      // Rotating the planet around the Sun
      angle += 0.01; // Rotation speed
      planet.position.x = Math.cos(angle) * 5; // Calculate the new x position
      planet.position.z = Math.sin(angle) * 5; // Calculate the new z position

      renderer.render(scene, camera);
    };

    const starField = createStarField();
    scene.add(starField);

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SolarSystem;
