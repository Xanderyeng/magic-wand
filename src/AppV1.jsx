import React, { useEffect } from "react";
import "./App.css";

const StarAnimation = () => {
  const animateStar = (star) => {
    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  };

  useEffect(() => {
    const stars = document.getElementsByClassName("magic-star");
    let index = 0;
    const interval = 1000;

    for (const star of stars) {
      setTimeout(() => {
        animateStar(star);

        setInterval(() => animateStar(star), 2400);
      }, index++ * (interval / 3));
    }
  }, []);

  return (
    <>
      <h1>
        Mo ergastee f&#246;rn&#44;&nbsp;
        <span className='magic'>
          <Star />
          <Star />
          <Star />
          <Star />
          <div className='magic-text'>mo ergalone f&#246;rn nort&#46;</div>
        </span>
      </h1>
          <div id='wand'>
            <div className='cap'></div>
          </div>
    </>
  );
};

const App = () => {
  return (
    <div className='App'>
      <StarAnimation />
    </div>
  );
};

export default App;

function MagicStars() {
  return (
    <>
      <Star />
    </>
  );
}

function Star() {
  return (
    <>
      <span class='magic-star'>
        <svg viewBox='0 0 512 512'>
          <path d='M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z' />
        </svg>
      </span>
    </>
  );
}
