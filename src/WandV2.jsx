import React, { useEffect } from "react";
import "./wand.css";

const images = [
  {
    url:
      "https://assets.codepen.io/1468070/mousepad-tile-1.png?format=auto&quality=80",
  },
  {
    url:
      "https://assets.codepen.io/1468070/mousepad-tile-4.png?format=auto&quality=80",
  },
  {
    url:
      "https://assets.codepen.io/1468070/mousepad-tile-3.png?format=auto&quality=80",
  },
];

const Wand = () => {
  useEffect(() => {
    const wand = document.getElementById("wand");
    const tiles = document.querySelectorAll(".tile");
    const starsContainer = document.getElementById("stars-container");

    const xy = (x, y) => ({ x, y });
    const px = (value) => `${value}px`;
    const deg = (value) => `${value}deg`;
    const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

    const updateMouse = (mouseX, mouseY) => {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

      const mouse = {
        position: xy(mouseX, mouseY),
        decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
        multiplier: xy(1.3, 0.4),
        offset: xy(windowWidth * -0.15, windowHeight * 0.1),
        modifiedPosition: xy(0, 0),
      };

      mouse.modifiedPosition.x =
        mouse.position.x * mouse.multiplier.x + mouse.offset.x;
      mouse.modifiedPosition.y =
        mouse.position.y * mouse.multiplier.y + mouse.offset.y;

      return mouse;
    };

    const revealImages = (mouseX) => {
      for (const tile of tiles) {
        const dimensions = tile.getBoundingClientRect(),
          relativeMouseX = mouseX - dimensions.left,
          mouseXAsDecimal = clamp(
            relativeMouseX / dimensions.width,
            0,
            1
          );

        const opacity = mouseXAsDecimal,
          blur = 1 - mouseXAsDecimal;

        tile.style.setProperty("--opacity", opacity);
        tile.style.setProperty("--blur", blur);
      }
    };

    const getWandStyles = (mouse) => ({
      left: px(mouse.modifiedPosition.x),
      top: px(mouse.modifiedPosition.y),
      rotate: deg(mouse.decimal.x * 20 - 10),
    });

    const handleMouseMove = (e) => {
      const mouse = updateMouse(e.clientX, e.clientY);
      const wandStyles = getWandStyles(mouse);

      wand.animate(wandStyles, { duration: 400, fill: "forwards" });
      revealImages(mouse.modifiedPosition.x);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return ( 
  <>
      <div id="wand">
        <div className="cap"></div>
        <span className="magic-star">
          <svg viewBox="0 0 512 512">
            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
          </svg>
        </span>
      </div>

      <div id="tiles">
        {images.map((image, index) => (
          <MagicTile key={index} src={image.url} />
        ))}
      </div>

      <div id="stars-container">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
    </>
  )
 };

function MagicTile({ src }) {
  return (
    <>
      <div className="tile">
        <i className="fa-solid fa-image"></i>
        <img src={src} alt="" />
      </div>
    </>
  );
}

export default Wand;
