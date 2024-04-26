"use client";
import React from "react";
import "./style.css"; // Assurez-vous de créer ce fichier CSS
import Image from "next/image";

const ContactPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Ici, vous pouvez ajouter le code pour gérer la soumission du formulaire
    console.log("Le formulaire a été soumis");
  };

  return (
    <div className="contact-container">
      <div className="form-container">
        <h1>Contactez-moi</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Envoyer</button>
        </form>
      </div>
      <div className="image-container">
        <Image
          src="/DALL·E 2024-04-26 17.55.21 - An astronaut in full space suit sitting at a desk inside a space station, using a modern computer with lines of code visible on the screen. The astron.webp"
          alt="Description de l'image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ContactPage;
