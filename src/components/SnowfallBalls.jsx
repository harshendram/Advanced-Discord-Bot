import React, { useState, useEffect, useRef, useCallback } from "react";
import { botExpressions } from "../constants";

const ExpressionBalls = () => {
  const [positions, setPositions] = useState([]);
  const [ballPhysics, setBallPhysics] = useState([]);
  const animationRef = useRef();
  const containerRef = useRef();

  const expressions = Object.keys(botExpressions).filter(
    (key) => key !== "main"
  );

  // Initialize snowfall balls
  useEffect(() => {
    const ballCount = Math.min(expressions.length, 12); // Limit balls for performance
    const initialPositions = [];
    const initialPhysics = [];

    for (let i = 0; i < ballCount; i++) {
      initialPositions.push({
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 200, // Start above viewport
        id: i,
        expression: expressions[i % expressions.length],
      });

      initialPhysics.push({
        velocityY: 0.5 + Math.random() * 1, // Very slow falling speed
        velocityX: -0.5 + Math.random() * 1, // Slight horizontal drift
        size: 25 + Math.random() * 15, // Smaller size
        opacity: 0.3 + Math.random() * 0.4, // Semi-transparent
        rotation: 0,
        rotationSpeed: -2 + Math.random() * 4,
      });
    }

    setPositions(initialPositions);
    setBallPhysics(initialPhysics);
  }, [expressions]);

  // Smooth animation loop
  const animate = useCallback(() => {
    setPositions((prevPositions) =>
      prevPositions.map((pos, index) => {
        const physics = ballPhysics[index];
        if (!physics) return pos;

        let newX = pos.x + physics.velocityX;
        let newY = pos.y + physics.velocityY;

        // Reset position when ball falls below screen
        if (newY > window.innerHeight + 100) {
          newY = -50 - Math.random() * 200;
          newX = Math.random() * window.innerWidth;
        }

        // Wrap horizontally if needed
        if (newX < -50) newX = window.innerWidth + 50;
        if (newX > window.innerWidth + 50) newX = -50;

        return {
          ...pos,
          x: newX,
          y: newY,
        };
      })
    );

    // Update rotation
    setBallPhysics((prevPhysics) =>
      prevPhysics.map((physics) => ({
        ...physics,
        rotation: physics.rotation + physics.rotationSpeed,
      }))
    );

    animationRef.current = requestAnimationFrame(animate);
  }, [ballPhysics]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => ({
          ...pos,
          x: Math.min(pos.x, window.innerWidth),
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {positions.map((pos, index) => {
        const physics = ballPhysics[index];
        if (!physics) return null;

        return (
          <div
            key={pos.id}
            className="absolute transition-opacity duration-1000"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${physics.size}px`,
              height: `${physics.size}px`,
              opacity: physics.opacity,
              transform: `rotate(${physics.rotation}deg)`,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <img
              src={botExpressions[pos.expression]}
              alt={`Expression ${pos.expression}`}
              className="w-full h-full object-cover rounded-full filter drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(46, 230, 247, 0.3))",
              }}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExpressionBalls;
