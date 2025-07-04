
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, User } from "lucide-react";
import { Link } from "react-router";

const Call = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setIsCallActive(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Call Ended</h1>
          <p className="text-gray-300 mb-6">Call duration: {formatTime(callDuration)}</p>
          <Link to="/chat">
            <Button>
              Back to Chat
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Call Header */}
      <div className="p-4 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Maria Rodriguez</h1>
            <p className="text-green-400 text-sm">Connected</p>
          </div>
        </div>
        <p className="text-gray-300">{formatTime(callDuration)}</p>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          {/* Main Video */}
          <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center animate-fade-in">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <User className="w-20 h-20 text-white mx-auto mb-4" />
                  <p className="text-white text-lg">Maria Rodriguez</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Video is off</p>
              </div>
            )}
          </div>

          {/* Picture-in-Picture (Your video) */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            ) : (
              <VideoOff className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="rounded-full w-14 h-14"
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="rounded-full w-16 h-16"
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-14 h-14"
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {isMuted && "Microphone is muted"} 
            {!isVideoOn && "Camera is off"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Call;
