"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";
import HomeIcon from "@/components/HomeIcon/HomeIcon";
import './style.css';

const content = [
  {
    title: "Paris Ynov Campus",
    year: "2023-2025",
    description:
      "M1/M2 – Expert en Développement Web – TitreRNCP niveau 7 : Expert informatique et systèmes d'information Paris. M1/M2 – Expert en Développement Web – TitreRNCP niveau 7 : Expert informatique et systèmes d'information Paris.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        2023-2025
      </div>
    ),
  },
  {
    title: "Webitech",
    year: "2020-2021",
    description:
      "Bachelor – Développeur Web – Temps plein Titre RNCP niveau 6 : Concepteur Développeur d’Applications Paris. Bachelor – Développeur Web – Temps plein Titre RNCP niveau 6 : Concepteur Développeur d’Applications Paris.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--yellow-500),var(--emerald-500))] flex items-center justify-center text-white">
        2020-2021
      </div>
    ),
  },
  {
    title: "Coding Factory By ITESCIA",
    year: "2018-2019",
    description:
      "Bac+2 – Codeur Informatique – Temps plein Titre RNCP niveau 5 : Analyste développeur d’applications informatiques Paris. Bac+2 – Codeur Informatique – Temps plein Titre RNCP niveau 5 : Analyste développeur d’applications informatiques Paris.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        2018-2019
      </div>
    ),
  },
  {
    title: "Working before reconversion",
    year: "2016-2018",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        2021
      </div>
    ),
  },
];
export default function Career() {
  const yourImageUrl =
    "fictif-fond-espace-vol-comete-vers-planete-fictive.jpg";
  return (
    // <div className="bg-black h-screen">
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${yourImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <HomeIcon />
      <h1 className="text-4xl font-bold text-center text-white pt-10">
        Career
      </h1>
      <div className="pt-20 px-40 opacity-80" >
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
