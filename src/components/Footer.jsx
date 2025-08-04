import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaCode,
  FaHeart,
  FaRocket,
  FaLock,
  FaCoffee,
} from "react-icons/fa";
import { HiMail, HiLocationMarker, HiPhone, HiGlobe } from "react-icons/hi";
import { botExpressions } from "../constants";

const Footer = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [emailHovered, setEmailHovered] = useState(false);

  const footerSections = [
    {
      id: "product",
      title: "🚀 Product",
      links: [
        { name: "Features", href: "#Features" },
        { name: "Installation", href: "#Installation" },
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Changelog", href: "#" },
      ],
    },
    {
      id: "community",
      title: "👥 Community",
      links: [
        { name: "Discord Server", href: "#", icon: FaDiscord },
        {
          name: "GitHub",
          href: "https://github.com/harshendram/Advanced-Discord-Bot",
          icon: FaGithub,
        },
        { name: "Support Forum", href: "#" },
        { name: "Feedback", href: "#" },
        { name: "Bug Reports", href: "#" },
      ],
    },
    {
      id: "resources",
      title: "📚 Resources",
      links: [
        { name: "Tutorials", href: "#" },
        { name: "Examples", href: "#" },
        { name: "Best Practices", href: "#" },
        { name: "Video Guides", href: "#", icon: FaYoutube },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      id: "company",
      title: "🏢 Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/harshendram/Advanced-Discord-Bot",
      color: "#333",
    },
    { name: "Discord", icon: FaDiscord, href: "#", color: "#5865F2" },
    { name: "Twitter", icon: FaTwitter, href: "#", color: "#1DA1F2" },
    { name: "LinkedIn", icon: FaLinkedin, href: "#", color: "#0077B5" },
    { name: "YouTube", icon: FaYoutube, href: "#", color: "#FF0000" },
  ];

  const stats = [
    { label: "Active Servers", value: "10K+", icon: FaLock },
    { label: "Happy Users", value: "1M+", icon: FaHeart },
    { label: "Lines of Code", value: "50K+", icon: FaCode },
    { label: "Uptime", value: "99.9%", icon: FaRocket },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-slate-900 to-black border-t border-gray-800/50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5"></div>

        {/* Floating VAISH expressions in footer */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <img
              src={
                botExpressions[
                  Object.keys(botExpressions)[
                    i % (Object.keys(botExpressions).length - 1)
                  ]
                ]
              }
              alt="VAISH"
              className="w-12 h-12 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={botExpressions.main}
                  alt="VAISH Bot"
                  className="w-16 h-16 rounded-full object-cover shadow-lg ring-2 ring-cyan-400/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  &lt;<span className="text-cyan-400">VAISH</span>&gt;
                </h3>
                <p className="text-gray-400 text-sm">Advanced Discord Bot</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              The most advanced, feature-rich Discord bot that transforms your
              server into a thriving community. Built with modern technology and
              designed for the future.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div
                className={`flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 cursor-pointer ${
                  emailHovered ? "transform translate-x-2" : ""
                }`}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <HiMail className="w-5 h-5" />
                <span>support@vaishbot.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiGlobe className="w-5 h-5" />
                <span>Available Worldwide</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: social.color }}
                    ></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className={`transition-all duration-500 ${
                    hoveredSection === section.id
                      ? "transform -translate-y-2"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => {
                      const LinkIcon = link.icon;
                      return (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className={`flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 group ${
                              hoveredSection === section.id
                                ? "transform translate-x-2"
                                : ""
                            }`}
                            style={{
                              animationDelay: `${
                                (sectionIndex * 4 + linkIndex) * 0.05
                              }s`,
                            }}
                          >
                            {LinkIcon && (
                              <LinkIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            )}
                            <span className="group-hover:underline">
                              {link.name}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative group p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and</span>
                <FaCoffee className="w-4 h-4 text-amber-500" />
                <span>by the VAISH team</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 VAISH Bot. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by Discord.js v14 • Node.js • MongoDB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;
