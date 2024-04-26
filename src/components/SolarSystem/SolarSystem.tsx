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
  // let textMesh: THREE.Mesh | null = null; // Declare textMesh with explicit type
  // let textMesh: THREE.Mesh = new THREE.Mesh();
  const textMeshRef = useRef<THREE.Mesh>();

  function createStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    const starPositions = [];
    const starsCount = 10000; // Number of stars

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
    let isMouseOverPlanet = false;
    // Create a variable to track the target position for the camera
    let cameraTarget: THREE.Vector3 | null = null;

    camera.position.z = 10;

    // Update the mouse variable when the mouse moves
    window.addEventListener(
      "mousemove",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      },
      false
    );

    // Check for intersections when the mouse is clicked
    window.addEventListener(
      "mousedown",
      (event) => {
        // Only check for intersections if the mouse is not currently over a planet
        if (!isMouseOverPlanet) return;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects([planet, mars]);

        if (intersects.length > 0) {
          // Set the camera target to the position of the first intersected object
          cameraTarget = intersects[0].object.position.clone();
        }
      },
      false
    );

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

    // Moon
    const moonTexture = textureLoader.load("textureMoon.jpg");
    const planetGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ map: moonTexture }); // Blue for the planet
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = 5; // Set the initial position of the planet
    scene.add(planet);

    let angleMoon = 0; // Angle to calculate the orbit position of the planet

    // Mars
    const marsTexture = textureLoader.load("textureMars.jpg");
    const marsGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.position.x = 8; // Set the initial position of Mars
    scene.add(mars);

    let angleMars = 0; // Angle to calculate the orbit position of Mars

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
    // let textMesh: THREE.Mesh | null = null;
    // textMesh: THREE.Mesh;

    // Load the font
    const fontLoader = new FontLoader();
    let textGeometry: TextGeometry;
    let textMaterial: THREE.MeshBasicMaterial;

    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        // Create the text geometry
        textGeometry = new TextGeometry("Planet Text", {
          font: font,
          size: 0.5, // size of the text
          height: 0.1, // thickness to extrude text
        });

        // Create the text material
        textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Create the text mesh
        // textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMeshRef.current = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text
        textMeshRef.current.position.x = planet.position.x;
        textMeshRef.current.position.y = planet.position.y + 0.5; // adjust this value to move the text up or down
        textMeshRef.current.position.z = planet.position.z;

        // Add the text to the scene
        scene.add(textMeshRef.current);
      }
    );

    const animate = () => {
      if (!isMouseOverPlanet && !cameraTarget) {
        // ... (your animation code)
        // requestAnimationFrame(animate);

        // Rotating the Sun
        sun.rotation.y += 0.01;

        // Rotating the planet around the Sun
        angleMoon += 0.01; // Rotation speed
        planet.position.x = Math.cos(angleMoon) * 5; // Calculate the new x position
        planet.position.z = Math.sin(angleMoon) * 5; // Calculate the new z position

        // Rotating Mars around the Sun
        // const textMeshRef = useRef<THREE.Mesh | null>(null);
        // textMeshRef.current = new THREE.Mesh(textGeometry, textMaterial);

        angleMars += 0.008; // Rotation speed for Mars, you can adjust this value
        mars.position.x = Math.cos(angleMars) * 8; // Calculate the new x position for Mars
        mars.position.z = Math.sin(angleMars) * 8; // Calculate the new z position for Mars

        // Update the position of the text to follow the planet
        if (textMeshRef.current) {
          textMeshRef.current.position.x = planet.position.x;
          textMeshRef.current.position.y = planet.position.y + 0.5;
          textMeshRef.current.position.z = planet.position.z;
        }

        controls.update();

        renderer.render(scene, camera);
      }
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects([planet, mars]);

      if (intersects.length > 0) {
        // Change the cursor to pointer if the mouse is over the planet or Mars
        renderer.domElement.style.cursor = "pointer";
        isMouseOverPlanet = true;
      } else {
        // Change the cursor back to default if the mouse is not over the planet or Mars
        renderer.domElement.style.cursor = "default";
        isMouseOverPlanet = false;
      }

      // If a camera target is set, move the camera towards the target
      if (cameraTarget) {
        camera.position.lerp(cameraTarget, 0.05);
        camera.lookAt(cameraTarget);

        // If the camera is close enough to the target, stop moving the camera and redirect to another page
        if (camera.position.distanceTo(cameraTarget) < 0.1) {
          cameraTarget = null;
          window.location.href = "https://www.example.com"; // Replace with your URL
        }
      }

      requestAnimationFrame(animate);
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
