import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Plus, Search, Users, Shield, Stethoscope } from 'lucide-react';

interface Post {
  id: string;
  username: string;
  role: 'user' | 'volunteer' | 'counselor';
  title: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      username: 'anonymous_eagle_42',
      role: 'user',
      title: 'Dealing with exam anxiety - any tips?',
      content: 'Finals are coming up and I\'m feeling overwhelmed. Has anyone found techniques that really help with test anxiety?',
      timeAgo: '2 hours ago',
      likes: 8,
      replies: 12,
      isLiked: false,
    },
    {
      id: '2',
      username: 'peer_helper_7',
      role: 'volunteer',
      title: 'Weekly Check-in: How is everyone doing?',
      content: 'It\'s been a tough week for many. Remember that it\'s okay to not be okay sometimes. What\'s one small thing that brought you joy this week?',
      timeAgo: '4 hours ago',
      likes: 23,
      replies: 18,
      isLiked: true,
    },
    {
      id: '3',
      username: 'counselor_marie',
      role: 'counselor',
      title: 'Healthy Sleep Habits for Students',
      content: 'Sleep is crucial for mental health. Here are some evidence-based tips for better sleep hygiene that can really make a difference...',
      timeAgo: '1 day ago',
      likes: 45,
      replies: 8,
      isLiked: false,
    },
    {
      id: '4',
      username: 'brave_student_99',
      role: 'user',
      title: 'Feeling isolated - anyone else?',
      content: 'It\'s hard to make connections when everything feels overwhelming. Sometimes I feel like I\'m the only one struggling.',
      timeAgo: '1 day ago',
      likes: 15,
      replies: 24,
      isLiked: false,
    },
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'counselor':
        return <Badge className="bg-primary text-primary-foreground text-xs"><Stethoscope className="w-3 h-3 mr-1" />Counselor</Badge>;
      case 'volunteer':
        return <Badge className="bg-secondary text-secondary-foreground text-xs"><Shield className="w-3 h-3 mr-1" />Volunteer</Badge>;
      default:
        return <Badge variant="outline" className="text-xs"><Users className="w-3 h-3 mr-1" />Member</Badge>;
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Peer Support Forum</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, anonymous space to connect with others, share experiences, and find support.
          </p>
        </div>

        {/* Community Guidelines Card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Community Guidelines
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>• Be respectful and supportive</div>
              <div>• Maintain anonymity</div>
              <div>• No personal contact information</div>
            </div>
          </CardContent>
        </Card>

        {/* Search and New Post */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowNewPost(!showNewPost)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="mb-8 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Share with the Community</CardTitle>
              <CardDescription>Your post will be anonymous. Please be respectful and supportive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Post title..." />
              <Textarea 
                placeholder="What's on your mind? Share your thoughts, experiences, or ask for support..." 
                className="min-h-[120px]"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
                <Button onClick={() => setShowNewPost(false)}>Post Anonymously</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or be the first to start a conversation!</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {post.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{post.username}</span>
                          {getRoleBadge(post.role)}
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{post.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 ${
                            post.isLiked ? 'text-destructive' : 'text-muted-foreground'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{post.replies}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Crisis Support Notice */}
        <Card className="mt-12 border-destructive bg-destructive/5">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-destructive mb-2">Need Immediate Support?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're in crisis or having thoughts of self-harm, please reach out for immediate help.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Crisis Hotline:</strong> +919999666555 (24/7 Support)</p>
              <p><strong>Campus Emergency:</strong> Call your campus security</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}