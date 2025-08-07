import React, { useState, useEffect, useRef } from "react";
import { featureImages } from "../constants";
import { X, ExternalLink } from "lucide-react";

const FeaturesGallery = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isHovered, setIsHovered] = useState({ row1: false, row2: false });
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const galleryFeatures = [
    {
      id: 1,
      title: "Birthday Celebrations",
      image: featureImages.birthday,
      description:
        "Automated birthday tracking and celebration system with personalized greetings.",
      details:
        "Our Birthday system automatically tracks member birthdays with timezone support, sends personalized messages, provides special rewards, and creates server-wide celebrations. Members get exclusive birthday points and achievements while the community comes together to celebrate.",
      highlights: [
        "Timezone Support",
        "Automated Wishes",
        "Special Rewards",
        "Community Events",
      ],
    },
    {
      id: 2,
      title: "Daily Points System",
      image: featureImages.points,
      description:
        "Comprehensive economy system with daily rewards and streak bonuses.",
      details:
        "Engage daily to earn points with our sophisticated economy system. Features include streak bonuses, work jobs, leaderboard competitions, secure point transfers, and anti-inflation mechanisms to maintain economic balance.",
      highlights: [
        "Daily Streaks",
        "Work Jobs",
        "Leaderboards",
        "Point Trading",
      ],
    },
    {
      id: 3,
      title: "Feedback System",
      image: featureImages.feedback,
      description:
        "Advanced feedback collection and suggestion management system.",
      details:
        "Collect valuable feedback from your community with our comprehensive system. Features include anonymous submissions, voting mechanisms, admin review panels, automatic categorization, and progress tracking for implemented suggestions.",
      highlights: [
        "Anonymous Feedback",
        "Voting System",
        "Admin Panel",
        "Progress Tracking",
      ],
    },
    {
      id: 4,
      title: "Leaderboard Rankings",
      image: featureImages.leaderboard,
      description:
        "Dynamic leaderboard system with multiple categories and seasonal resets.",
      details:
        "Competitive rankings across multiple categories including XP, points, voice time, and activity. Features seasonal resets, role rewards, detailed statistics, and customizable ranking algorithms to keep competition fresh and fair.",
      highlights: [
        "Multi-Category",
        "Seasonal Resets",
        "Role Rewards",
        "Statistics",
      ],
    },
    {
      id: 5,
      title: "Performance Dashboard",
      image: featureImages.dashboard,
      description:
        "Comprehensive analytics and insights for server administrators.",
      details:
        "Get detailed insights into your server's performance with our advanced dashboard. Track member activity, growth metrics, engagement patterns, popular features, and generate comprehensive reports for data-driven decisions.",
      highlights: [
        "Activity Analytics",
        "Growth Metrics",
        "Engagement Insights",
        "Custom Reports",
      ],
    },
    {
      id: 6,
      title: "Shop System",
      image: featureImages.shop,
      description:
        "Virtual economy with purchasable items, roles, and exclusive content.",
      details:
        "Create a thriving virtual economy with our shop system. Sell roles, exclusive content, custom perks, and virtual items. Features include dynamic pricing, limited-time offers, purchase history, and secure transaction logging.",
      highlights: [
        "Virtual Items",
        "Role Shop",
        "Dynamic Pricing",
        "Transaction History",
      ],
    },
    {
      id: 7,
      title: "Reminder System",
      image: featureImages.reminder,
      description:
        "Smart reminder system with timezone support and recurring options.",
      details:
        "Never miss important events with our intelligent reminder system. Features include timezone detection, recurring reminders, custom messages, snooze options, and integration with calendar events for comprehensive scheduling.",
      highlights: [
        "Timezone Support",
        "Recurring Reminders",
        "Custom Messages",
        "Calendar Integration",
      ],
    },
    {
      id: 8,
      title: "Meme Generator",
      image: featureImages.memes,
      description: "AI-powered meme generation and sharing system.",
      details:
        "Generate and share memes with our AI-powered system. Features include template library, custom text overlay, automatic generation, trending memes, user submissions, and moderation tools for community-appropriate content.",
      highlights: [
        "AI Generation",
        "Template Library",
        "Custom Text",
        "Moderation Tools",
      ],
    },
  ];

  // Split features into two rows
  const row1Features = galleryFeatures.slice(0, 4);
  const row2Features = galleryFeatures.slice(4, 8);

  useEffect(() => {
    const animateRow = (ref, direction, isPaused) => {
      if (!ref.current || isPaused) return;

      const scrollWidth = ref.current.scrollWidth;
      const oneThirdWidth = scrollWidth / 3; // Since we triple content

      const currentScroll = ref.current.scrollLeft;
      const speed = 1.5; // Smooth scrolling speed

      if (direction === "right") {
        if (currentScroll >= oneThirdWidth) {
          // Reset to beginning for seamless loop
          ref.current.scrollLeft = 0;
        } else {
          ref.current.scrollLeft += speed;
        }
      } else {
        if (currentScroll <= 0) {
          // Reset to one-third for seamless loop
          ref.current.scrollLeft = oneThirdWidth;
        } else {
          ref.current.scrollLeft -= speed;
        }
      }
    };

    const interval = setInterval(() => {
      animateRow(row1Ref, "right", isHovered.row1);
      animateRow(row2Ref, "left", isHovered.row2);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isHovered]);

  const FeatureCard = ({ feature, onHover, onLeave }) => (
    <div
      className="flex-shrink-0 w-80 h-48 relative group cursor-pointer mx-4"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => setSelectedFeature(feature)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            console.error(`Failed to load image: ${feature.image}`);
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* Fallback when image fails to load */}
        <div className="hidden w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm">{feature.title}</p>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );

  const Modal = ({ feature, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-300 text-lg">{feature.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Detailed Overview
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {feature.details}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">
              Key Highlights
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {feature.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/30"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 flex items-center space-x-2">
              <span>Learn More</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="Features"
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Features Gallery
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Explore our comprehensive feature set through this interactive gallery
        </p>
      </div>

      {/* Row 1 - Scrolling Right */}
      <div className="mb-8">
        <div
          ref={row1Ref}
          className="flex overflow-x-hidden scrollbar-hide"
          onMouseEnter={() => setIsHovered((prev) => ({ ...prev, row1: true }))}
          onMouseLeave={() =>
            setIsHovered((prev) => ({ ...prev, row1: false }))
          }
        >
          {/* Triple the content for ultra-smooth infinite scrolling */}
          {[...row1Features, ...row1Features, ...row1Features].map(
            (feature, index) => (
              <FeatureCard
                key={`row1-${feature.id}-${index}`}
                feature={feature}
                onHover={() =>
                  setIsHovered((prev) => ({ ...prev, row1: true }))
                }
                onLeave={() =>
                  setIsHovered((prev) => ({ ...prev, row1: false }))
                }
              />
            )
          )}
        </div>
      </div>

      {/* Row 2 - Scrolling Left */}
      <div>
        <div
          ref={row2Ref}
          className="flex overflow-x-hidden scrollbar-hide"
          onMouseEnter={() => setIsHovered((prev) => ({ ...prev, row2: true }))}
          onMouseLeave={() =>
            setIsHovered((prev) => ({ ...prev, row2: false }))
          }
        >
          {/* Triple the content for ultra-smooth infinite scrolling */}
          {[...row2Features, ...row2Features, ...row2Features].map(
            (feature, index) => (
              <FeatureCard
                key={`row2-${feature.id}-${index}`}
                feature={feature}
                onHover={() =>
                  setIsHovered((prev) => ({ ...prev, row2: true }))
                }
                onLeave={() =>
                  setIsHovered((prev) => ({ ...prev, row2: false }))
                }
              />
            )
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedFeature && (
        <Modal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </section>
  );
};

export default FeaturesGallery;
