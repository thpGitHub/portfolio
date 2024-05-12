"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { useRouter } from "next/navigation";

const SolarSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const textMeshRef = useRef<THREE.Mesh>();
  const textMeshMarsRef = useRef<THREE.Mesh | null>(null);
  const textMeshJupiterRef = useRef<THREE.Mesh | null>(null);
  const textMeshWelcomeRef = useRef<THREE.Mesh | null>(null);


  function createStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    const starPositions = [];
    const starsCount = 10000; // Number of stars

    for (let i = 0; i < starsCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
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
    const raycaster = new THREE.Raycaster();
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
    const sunTexture = textureLoader.load("textureEarth.jpg");
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

    // Jupiter
    const jupiterTexture = textureLoader.load("textureJupiter.jpg");
    const jupiterGeometry = new THREE.SphereGeometry(0.7, 32, 32); // taille de la planète
    const jupiterMaterial = new THREE.MeshBasicMaterial({
      map: jupiterTexture,
    });
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiter.position.x = 12; // position initiale de Jupiter
    scene.add(jupiter);

    let angleJupiter = 0;

    if (mountRef.current) {
      // Add an event listener for the mouse click
      mountRef.current.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        for (let i = 0; i < intersects.length; i++) {
          if (intersects[i].object === planet) {
            router.push("/contact");
          } else if (intersects[i].object === mars) {
            router.push("/career");
          } else if (intersects[i].object === jupiter) {
            router.push("/portfolio");
          }
        }
      });
    }

    Text;
    let textMesh: THREE.Mesh | null = null;
    textMesh: THREE.Mesh;

    // Load the font
    const fontLoader = new FontLoader();
    let textGeometry: TextGeometry;
    let textGeometryMars: TextGeometry;
    let textGeometryJupiter: TextGeometry;
    let textMaterial: THREE.MeshBasicMaterial;
    let textGeometryWelcome: TextGeometry;
    

    fontLoader.load(
      // "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      "fonts/Star_Jedi_Regular.json",
      function (font) {
        textGeometry = new TextGeometry("Contact", {
          font: font,
          size: 0.2,
          height: 0.01,
        });

        textGeometryMars = new TextGeometry("Parcours", {
          font: font,
          size: 0.2,
          height: 0.01,
        });

        textGeometryJupiter = new TextGeometry("Portfolio", {
          font: font,
          size: 0.2,
          height: 0.01,
        });

        textGeometryWelcome = new TextGeometry("Bienvenue sur mon Portfolio", {
          font: font,
          size: 0.5,
          height: 0.001,
        });

        // Create the text material
        textMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });

        // Create the text mesh
        textMeshRef.current = new THREE.Mesh(textGeometry, textMaterial);

        textMeshMarsRef.current = new THREE.Mesh(
          textGeometryMars,
          textMaterial
        );
        textMeshJupiterRef.current = new THREE.Mesh(
          textGeometryJupiter,
          textMaterial
        );
        textMeshWelcomeRef.current = new THREE.Mesh(
          textGeometryWelcome,
          textMaterial
        );

        // Position the text
        textMeshRef.current.position.x = planet.position.x;
        textMeshRef.current.position.y = planet.position.y + 0.5; // adjust this value to move the text up or down
        textMeshRef.current.position.z = planet.position.z;

        // Add the text to the scene
        scene.add(textMeshRef.current);
        scene.add(textMeshMarsRef.current);
        scene.add(textMeshJupiterRef.current);
        scene.add(textMeshWelcomeRef.current);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const animate = () => {
      if (!isMouseOverPlanet) {
        sun.rotation.y += 0.01;
        planet.rotation.y += 0.02;
        mars.rotation.y += 0.03;
        jupiter.rotation.y += 0.04;
        
        // Rotating the planet around the Sun
        angleMoon += 0.01; // Rotation speed
        planet.position.x = Math.cos(angleMoon) * 5; // Calculate the new x position
        planet.position.z = Math.sin(angleMoon) * 5; // Calculate the new z position

        // Rotating Mars around the Sun
        angleMars += 0.008; // Rotation speed for Mars
        mars.position.x = Math.cos(angleMars) * 8;
        mars.position.z = Math.sin(angleMars) * 8;

        angleJupiter += 0.006;
        jupiter.position.x = Math.cos(angleJupiter) * 12;
        jupiter.position.z = Math.sin(angleJupiter) * 12;

        // position of the text to follow the planet
        if (textMeshRef.current) {
          textMeshRef.current.position.x = planet.position.x;
          textMeshRef.current.position.y = planet.position.y + 0.5;
          textMeshRef.current.position.z = planet.position.z;
        }

        if (textMeshMarsRef.current) {
          textMeshMarsRef.current.position.x = mars.position.x;
          textMeshMarsRef.current.position.y = mars.position.y + 0.7;
          textMeshMarsRef.current.position.z = mars.position.z;
        }

        if (textMeshJupiterRef.current) {
          textMeshJupiterRef.current.position.x = jupiter.position.x;
          textMeshJupiterRef.current.position.y = jupiter.position.y + 0.9;
          textMeshJupiterRef.current.position.z = jupiter.position.z;
        }

        if (textMeshWelcomeRef.current) {
          textMeshWelcomeRef.current.position.x = - 5.9;
          textMeshWelcomeRef.current.position.y = 4;
          textMeshWelcomeRef.current.position.z = 0;
        }

        controls.update();

        renderer.render(scene, camera);
      }

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects([planet, mars, jupiter]);

      if (intersects.length > 0) {
        // Change the cursor to pointer if the mouse is over the planet or Mars
        renderer.domElement.style.cursor = "pointer";
        isMouseOverPlanet = true;
      } else {
        // Change the cursor back to default if the mouse is not over the planet or Mars
        renderer.domElement.style.cursor = "default";
        isMouseOverPlanet = false;
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
