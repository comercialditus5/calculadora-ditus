import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0613] to-[#1c1427] text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;