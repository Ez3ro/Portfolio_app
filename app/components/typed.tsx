import React from 'react';
import ReactTyped from 'react-typed';

interface TypedProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
}

const Typed: React.FC<TypedProps> = ({ strings, typeSpeed = 50, backSpeed = 50, backDelay = 1000, startDelay = 500, loop = true }) => {
  return (
    <ReactTyped
      strings={strings}
      typeSpeed={typeSpeed}
      backSpeed={backSpeed}
      backDelay={backDelay}
      startDelay={startDelay}
      loop={loop}
    />
  );
};

export default Typed;