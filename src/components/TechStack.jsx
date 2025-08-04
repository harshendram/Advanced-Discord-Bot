import React from "react";
import { IconCloud } from "./magicui/icon-cloud";

const TechStack = () => {
  // Tech stack slugs for simple icons
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}.svg`
  );

  return (
    <section
      id="TechStack"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,230,247,0.1)_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-cyan-400/10 backdrop-blur-sm rounded-full border border-cyan-400/20 mb-8">
            <span className="text-cyan-400 text-sm font-medium px-4 py-2">
              ⚡ POWERED BY INNOVATION
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Built with cutting-edge technologies that ensure scalability,
            performance, and the ultimate Discord experience. Our modern stack
            delivers blazing-fast functionality while maintaining rock-solid
            reliability.
          </p>
        </div>

        {/* Tech Stack Cloud */}
        <div className="relative flex size-full items-center justify-center min-h-[500px] md:min-h-[600px]">
          <IconCloud images={images} />
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/30">
            <div className="text-3xl mb-4 text-cyan-400">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-400">
              Built for speed and efficiency with modern frameworks
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/30">
            <div className="text-3xl mb-4 text-cyan-400">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-400">
              Enterprise-grade security with 99.9% uptime guarantee
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/30">
            <div className="text-3xl mb-4 text-cyan-400">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Scalable</h3>
            <p className="text-gray-400">
              Designed to grow with your community seamlessly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
