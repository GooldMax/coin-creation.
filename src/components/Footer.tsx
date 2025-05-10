
import React from 'react';
import { Twitter, Github, MessagesSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-gradient mb-4">CoinCreator</h2>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional-grade tools for creating and launching meme coins on the Solana blockchain.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <MessagesSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-purple-900/20 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CoinCreator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
