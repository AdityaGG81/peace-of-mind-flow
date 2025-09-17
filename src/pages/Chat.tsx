import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, User, ArrowRight, AlertTriangle, BookOpen, Users, Calendar } from 'lucide-react';

interface ChatProps {
  onPageChange: (page: string) => void;
}

const questions = [
  "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
  "How often have you had little interest or pleasure in doing things?",
  "How often have you felt nervous, anxious, or on edge?",
  "How often have you had trouble falling or staying asleep?",
  "How often have you felt tired or had little energy?",
  "How often have you had poor appetite or been overeating?",
  "How often have you felt bad about yourself or felt like a failure?",
  "How often have you had trouble concentrating on things?",
];

const responseOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export default function Chat({ onPageChange }: ChatProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleResponse = (value: number) => {
    const newResponses = [...responses, value];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk level
      const totalScore = newResponses.reduce((sum, score) => sum + score, 0);
      const calculatedLevel = Math.min(5, Math.floor(totalScore / 4));
      setRiskLevel(calculatedLevel);
      setIsCompleted(true);
      setTimeout(() => setShowRecommendations(true), 1000);
    }
  };

  const getRiskLevelInfo = (level: number) => {
    switch (level) {
      case 0:
      case 1:
        return {
          label: "Minimal Risk",
          color: "bg-secondary text-secondary-foreground",
          description: "You're doing well! Consider exploring our wellness resources.",
        };
      case 2:
        return {
          label: "Mild Concern",
          color: "bg-warning text-warning-foreground",
          description: "Some stress detected. Self-help resources might be beneficial.",
        };
      case 3:
      case 4:
        return {
          label: "Moderate Risk",
          color: "bg-accent text-accent-foreground",
          description: "Consider peer support and counselor consultation.",
        };
      case 5:
        return {
          label: "High Risk",
          color: "bg-destructive text-destructive-foreground",
          description: "Immediate support recommended. We'll help you book a counselor.",
        };
      default:
        return {
          label: "Assessment Pending",
          color: "bg-muted text-muted-foreground",
          description: "Complete the assessment to get personalized recommendations.",
        };
    }
  };

  const riskInfo = getRiskLevelInfo(riskLevel);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Assessment Results */}
          <Card className="mb-8 shadow-elevated">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Assessment Complete</CardTitle>
              <CardDescription>
                Based on your responses, here's your mental health profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Badge className={`text-lg px-6 py-2 ${riskInfo.color}`}>
                  Risk Level {riskLevel}: {riskInfo.label}
                </Badge>
                <p className="text-muted-foreground">{riskInfo.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {showRecommendations && (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
              <h2 className="text-xl font-semibold text-center mb-6">Recommended Next Steps</h2>
              
              {/* Level 0-2: Resources */}
              {riskLevel <= 2 && (
                <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer" 
                      onClick={() => onPageChange('resources')}>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Explore Wellness Resources</h3>
                      <p className="text-sm text-muted-foreground">
                        Self-help videos, relaxation guides, and wellness tools
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              )}

              {/* Level 3-4: Resources + Forum + Counselor */}
              {riskLevel >= 3 && riskLevel <= 4 && (
                <>
                  <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer" 
                        onClick={() => onPageChange('resources')}>
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Wellness Resources</h3>
                        <p className="text-sm text-muted-foreground">Self-help materials and coping strategies</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer" 
                        onClick={() => onPageChange('forum')}>
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Peer Support Forum</h3>
                        <p className="text-sm text-muted-foreground">Connect with others in a safe environment</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer" 
                        onClick={() => onPageChange('booking')}>
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Schedule Counselor Session</h3>
                        <p className="text-sm text-muted-foreground">Professional support when you're ready</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Level 5: Immediate counselor booking */}
              {riskLevel === 5 && (
                <Card className="border-destructive shadow-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-destructive">Immediate Support Recommended</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your responses indicate you may benefit from immediate professional support.
                        </p>
                        <Button 
                          size="lg" 
                          className="w-full"
                          onClick={() => onPageChange('booking')}
                        >
                          Connect with a Counselor Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bot className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">AI Mental Health Assessment</h1>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-elevated">
          <CardHeader>
            <div className="flex items-start space-x-3 ">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg leading-relaxed">
                  {questions[currentQuestion]}
                </CardTitle>
                <CardDescription className="mt-2">
                  Please select the option that best describes your experience over the past 2 weeks.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {responseOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="w-full justify-start text-left h-auto py-4 px-6 hover:border-primary hover:bg-primary/5 hover:text-primary"
                onClick={() => handleResponse(option.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  <span>{option.label}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>🔒 Your responses are anonymous and secure. No personal information is stored.</p>
        </div>
      </div>
    </div>
  );
}