import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    if (sectionId === "Home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '#');
      return;
    }

    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const navbarHeight = 120;
      const elementPosition = sectionElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);

  //     const sections = ['Home', 'Installation', 'Features'];
  //     const navbarHeight = 120;
  //     const scrollPosition = window.scrollY + navbarHeight;

  //     for (let i = sections.length - 1; i >= 0; i--) {
  //       const section = sections[i];
  //       const element = document.getElementById(section);

  //       if (element) {
  //         if (
  //           scrollPosition >= element.offsetTop &&
  //           scrollPosition < element.offsetTop + element.offsetHeight
  //         ) {
  //           setActiveSection(section);
  //           break;
  //         }
  //       }
  //     }

  //     if (window.scrollY < 100) {
  //       setActiveSection('Home');
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   const hash = window.location.hash.replace('#', '');
  //   setActiveSection(hash || 'Home');

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['Home', 'Installation', 'Features'];
      const navbarHeight = 120;
      const scrollPosition = window.scrollY + navbarHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);

        if (element) {
          if (
            scrollPosition >= element.offsetTop &&
            scrollPosition < element.offsetTop + element.offsetHeight
          ) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }

      if (window.scrollY < 100 && activeSection !== 'Home') {
        setActiveSection('Home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    const hash = window.location.hash.replace('#', '');
    setActiveSection(hash || 'Home');

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const menuItems = [
    { id: "Home", label: "Home" },
    { id: "Installation", label: "Installation" },
    { id: "Features", label: "Features" },
  ];

  return (
    <div>
      <nav className={`fixed top-0 left-0 right-0 w-[calc(100%-2rem)] m-4 z-50 transition-all duration-500 px-[7vw] lg:px-[20vw] backdrop-blur-xl rounded-2xl border-2 ${isScrolled
        ? 'bg-[#0e0e0f] border-[#2ee6f7]'
        : 'bg-[#0e0e0f]/60 border-[#2ee6f7]/60'}`}
      >
        <div className='text-white h-[10vh] flex items-center justify-between py-5 relative'>
          <div
            onClick={() => handleMenuItemClick('Home')}
            className='fixed left-[7vw] lg:left-[20vw] text-xl font-bold cursor-pointer group transition-all duration-300 hover:scale-110'
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2ee6f7] to-[#2ee6f7] blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative px-3 py-1">
                <span className='text-[#2ee6f7] drop-shadow-[0_0_8px_#2ee6f7]'> &lt;</span>
                <span className='text-white font-extrabold bg-gradient-to-r from-white to-[#2ee6f7] bg-clip-text'>VA</span>
                <span className='text-[#2ee6f7] animate-pulse'>|</span>
                <span className='text-white font-extrabold bg-gradient-to-r from-white to-[#2ee6f7] bg-clip-text'>SH</span>
                <span className='text-[#2ee6f7] drop-shadow-[0_0_8px_#2ee6f7]'>&gt;</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className='hidden md:flex space-x-8 text-gray-300 items-center ml-auto gap-6'>
            {menuItems.map((item) => (
              <li key={item.id} className="relative group">
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className="relative px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:scale-105 text-gray-300 hover:text-white"
                >
                  {item.label}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#2ee6f7] transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                </button>
              </li>
            ))}

            {/* Social Links */}
            <div className='flex space-x-4 ml-8'>
              <a href="https://github.com/harshendram/Advanced-Discord-Bot" target='_blank' rel='noopener noreferrer'
                className='group relative p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#2ee6f7]/20'>
                <FaGithub size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-[#2ee6f7] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a href="#" target='_blank' rel='noopener noreferrer'
                className='group relative p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#2ee6f7]/20'>
                <FaLinkedin size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-[#2ee6f7] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden ml-auto'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='relative p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#2ee6f7]/20'
            >
              {isOpen ? <FiX size={24} className="text-gray-300" /> : <FiMenu size={24} className="text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-4/5 transition-all duration-500 ${isOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-4 scale-95 pointer-events-none'}`}>
          <div className="bg-[#0e0e0f] backdrop-blur-xl border-2 border-[#2ee6f7]/40 rounded-2xl shadow-[0_0_30px_#2ee6f7]/40 overflow-hidden">
            <ul className="relative flex flex-col items-center space-y-2 py-6 text-gray-300">
              {menuItems.map((item, index) => (
                <li key={item.id}
                  className={`w-full text-center transition-all duration-300 hover:scale-105`}
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className="w-full py-3 px-6 rounded-xl transition-all duration-300 font-medium text-gray-300 hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Mobile Social Links */}
              <div className='flex space-x-6 mt-4 pt-4 border-t border-[#2ee6f7]/30'>
                <a href="https://github.com/harshendram/Advanced-Discord-Bot" target='_blank' rel='noopener noreferrer'
                  className='group relative p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#2ee6f7]/20'>
                  <FaGithub size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/harshendra-m-2b8bb5299/" target='_blank' rel='noopener noreferrer'
                  className='group relative p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#2ee6f7]/20'>
                  <FaLinkedin size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
