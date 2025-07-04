
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nativeLanguage: "",
    learningLanguages: [],
    proficiencyLevel: "",
    interests: [],
    goals: "",
    availability: []
  });

  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Korean"];
  const interests = ["Travel", "Music", "Movies", "Sports", "Technology", "Cooking", "Books", "Art"];
  const availabilities = ["Mornings", "Afternoons", "Evenings", "Weekends"];

  const handleLanguageToggle = (language) => {
    const updatedLanguages = formData.learningLanguages.includes(language)
      ? formData.learningLanguages.filter(l => l !== language)
      : [...formData.learningLanguages, language];
    
    setFormData(prev => ({ ...prev, learningLanguages: updatedLanguages }));
  };

  const handleInterestToggle = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData(prev => ({ ...prev, interests: updatedInterests }));
  };

  const handleAvailabilityToggle = (time) => {
    const updatedAvailability = formData.availability.includes(time)
      ? formData.availability.filter(t => t !== time)
      : [...formData.availability, time];
    
    setFormData(prev => ({ ...prev, availability: updatedAvailability }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    console.log("Onboarding completed:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to LingoBuddy!</h1>
            <p className="text-gray-600 mt-2">Let's set up your profile to find the perfect language partners</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Language Preferences */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <Label htmlFor="native">What's your native language?</Label>
                <select 
                  id="native"
                  className="w-full mt-2 p-2 border border-gray-200 rounded-md"
                  value={formData.nativeLanguage}
                  onChange={(e) => setFormData(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                >
                  <option value="">Select your native language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Which languages do you want to learn?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {languages.map(language => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.learningLanguages.includes(language)}
                        onCheckedChange={() => handleLanguageToggle(language)}
                      />
                      <Label htmlFor={language}>{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="level">What's your current proficiency level?</Label>
                <select 
                  id="level"
                  className="w-full mt-2 p-2 border border-gray-200 rounded-md"
                  value={formData.proficiencyLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, proficiencyLevel: e.target.value }))}
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Interests & Goals */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <Label>What are your interests?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {interests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <Label htmlFor={interest}>{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="goals">What are your language learning goals?</Label>
                <Textarea
                  id="goals"
                  placeholder="Tell us about your goals, whether it's for travel, work, studies, or personal growth..."
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 3: Availability */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <Label>When are you usually available for language exchange?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availabilities.map(time => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.availability.includes(time)}
                        onCheckedChange={() => handleAvailabilityToggle(time)}
                      />
                      <Label htmlFor={time}>{time}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">You're all set!</h3>
                <p className="text-blue-800 text-sm">
                  We'll use this information to match you with compatible language partners. 
                  You can always update your preferences later in your profile settings.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Link to="/chat" className="ml-auto">
                <Button onClick={handleComplete}>
                  Complete Setup
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
