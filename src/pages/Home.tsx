import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, Heart, Users, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

interface HomeProps {
  onPageChange: (page: string) => void;
}

export default function Home({ onPageChange }: HomeProps) {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  const handleRegistration = () => {
    if (email.includes('@') && email.includes('.edu')) {
      // Generate anonymous token (simulated)
      const token = 'user_' + Math.random().toString(36).substr(2, 8);
      setGeneratedToken(token);
      setIsRegistered(true);
      setEmail(''); // Clear email for privacy
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Anonymous & Secure',
      description: 'Your privacy is our priority. No personal data stored, complete anonymity.',
    },
    {
      icon: Heart,
      title: 'AI-Guided Support',
      description: 'Get immediate mental health assessment and personalized guidance.',
    },
    {
      icon: Users,
      title: 'Peer Community',
      description: 'Connect with others in a safe, anonymous support environment.',
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access self-help materials, videos, and wellness resources.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Digital Psychological
            <span className="block">Intervention System</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Anonymous, secure, and immediate mental health support for students
          </p>
          
          {!isRegistered ? (
            <Card className="max-w-md mx-auto bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Anonymous Registration</span>
                </CardTitle>
                <CardDescription>
                  Enter your college email. We'll generate an anonymous token for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="email"
                  placeholder="your-email@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  onClick={handleRegistration}
                  className="w-full"
                  disabled={!email.includes('@') || !email.includes('.edu')}
                >
                  Generate Anonymous Token
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-md mx-auto bg-card/95 backdrop-blur-sm border-secondary">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg">Registration Complete!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your anonymous token (save this for login):
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      {generatedToken}
                    </div>
                  </div>
                  <Button onClick={() => onPageChange('chat')} className="w-full">
                    Start AI Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How DPIS Helps You</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive mental health support designed with privacy first
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Need Help Right Now?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              size="lg" 
              onClick={() => onPageChange('chat')}
              className="h-auto p-6 flex-col space-y-2"
            >
              <Shield className="h-8 w-8" />
              <div>
                <div className="font-semibold">AI Assessment</div>
                <div className="text-sm opacity-80">Quick mental health check</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onPageChange('resources')}
              className="h-auto p-6 flex-col space-y-2"
            >
              <BookOpen className="h-8 w-8" />
              <div>
                <div className="font-semibold">Self-Help Resources</div>
                <div className="text-sm opacity-80">Immediate wellness tools</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onPageChange('booking')}
              className="h-auto p-6 flex-col space-y-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-8 w-8" />
              <div>
                <div className="font-semibold">Crisis Support</div>
                <div className="text-sm opacity-80">Book counselor session</div>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}