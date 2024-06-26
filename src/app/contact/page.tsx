"use client";
import React, { useState } from "react";
import "./style.css";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Highlight } from "@/components/ui/hero-highlight";
import HomeIcon from "@/components/HomeIcon/HomeIcon";
import { Button } from "@/components/ui/moving-border";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Le formulaire a été soumis");
  };

  return (
    <>
      <HomeIcon />
      <div className="contact-container">
        <Highlight className="dark:text-white">
          <h1>Contactez-moi</h1>
        </Highlight>
        <div className="contact-content-container">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>

              {/* <button type="submit">Envoyer</button> */}
              <Button
                borderRadius="1.75rem"
                className="bg-transparent dark:bg-slate-900 text-white dark:text-black border-neutral-200 dark:border-slate-800"
              >
                Envoyer
              </Button>
            </form>
          </div>
          <div className="contact-image-container">
            <Image
              src="/DALL·E 2024-04-26 17.55.21 - An astronaut in full space suit sitting at a desk inside a space station, using a modern computer with lines of code visible on the screen. The astron.webp"
              alt="Description de l'image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <BackgroundBeams />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
