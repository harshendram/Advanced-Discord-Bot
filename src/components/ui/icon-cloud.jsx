import { useEffect, useMemo, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    freezeActive: false,
    fadeIn: 3000,
    radiusX: 1.2,
    radiusY: 1.2,
    radiusZ: 1.2,
  },
};

export const renderCustomIcon = (icon, theme) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

export function IconCloud({
  iconSlugs = [],
  images = [],
  className,
  ...props
}) {
  const [data, setData] = useState(null);
  const [theme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract slugs from images if provided
  const slugsFromImages = useMemo(() => {
    try {
      if (images && images.length > 0) {
        return images
          .map((url) => {
            // Extract slug from simple icons URL pattern
            const match = url.match(/cdn\.simpleicons\.org\/([^\/]+)/);
            return match ? match[1] : null;
          })
          .filter(Boolean);
      }
      return iconSlugs || [];
    } catch (err) {
      console.error("Error processing slugs:", err);
      setError(err);
      return [];
    }
  }, [images, iconSlugs]);

  useEffect(() => {
    if (slugsFromImages.length > 0) {
      setLoading(true);
      setError(null);

      fetchSimpleIcons({ slugs: slugsFromImages })
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching icons:", err);
          setError(err);
          setLoading(false);
        });
    }
  }, [slugsFromImages]);

  const renderedIcons = useMemo(() => {
    try {
      if (!data || loading || error) return null;

      return Object.values(data.simpleIcons).map((icon) =>
        renderCustomIcon(icon, theme)
      );
    } catch (err) {
      console.error("Error rendering icons:", err);
      setError(err);
      return null;
    }
  }, [data, theme, loading, error]);

  // Error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center p-8 ${className || ""}`}
        {...props}
      >
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">⚠️</div>
          <p>Failed to load tech stack icons</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center p-8 ${className || ""}`}
        {...props}
      >
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
          <p>Loading tech stack...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !renderedIcons || renderedIcons.length === 0) {
    return (
      <div
        className={`flex items-center justify-center p-8 ${className || ""}`}
        {...props}
      >
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">📦</div>
          <p>No tech stack data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <Cloud {...cloudProps}>{renderedIcons}</Cloud>
    </div>
  );
}

export default IconCloud;
