"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

const SolarSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    const currentRef = mountRef.current;
    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster(); // Create a Raycaster
    const mouse = new THREE.Vector2(); // Create a Vector for the mouse position
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

    // add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Réglages pour les OrbitControls
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2; // Empêche la caméra de se déplacer sous le plan horizontal

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

    if (mountRef.current) {
      // Add an event listener for the mouse click
      mountRef.current.addEventListener("click", (event) => {
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);

        for (let i = 0; i < intersects.length; i++) {
          // If the planet is clicked
          if (intersects[i].object === planet) {
            console.log("Planet clicked");
            router.push("/newPage"); // Navigate to the new page
          }
        }
      });
    }

    // Text
    let textMesh: THREE.Mesh | null = null;

    // Load the font
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        // Create the text geometry
        const textGeometry = new TextGeometry("Planet Text", {
          font: font,
          size: 0.5, // size of the text
          height: 0.1, // thickness to extrude text
        });

        // Create the text material
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Create the text mesh
        textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text
        textMesh.position.x = planet.position.x;
        textMesh.position.y = planet.position.y + 2; // adjust this value to move the text up or down
        textMesh.position.z = planet.position.z;

        // Add the text to the scene
        scene.add(textMesh);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotating the Sun
      sun.rotation.y += 0.01;

      // Rotating the planet around the Sun
      angle += 0.01; // Rotation speed
      planet.position.x = Math.cos(angle) * 5; // Calculate the new x position
      planet.position.z = Math.sin(angle) * 5; // Calculate the new z position

      // Update the position of the text to follow the planet
      if (textMesh) {
        textMesh.position.x = planet.position.x;
        textMesh.position.y = planet.position.y + 2;
        textMesh.position.z = planet.position.z;
      }

      controls.update();

      renderer.render(scene, camera);
    };

    const starField = createStarField();
    scene.add(starField);

    animate();

    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SolarSystem;
