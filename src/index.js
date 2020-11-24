import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTrail, animated } from "react-spring";
import useSound from "use-sound";
import pong from "./pong-pop.wav";
import "./styles.css";

const items = ["⮞", "➤"];
const config = { mass: 5, tension: 2000, friction: 200 };

function App() {
  const [state, setState] = useState(false);
  const [play] = useSound(pong);
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: 20 },
    to: { opacity: state ? 1 : 0, y: state ? 20 : 10 }
  });
  return (
    <div
      className="trails-div"
      onMouseEnter={() => setState((state) => !state)}
      onMouseLeave={() => setState((state) => !state)}
    >
      <span
        className="arrow"
        role="img"
        area-label="next"
        onMouseEnter={() => {
          play();
        }}
      >
        Read More 🢚
      </span>
      {trail.map(({ y, ...otherProps }, i) => (
        <animated.div
          key={items[i]}
          style={{
            ...otherProps,
            transform: y.interpolate((y) => `translate3d(${y}px, 0, 0)`)
          }}
          className="trails-text"
        >
          <animated.div>{items[i]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
