import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeIcon = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="return-home" onClick={handleClick}>
      <div className="round-image">
        <Image
          src="/DALL·E 2024-05-12 17.38.47 - A simple rocket icon.webp"
          alt="Home"
          width={50}
          height={50}
        />
      </div>
      <style jsx>{`
        .return-home {
          position: fixed;
          left: 40px;
          top: 30px;
          cursor: pointer;
          z-index: 1000;
        }
        .round-image {
          border-radius: 50%;
          overflow: hidden;
          width: 50px;
          height: 50px;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default HomeIcon;
