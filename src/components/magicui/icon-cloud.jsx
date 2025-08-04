import React, { useEffect, useRef, useState } from "react";

export function IconCloud({ iconSlugs = [], images = [] }) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use images if provided, otherwise generate from slugs
  const allImages = React.useMemo(() => {
    if (images && images.length > 0) return images;
    if (iconSlugs && iconSlugs.length > 0) {
      return iconSlugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}.svg`
      );
    }
    return [];
  }, [images, iconSlugs]);

  // Auto-rotation animation
  useEffect(() => {
    if (!mounted) return;

    const animate = () => {
      if (!isHovering) {
        setRotation((prev) => ({
          x: prev.x + 0.3,
          y: prev.y + 0.5,
        }));
      } else {
        // Mouse-influenced rotation when hovering
        const mouseInfluence = 0.1;
        setRotation((prev) => ({
          x: prev.x + 0.1 + (mousePosition.y - 0.5) * mouseInfluence,
          y: prev.y + 0.15 + (mousePosition.x - 0.5) * mouseInfluence,
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, isHovering, mousePosition]);

  // Handle mouse movement for interactive rotation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // Generate sphere positions for 3D effect
  const spherePositions = React.useMemo(() => {
    const positions = [];
    const radius = 180; // Bigger radius
    const count = Math.min(allImages.length, 32); // More icons

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push({ x, y, z, index: i });
    }

    return positions;
  }, [allImages.length]);

  if (!mounted || allImages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="text-gray-400">Loading tech stack...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 flex items-center justify-center"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovering ? "transform 0.3s ease-out" : "none",
        }}
      >
        {spherePositions.map((pos, index) => {
          const image = allImages[pos.index];
          if (!image) return null;

          return (
            <div
              key={pos.index}
              className="absolute w-12 h-12 flex items-center justify-center hover:scale-150 cursor-pointer group transition-all duration-500"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, ${
                  pos.z
                }px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                transformOrigin: "center",
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={image}
                alt={`Technology ${pos.index + 1}`}
                className="w-full h-full object-contain transition-all duration-500 group-hover:drop-shadow-2xl group-hover:brightness-125"
                onError={(e) => {
                  console.warn(`Failed to load image: ${image}`);
                  e.target.style.display = "none";
                }}
                onLoad={(e) => {
                  // Ensure the image is visible once loaded
                  e.target.style.opacity = "1";
                }}
                style={{
                  opacity: "0.9",
                  filter: "drop-shadow(0 4px 12px rgba(46, 230, 247, 0.3))",
                }}
              />

              {/* Animated glow effect on hover */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse scale-0 group-hover:scale-150 blur-md"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IconCloud;
