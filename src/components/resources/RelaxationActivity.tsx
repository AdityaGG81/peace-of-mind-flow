import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Waves, Leaf, Cloud, Sun, Moon, Smile } from "lucide-react";

interface RelaxationActivityProps {
  onClose: () => void;
}

const natureSounds = [
  {
    id: "rain",
    label: "Rain",
    icon: Cloud,
    description: "Gentle rainfall on leaves",
    url: "/audio/light-rain.mp3",
  },
  {
    id: "ocean",
    label: "Ocean",
    icon: Waves,
    description: "Calming ocean waves",
	url: "/audio/ocean-waves.mp3"
  },
  {
    id: "forest",
    label: "Forest",
    icon: Leaf,
    description: "Birds and rustling leaves",
	url: "/audio/forest-birds.mp3"
  },
  {
    id: "sunrise",
    label: "Dawn",
    icon: Sun,
    description: "Morning nature sounds",
	url: "/audio/early-morning.mp3"
  },
];

const colorTherapyColors = [
  { color: "bg-blue-500", name: "Calm Blue", emotion: "Peace and tranquility" },
  {
    color: "bg-green-500",
    name: "Nature Green",
    emotion: "Balance and growth",
  },
  {
    color: "bg-purple-500",
    name: "Wisdom Purple",
    emotion: "Spirituality and creativity",
  },
  {
    color: "bg-orange-400",
    name: "Warm Orange",
    emotion: "Joy and enthusiasm",
  },
  { color: "bg-pink-400", name: "Gentle Pink", emotion: "Love and compassion" },
  {
    color: "bg-yellow-400",
    name: "Happy Yellow",
    emotion: "Optimism and clarity",
  },
];

const affirmations = [
  "I am calm and at peace with myself",
  "I choose to release stress and embrace serenity",
  "My mind is clear and focused",
  "I am worthy of love and happiness",
  "I trust in my ability to handle challenges",
  "I am grateful for this moment of peace",
  "I breathe in calmness and breathe out tension",
  "I am in control of my thoughts and emotions",
  "Each breath brings me deeper relaxation",
  "I am safe, I am loved, I am enough",
];

export const RelaxationActivity = ({ onClose }: RelaxationActivityProps) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "exhale">(
    "inhale"
  );

  // Affirmation rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Color therapy rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorTherapyColors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Stop audio when component unmounts or when audio changes
useEffect(() => {
  return () => {
    audio?.pause();
  };
}, [audio]);


  const handleSoundToggle = (soundId: string, url: string) => {
    // Stop if clicking the same sound again
    if (activeSound === soundId) {
      audio?.pause();
      setActiveSound(null);
      return;
    }

    // Stop any currently playing sound
    audio?.pause();

    // Create new audio element
    const newAudio = new Audio(url);
    newAudio.loop = true; // so the sound keeps playing
    newAudio.play();

    setAudio(newAudio);
    setActiveSound(soundId);
  };

  const currentColor = colorTherapyColors[colorIndex];

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-elevated">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Smile className="h-6 w-6 text-accent-foreground" />
          </div>
          <CardTitle>Relaxation Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sounds" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sounds">Nature</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
              <TabsTrigger value="breathing">Breathing</TabsTrigger>
            </TabsList>

            {/* Nature Sounds */}
            <TabsContent value="sounds" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Nature Sound Therapy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click on a sound to create your peaceful environment
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {natureSounds.map((sound) => {
                  const Icon = sound.icon;
                  const isActive = activeSound === sound.id;
                  return (
                    <Card
                      key={sound.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "ring-2 ring-primary bg-primary/5 scale-105"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleSoundToggle(sound.id, sound.url)}
                    >
                      <CardContent className="p-4 text-center space-y-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">{sound.label}</h4>
                        <p className="text-xs text-muted-foreground">
                          {sound.description}
                        </p>
                        {isActive && (
                          <div className="text-xs text-primary font-medium animate-pulse">
                            Playing...
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Color Therapy */}
            <TabsContent value="colors" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Color Therapy</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on the colors and let them influence your mood
                </p>
              </div>

              <div className="text-center space-y-4">
                <div
                  className={`w-32 h-32 rounded-full mx-auto transition-all duration-1000 ${currentColor.color} animate-pulse`}
                />

                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">{currentColor.name}</h4>
                  <p className="text-muted-foreground">
                    {currentColor.emotion}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                  {colorTherapyColors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-full ${
                        color.color
                      } cursor-pointer transition-transform hover:scale-110 ${
                        index === colorIndex
                          ? "ring-2 ring-primary scale-110"
                          : ""
                      }`}
                      onClick={() => setColorIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Positive Affirmations */}
            <TabsContent value="affirmations" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Positive Affirmations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Repeat these affirmations to yourself, silently or out loud
                </p>
              </div>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8 text-center">
                  <div className="animate-fade-in">
                    <p className="text-xl font-medium leading-relaxed">
                      "{affirmations[currentAffirmation]}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center space-x-2">
                <Button
                  onClick={() =>
                    setCurrentAffirmation(
                      (prev) =>
                        (prev - 1 + affirmations.length) % affirmations.length
                    )
                  }
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentAffirmation(
                      (prev) => (prev + 1) % affirmations.length
                    )
                  }
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            {/* Visual Breathing */}
            <TabsContent value="breathing" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Visual Breathing Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Follow the circle with your breath
                </p>
              </div>

              <div className="flex justify-center items-center h-64">
                <div
                  className={`w-40 h-40 rounded-full bg-gradient-primary transition-all duration-4000 ease-in-out flex items-center justify-center ${
                    breathingPhase === "inhale" ? "scale-110" : "scale-75"
                  }`}
                >
                  <div className="text-white font-semibold text-lg">
                    {breathingPhase === "inhale" ? "Breathe In" : "Breathe Out"}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  {breathingPhase === "inhale"
                    ? "Slowly fill your lungs with air"
                    : "Gently release the air from your lungs"}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Close Button */}
          <div className="text-center pt-6">
            <Button onClick={onClose} variant="ghost">
              Close Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
