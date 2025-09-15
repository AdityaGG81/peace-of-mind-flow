import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Heart } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalCycles] = useState(8);

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  const phaseInstructions = {
    inhale: 'Breathe in slowly through your nose',
    hold: 'Hold your breath gently',
    exhale: 'Exhale slowly through your mouth'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return phaseDurations.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return phaseDurations.exhale;
            } else {
              setPhase('inhale');
              setCycle(c => c + 1);
              return phaseDurations.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  useEffect(() => {
    if (cycle >= totalCycles) {
      setIsActive(false);
      setCycle(0);
    }
  }, [cycle, totalCycles]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(phaseDurations.inhale);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(phaseDurations.inhale);
    setCycle(0);
  };

  const getCircleScale = () => {
    const progress = (phaseDurations[phase] - timer) / phaseDurations[phase];
    
    if (phase === 'inhale') {
      return 0.5 + (progress * 0.5); // Scale from 0.5 to 1
    } else if (phase === 'exhale') {
      return 1 - (progress * 0.5); // Scale from 1 to 0.5
    }
    return 1; // Hold phase stays at full scale
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale': return 'bg-primary';
      case 'hold': return 'bg-accent';
      case 'exhale': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle>4-4-6 Breathing Exercise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Breathing Circle */}
          <div className="flex justify-center items-center h-48">
            <div 
              className={`w-32 h-32 rounded-full ${getCircleColor()} transition-all duration-1000 ease-in-out flex items-center justify-center`}
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className="text-white font-bold text-xl">
                {timer}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold capitalize">{phase}</h3>
            <p className="text-muted-foreground">{phaseInstructions[phase]}</p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Cycle {cycle} of {totalCycles}</span>
              <span>{Math.round((cycle / totalCycles) * 100)}%</span>
            </div>
            <Progress value={(cycle / totalCycles) * 100} className="h-2" />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isActive ? (
              <Button onClick={handleStart} size="lg" className="px-8">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={() => setIsActive(false)} size="lg" variant="secondary" className="px-8">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleReset} size="lg" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button onClick={onClose} variant="ghost">
              Close Exercise
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};