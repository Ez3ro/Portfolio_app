// types/react-typed.d.ts or src/react-typed.d.ts

declare module 'react-typed' {
    import { FC } from 'react';
  
    interface TypedProps {
      strings: string[];
      typeSpeed?: number;
      backSpeed?: number;
      backDelay?: number;
      startDelay?: number;
      loop?: boolean;
      showCursor?: boolean;
      cursorChar?: string;
    }
  
    const Typed: FC<TypedProps>;
  
    export default Typed;
  }