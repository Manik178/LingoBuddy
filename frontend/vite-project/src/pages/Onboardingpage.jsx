const OnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to LingoBuddy!</h1>
      <p className="text-gray-600 mb-6">Let's get you started with your language learning journey.</p>
      <button className="btn btn-primary mb-4">Start Onboarding</button>
      <button className="btn btn-secondary">Skip for Now</button>
    </div>
  );
}
export default OnboardingPage;