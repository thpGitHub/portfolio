"use client";
import React from "react";
// import { calsans } from "@/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../../components//ui/tracing-beam";
import HomeIcon from "@/components/HomeIcon/HomeIcon";

export default function TracingBeamDemo() {
  const BackgroundImageUrl =
    "/vaisseau-spatial-orbite-autour-comete-bleue-brillante-dans-galaxie-sombre-generee-par-ia.jpg";
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
        width: "100%",
      }}
    >
      <HomeIcon />
      <TracingBeam className="px-6 bg-black bg-opacity-50">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative pb-[500px] text-white">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <div className="flex">
                {item.badge.map((badge, badgeIndex) => (
                  <h2
                    key={`badge-${badgeIndex}`}
                    className={`${getBadgeColor(
                      badge
                    )} text-white rounded-full text-sm w-fit px-4 py-1 mb-4 mr-2`}
                  >
                    {badge}
                  </h2>
                ))}
              </div>

              {/* <p className={twMerge(calsans.className, "text-xl mb-4")}> */}
              <p className="text-3xl mb-4">{item.title}</p>

              <div className="text-sm  prose prose-sm dark:prose-invert">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}

const dummyContent = [
  {
    title: "Site e-commerce de vente de produits de beauté",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
          fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
          nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
          occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
          officia sint labore. Tempor consectetur excepteur ut fugiat veniam
          commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    badge: ["React", "Laravel"],
    image:
      "/DALL·E 2024-05-08 10.59.26 - An illustration of an e-commerce website.webp",
  },
  {
    title: "Application de navigation GPS en temps réel",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    badge: ["Next.js", "Node.js"],
    image:
      "/DALL·E 2024-05-08 11.01.10 - An illustration of a GPS application.webp",
  },
  {
    title: "Clone de l'application de streaming Netflix",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    badge: ["Vue.js", "Express.js"],
    image:
      "/DALL·E 2024-05-08 11.02.08 - An illustration of a Netflix clone.webp",
  },
  {
    title: "Application de paiement sans contact",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    badge: ["Python", "Django"],
    image:
      "/DALL·E 2024-05-08 19.50.18 - An illustration of a contactless payment application.webp",
  },
];

function getBadgeColor(badge: string) {
  switch (badge) {
    case "Next.js":
      return "bg-red-500";
    case "Node.js":
      return "bg-green-500";
    case "React":
      return "bg-blue-500";
    case "Laravel":
      return "bg-yellow-500";
    case "Vue.js":
      return "bg-green-500";
    case "Express.js":
      return "bg-gray-500";
    case "Python":
      return "bg-blue-500";
    case "Django":
      return "bg-green-500";
    default:
      return "bg-black";
  }
}
