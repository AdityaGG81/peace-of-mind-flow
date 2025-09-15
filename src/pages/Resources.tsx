import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, FileText, Headphones, Heart, Brain, Moon, Smile } from 'lucide-react';

export default function Resources() {
  const videoResources = [
    {
      title: "5-Minute Breathing Exercise",
      description: "Quick stress relief technique for immediate calm",
      duration: "5 min",
      category: "Stress Relief",
      icon: Heart,
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Full-body relaxation technique to reduce tension",
      duration: "15 min",
      category: "Relaxation",
      icon: Brain,
    },
    {
      title: "Mindfulness for Beginners",
      description: "Introduction to mindful awareness and presence",
      duration: "10 min",
      category: "Mindfulness",
      icon: Smile,
    },
    {
      title: "Sleep Preparation Routine",
      description: "Wind down techniques for better sleep quality",
      duration: "12 min",
      category: "Sleep",
      icon: Moon,
    },
  ];

  const audioResources = [
    {
      title: "Calming Nature Sounds",
      description: "Forest rain and gentle streams for relaxation",
      duration: "30 min",
      category: "Ambient",
    },
    {
      title: "Guided Meditation - Anxiety",
      description: "Specific meditation for anxiety management",
      duration: "20 min",
      category: "Meditation",
    },
    {
      title: "Positive Affirmations",
      description: "Daily affirmations for self-confidence",
      duration: "8 min",
      category: "Self-Care",
    },
  ];

  const articles = [
    {
      title: "Understanding Anxiety in College Students",
      description: "Learn about common anxiety triggers and coping strategies",
      readTime: "8 min read",
      category: "Education",
    },
    {
      title: "Building Healthy Study Habits",
      description: "Strategies to reduce academic stress and improve focus",
      readTime: "6 min read",
      category: "Academic",
    },
    {
      title: "Social Connection and Mental Health",
      description: "The importance of relationships for psychological wellbeing",
      readTime: "10 min read",
      category: "Social",
    },
    {
      title: "Recognizing Depression Warning Signs",
      description: "Early indicators and when to seek professional help",
      readTime: "12 min read",
      category: "Health",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Stress Relief": "bg-secondary text-secondary-foreground",
      "Relaxation": "bg-accent text-accent-foreground",
      "Mindfulness": "bg-primary text-primary-foreground",
      "Sleep": "bg-warning text-warning-foreground",
      "Ambient": "bg-muted text-muted-foreground",
      "Meditation": "bg-accent text-accent-foreground",
      "Self-Care": "bg-secondary text-secondary-foreground",
      "Education": "bg-primary text-primary-foreground",
      "Academic": "bg-warning text-warning-foreground",
      "Social": "bg-accent text-accent-foreground",
      "Health": "bg-secondary text-secondary-foreground",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Wellness Resource Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Self-help resources designed to support your mental health journey. 
            Choose what feels right for you today.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Feeling Anxious?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Quick breathing exercises and calming techniques
              </p>
              <Button size="sm" className="w-full">Start Now</Button>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Can't Focus?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mindfulness and concentration techniques
              </p>
              <Button size="sm" variant="secondary" className="w-full">Explore</Button>
            </CardContent>
          </Card>

          <Card className="text-center shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Moon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Trouble Sleeping?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sleep hygiene and relaxation practices
              </p>
              <Button size="sm" variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Video Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Play className="h-6 w-6 mr-2 text-primary" />
            Video Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoResources.map((video, index) => {
              const Icon = video.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(video.category)}`}>
                        {video.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                      <Button size="sm" variant="ghost" className="h-8 px-3">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Audio Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Headphones className="h-6 w-6 mr-2 text-secondary" />
            Audio Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {audioResources.map((audio, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <Headphones className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(audio.category)}`}>
                      {audio.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{audio.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{audio.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{audio.duration}</span>
                    <Button size="sm" variant="ghost" className="h-8 px-3">
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-accent" />
            Articles & Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`text-xs ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Notice */}
        <Card className="mt-12 border-destructive bg-destructive/5">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-destructive mb-2">In Crisis?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're experiencing thoughts of self-harm, please reach out for immediate help.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Crisis Hotline:</strong> 988 (24/7 Support)</p>
              <p><strong>Campus Counseling:</strong> Available through our booking system</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}