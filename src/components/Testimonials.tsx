
import React from 'react';

const Testimonials = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-sm">
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 rounded-xl border border-purple-500/20">
        <p className="text-gray-300 italic">"Created my first meme coin in minutes! The process was incredibly smooth and the support team helped me every step of the way."</p>
        <p className="text-purple-400 mt-2 font-medium">- Alex K.</p>
      </div>
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 rounded-xl border border-purple-500/20">
        <p className="text-gray-300 italic">"I was skeptical at first, but this platform delivered exactly what was promised. My token is now trading on multiple exchanges!"</p>
        <p className="text-purple-400 mt-2 font-medium">- Sarah M.</p>
      </div>
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 rounded-xl border border-purple-500/20">
        <p className="text-gray-300 italic">"The best investment I made this year. Professional tools, great UI, and the whole process was surprisingly simple."</p>
        <p className="text-purple-400 mt-2 font-medium">- Michael R.</p>
      </div>
    </div>
  );
};

export default Testimonials;
