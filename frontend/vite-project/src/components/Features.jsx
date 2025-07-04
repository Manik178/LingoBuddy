
import { MessageSquare, Video, BookOpen, Trophy, Clock, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Practice writing and reading with instant messaging in your target language."
    },
    {
      icon: Video,
      title: "Video Calls",
      description: "Face-to-face conversations with native speakers to improve pronunciation and fluency."
    },
    {
      icon: BookOpen,
      title: "Language Exchange",
      description: "Teach your native language while learning theirs - a perfect mutual learning experience."
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports and achievements."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 availability and flexible conversation scheduling."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Verified profiles and community guidelines ensure a safe and respectful learning space."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose LingoBuddy?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the features that make language learning engaging, effective, and enjoyable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
