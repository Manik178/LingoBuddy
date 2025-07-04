
import { Globe, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">LingoBuddy</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting language learners worldwide through meaningful conversations and cultural exchange.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Language Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Video Calls</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Progress Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">English</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spanish</a></li>
              <li><a href="#" className="hover:text-white transition-colors">French</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Japanese</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@lingobuddy.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LingoBuddy. All rights reserved. Made with ❤️ for language learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
