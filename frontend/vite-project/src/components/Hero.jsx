
import { Button } from "@/components/ui/button";
import { Globe, Users, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <Globe className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">LingoBuddy</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect. Learn. 
            <span className="text-blue-600 block">Speak Fluently.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of language learners worldwide. Practice with native speakers, 
            make friends, and achieve fluency through real conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Start Learning Today
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50">
              How It Works
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>50,000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span>100+ Languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>190+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
