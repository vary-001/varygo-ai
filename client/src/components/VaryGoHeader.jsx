import React from 'react';
// Assuming 'varygo-chameleon.png' is your chameleon image asset
import chameleonImage from '../assets/frog.png'; 

function VaryGoHeader() {
  return (
    <div className="absolute top-4 left-4 flex items-center space-x-4">
      {/* <img src={chameleonImage} alt="VaryGo Chameleon" className="h-16 w-auto" /> */}
      <h1 className="font-heading text-6xl text-varygo-gold tracking-wider drop-shadow-lg">VARYGO</h1>
    </div>
  );
}

export default VaryGoHeader;