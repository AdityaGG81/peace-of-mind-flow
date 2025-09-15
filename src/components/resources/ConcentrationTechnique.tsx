import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Brain, CheckCircle } from 'lucide-react';

interface ConcentrationTechniqueProps {
  onClose: () => void;
}

const techniques = [
  {
    title: "5-4-3-2-1 Grounding Technique",
    description: "Use your senses to anchor yourself in the present moment",
    steps: [
      {
        instruction: "Look around and name 5 things you can see",
        detail: "Notice colors, shapes, textures. Take your time to really observe each item.",
        completed: false
      },
      {
        instruction: "Identify 4 things you can touch",
        detail: "Feel the texture of your clothes, the temperature of the air, the surface you're sitting on.",
        completed: false
      },
      {
        instruction: "Listen for 3 sounds around you",
        detail: "Maybe it's traffic, air conditioning, birds, or your own breathing.",
        completed: false
      },
      {
        instruction: "Notice 2 things you can smell",
        detail: "This might be coffee, fresh air, perfume, or just the general scent of your environment.",
        completed: false
      },
      {
        instruction: "Find 1 thing you can taste",
        detail: "Maybe it's toothpaste, gum, coffee, or just the neutral taste in your mouth.",
        completed: false
      }
    ]
  },
  {
    title: "Box Breathing Focus",
    description: "Combine breathing with counting to improve concentration",
    steps: [
      {
        instruction: "Sit comfortably with your back straight",
        detail: "Find a quiet spot where you won't be disturbed. Close your eyes or soften your gaze.",
        completed: false
      },
      {
        instruction: "Breathe in for 4 counts",
        detail: "Inhale slowly and steadily through your nose, counting 1-2-3-4.",
        completed: false
      },
      {
        instruction: "Hold your breath for 4 counts",
        detail: "Keep the air in your lungs comfortably, don't strain. Count 1-2-3-4.",
        completed: false
      },
      {
        instruction: "Exhale for 4 counts",
        detail: "Breathe out slowly through your mouth, counting 1-2-3-4.",
        completed: false
      },
      {
        instruction: "Hold empty for 4 counts, then repeat",
        detail: "Keep your lungs empty for 4 counts, then start the cycle again. Do this 5-10 times.",
        completed: false
      }
    ]
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Release tension while building body awareness",
    steps: [
      {
        instruction: "Start with your toes",
        detail: "Tense your toes for 5 seconds, then release. Notice the contrast between tension and relaxation.",
        completed: false
      },
      {
        instruction: "Move to your calves",
        detail: "Tighten your calf muscles, hold for 5 seconds, then let go completely.",
        completed: false
      },
      {
        instruction: "Tense your thighs",
        detail: "Contract your thigh muscles, hold the tension, then release and feel the relaxation.",
        completed: false
      },
      {
        instruction: "Focus on your hands and arms",
        detail: "Make fists and tense your arms, hold for 5 seconds, then let your arms go limp.",
        completed: false
      },
      {
        instruction: "Tense your shoulders and neck",
        detail: "Scrunch your shoulders up to your ears, hold, then let them drop down naturally.",
        completed: false
      },
      {
        instruction: "Finally, your face",
        detail: "Scrunch up your face muscles, hold for 5 seconds, then let your face completely relax.",
        completed: false
      }
    ]
  }
];

export const ConcentrationTechnique = ({ onClose }: ConcentrationTechniqueProps) => {
  const [currentTechnique, setCurrentTechnique] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  const technique = techniques[currentTechnique];
  const step = technique.steps[currentStep];
  const progress = ((currentStep + 1) / technique.steps.length) * 100;

  const handleStepComplete = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);

    if (currentStep < technique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < technique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleTechniqueChange = (index: number) => {
    setCurrentTechnique(index);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const isStepCompleted = completedSteps[currentStep];
  const allStepsCompleted = completedSteps.length === technique.steps.length && 
                           completedSteps.every(completed => completed);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-elevated">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-secondary-foreground" />
          </div>
          <CardTitle>Concentration Techniques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Technique Selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {techniques.map((tech, index) => (
              <Button
                key={index}
                variant={currentTechnique === index ? "default" : "outline"}
                size="sm"
                onClick={() => handleTechniqueChange(index)}
                className="text-xs"
              >
                {tech.title}
              </Button>
            ))}
          </div>

          {/* Current Technique */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">{technique.title}</h3>
            <p className="text-muted-foreground">{technique.description}</p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {technique.steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <Card className={`border-2 ${isStepCompleted ? 'border-primary bg-primary/5' : 'border-border'}`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-semibold flex-1">{step.instruction}</h4>
                {isStepCompleted && (
                  <CheckCircle className="h-6 w-6 text-primary ml-2 flex-shrink-0" />
                )}
              </div>
              <p className="text-muted-foreground">{step.detail}</p>
              
              {!isStepCompleted && (
                <Button onClick={handleStepComplete} className="w-full">
                  Mark as Complete
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {allStepsCompleted ? "Exercise Complete! 🎉" : ""}
            </div>

            <Button 
              onClick={handleNextStep}
              disabled={currentStep === technique.steps.length - 1}
              variant="outline"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button onClick={onClose} variant="ghost">
              Close Technique
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};