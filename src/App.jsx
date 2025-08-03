
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Installation from './components/Installation';
import Features from './components/Features';
import SliderCard from './components/Tests';

const App = () => {

  return (

    <div>
      <Navbar />
      <About />
      <Installation />
      <Features />
      <SliderCard />
    </div>
  )
}

export default App;