import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { botExpressions } from "../constants";
import ExpressionBalls from "./ExpressionBalls";

const GlowingFaviconIcon = ({ size = 120 }) => (
  <div className="mt-20 mb-8 relative flex justify-center">
    <div className="inline-block p-6 rounded-full bg-gradient-to-br from-slate-800/30 to-gray-900/20 backdrop-blur-sm border border-slate-700/30 shadow-2xl relative">
      <img
        src={botExpressions.main}
        alt="VAISH Bot Logo"
        width={size}
        height={size}
        className="drop-shadow-2xl relative z-10 rounded-full object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />

      {/* Glow Layer 1 (Stronger Glow) */}
      <div
        className="absolute inset-0 rounded-full blur-2xl animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(46, 230, 247, 0.6) 0%, transparent 70%)`,
        }}
      />
      {/* Glow Layer 2 (More Blur & Opacity) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#2ee6f7]/40 to-transparent rounded-full blur-[80px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  </div>
);

const FloatingExpressionBall = ({
  expression,
  delay = 0,
  size = 60,
  left = "10%",
  top = "20%",
  duration = 20,
}) => (
  <div
    className="absolute animate-pulse cursor-pointer group"
    style={{
      left,
      top,
      animation: `float ${duration}s ease-in-out infinite, spin ${
        duration * 2
      }s linear infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="relative">
      <img
        src={botExpressions[expression]}
        alt={`VAISH Bot ${expression}`}
        width={size}
        height={size}
        className="opacity-40 group-hover:opacity-80 rounded-full object-cover shadow-[0_0_40px_#2ee6f755] group-hover:shadow-[0_0_60px_#2ee6f7aa] transition-all duration-300 group-hover:scale-110"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {/* Glowing ring effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2ee6f7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <div
    className="group bg-gradient-to-br from-slate-800/40 to-gray-900/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-[#2ee6f7]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#2ee6f7]/20 hover:scale-[1.02]"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start gap-4">
      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <div>
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#2ee6f7] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default function DiscordBotHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: "💰",
      title: "100% Free Forever",
      description: "No monthly subscriptions, no hidden costs, completely free",
    },
    {
      icon: "🔓",
      title: "Complete Ownership",
      description: "Every line of code belongs to you, no vendor lock-in",
    },
    {
      icon: "🛡️",
      title: "Privacy First",
      description: "Your data stays on your servers, zero data mining",
    },
    {
      icon: "⚡",
      title: "Ultra-Modern Stack",
      description:
        "Built with Discord.js v14, Node.js 18+, and latest technologies",
    },
    {
      icon: "🎨",
      title: "Beautiful UI",
      description:
        "Stunning embeds with modern Discord components and animations",
    },
    {
      icon: "📈",
      title: "Enterprise Scale",
      description: "Handles servers from 10 to 100,000+ members effortlessly",
    },
    {
      icon: "🗄️",
      title: "Advanced Database",
      description: "MongoDB with intelligent caching and data persistence",
    },
    {
      icon: "🤖",
      title: "AI Superpowers",
      description: "Google Gemini integration for intelligent responses",
    },
    {
      icon: "🔧",
      title: "Developer Friendly",
      description: "Clean code, extensive documentation, easy to customize",
    },
    {
      icon: "🌐",
      title: "Cloud Ready",
      description: "Deploy anywhere - Render, Railway, Heroku, or your own VPS",
    },
  ];

  return (
    <section id="Home">
      <div
        className="relative min-h-screen"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1e1e2f, #0f0f1c)`,
        }}
      >
        {/* Expression Balls - Only on landing page */}
        <ExpressionBalls />

        {/* Hero Section */}
        <section className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24">
          {/* Reduced Floating Expression Balls for background ambiance */}
          <FloatingExpressionBall
            expression="laughing"
            delay={0}
            size={35}
            left="8%"
            top="15%"
            duration={25}
          />
          <FloatingExpressionBall
            expression="shocked"
            delay={1}
            size={40}
            left="85%"
            top="12%"
            duration={18}
          />
          <FloatingExpressionBall
            expression="lovestare"
            delay={2}
            size={38}
            left="15%"
            top="70%"
            duration={22}
          />
          <FloatingExpressionBall
            expression="angry"
            delay={3}
            size={32}
            left="82%"
            top="75%"
            duration={20}
          />
          <FloatingExpressionBall
            expression="wishinglove"
            delay={4}
            size={45}
            left="90%"
            top="40%"
            duration={30}
          />
          <FloatingExpressionBall
            expression="kissing"
            delay={5}
            size={42}
            left="10%"
            top="60%"
            duration={28}
          />

          {/* Main content */}
          <div className="text-center max-w-4xl mx-auto">
            <GlowingFaviconIcon />

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Your <span className="text-[#2ee6f7]">All-in-One</span> Discord
              Bot
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-4">
              Moderation, Fun, Utility & More — All in one powerful bot.
            </p>
            <p className="text-[#2ee6f7] text-sm md:text-base mb-8 animate-pulse">
              💡 Click on the floating VAISH expressions around the screen for
              surprises! ✨
            </p>

            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <button
                onClick={() =>
                  window.open(
                    "https://github.com/harshendram/Advanced-Discord-Bot",
                    "_blank"
                  )
                }
                className="flex items-center gap-2 px-6 py-3 bg-[#2ee6f7] text-black font-semibold rounded-lg shadow-lg hover:bg-[#1cd3e6] transition"
              >
                <FaGithub className="text-xl" />
                Invite Bot
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
              <div>
                <p className="text-3xl font-bold text-[#2ee6f7]">1M+</p>
                <p className="text-gray-400">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#e0f9fb]">10K+</p>
                <p className="text-gray-400">Servers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#2ee6f7]">99.9%</p>
                <p className="text-gray-400">Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#2ee6f7]">24/7</p>
                <p className="text-gray-400">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose VAISH Section */}
        <section className="relative z-10 px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ✨ Why Choose <span className="text-[#2ee6f7]">VAISH</span>?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                Experience the next generation of Discord bots with unmatched
                features, complete ownership, and enterprise-grade performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="inline-block p-8 bg-gradient-to-br from-slate-800/40 to-gray-900/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to transform your Discord server?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl">
                  Join thousands of servers already using VAISH to create
                  amazing community experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom animations moved to Tailwind classes */}
      </div>
    </section>
  );
}
