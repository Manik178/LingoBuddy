
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      country: "Spain",
      language: "Learning English",
      rating: 5,
      text: "LingoBuddy helped me improve my English so much! The native speakers are patient and friendly. I've made real friends here."
    },
    {
      name: "Takeshi Yamamoto",
      country: "Japan",
      language: "Learning French",
      rating: 5,
      text: "The video chat feature is amazing. I can practice pronunciation with native French speakers and they help correct my mistakes."
    },
    {
      name: "Sophie Laurent",
      country: "France",
      language: "Learning Spanish",
      rating: 5,
      text: "What I love most is the cultural exchange. I'm not just learning Spanish, I'm learning about different cultures too!"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied language learners from around the world
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.country}</p>
                <p className="text-sm text-blue-600">{testimonial.language}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
