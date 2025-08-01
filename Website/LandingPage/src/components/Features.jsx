import React, { useState } from 'react';
import { Zap, Shield, Rocket, Users, Globe, Brain } from 'lucide-react';

const FeaturesComponent = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: Brain,
      title: "🤖 Advanced AI Assistant (Google Gemini Pro)",
      description: "Powerful AI integration for intelligent server management and user interactions.",
      subfeatures: [
        "Intelligent Q&A - Ask anything and get smart, context-aware responses",
        "Rate Limiting - Built-in protection against spam and abuse",
        "Error Recovery - Graceful handling of API limits and failures",
        "Conversation Memory - Maintains context for better interactions",
        "Multi-Language - Supports questions and responses in multiple languages"
      ],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      icon: Zap,
      title: "💎 Advanced Points & Rewards",
      description: "Complete economy system with comprehensive reward mechanisms.",
      subfeatures: [
        "Daily Rewards - Claim daily points with streak bonuses",
        "Point Economy - Trade points between users with transaction history",
        "Leaderboards - Server-wide rankings with seasonal resets",
        "Achievement System - Unlock rewards for various activities",
        "Customizable - Admins can adjust point rates and rewards"
      ],
      gradient: "from-cyan-400 to-purple-500"
    },
    {
      id: 3,
      icon: Users,
      title: "📊 Professional XP & Leveling",
      description: "Advanced progression system with detailed analytics and rewards.",
      subfeatures: [
        "Multi-Activity Tracking - Messages, voice time, reactions, and more",
        "Dynamic Role Rewards - Automatic role assignment based on levels",
        "Progress Visualization - Beautiful progress bars and level-up animations",
        "Statistics Dashboard - Detailed analytics for users and admins",
        "Seasonal Events - Special XP bonuses during holidays and events"
      ],
      gradient: "from-cyan-400 to-green-500"
    },
    {
      id: 4,
      icon: Shield,
      title: "🎫 Enterprise Ticket System",
      description: "Professional support management with comprehensive workflow tools.",
      subfeatures: [
        "Smart Ticketing - Professional support ticket management",
        "Category Organization - Multiple ticket types with custom workflows",
        "Team Collaboration - Assign tickets to staff members",
        "Ticket Analytics - Response times, resolution rates, satisfaction scores",
        "Auto-Archiving - Intelligent cleanup of resolved tickets"
      ],
      gradient: "from-cyan-400 to-orange-500"
    },
    {
      id: 5,
      icon: Globe,
      title: "🛡️ Intelligent Moderation",
      description: "AI-powered moderation tools for comprehensive server protection.",
      subfeatures: [
        "AI-Powered Anti-Raid - Detects and stops raids automatically",
        "Smart Filters - Content filtering with context awareness",
        "Bulk Operations - Mass ban, kick, and message cleanup tools",
        "Audit Logging - Comprehensive logs of all moderation actions",
        "Appeal System - Built-in appeal process for banned users"
      ],
      gradient: "from-cyan-400 to-pink-500"
    },
    {
      id: 6,
      icon: Rocket,
      title: "🎮 Interactive Entertainment",
      description: "Engaging games and activities to keep your community active.",
      subfeatures: [
        "Modern Games - 8ball, dice, truth-or-dare with beautiful interfaces",
        "Polls & Surveys - Interactive polls with real-time results",
        "Meme Integration - Fresh memes from multiple sources",
        "Custom Commands - Server-specific commands and responses",
        "Event System - Automated events and celebrations"
      ],
      gradient: "from-cyan-400 to-teal-500"
    }
  ];

  return (
    <section id="Features">
      <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text">
                🎯 Core Features
              </h2>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful capabilities that make our Discord bot the ultimate solution for community management and engagement
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`relative group cursor-pointer transition-all duration-500 transform ${hoveredFeature === feature.id ? 'scale-105' : 'hover:scale-102'
                    }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Card Background */}
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-700/50 overflow-hidden min-h-[400px]">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div className="mb-6">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                            <IconComponent
                              size={28}
                              className="text-cyan-400 group-hover:text-white transition-colors duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-4">
                        {feature.description}
                      </p>

                      {/* Subfeatures */}
                      <ul className="space-y-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.subfeatures.map((subfeature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-cyan-400 mr-2 mt-1 text-xs">•</span>
                            <span>{subfeature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Animated Underline */}
                      <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-12 transition-all duration-500 ease-out"></div>
                    </div>

                    {/* Floating Particles Effect */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-200"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComponent;