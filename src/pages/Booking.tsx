import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Booking() {
  const [formData, setFormData] = useState({
    anonymousToken: '',
    securityPin: '',
    urgencyLevel: '',
    preferredTime: '',
    sessionType: '',
    concerns: '',
    previousSession: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate confirmation number
    const confirmation = 'DPIS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setConfirmationNumber(confirmation);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const urgencyLevels = [
    { value: 'low', label: 'Non-urgent (within 1-2 weeks)', color: 'text-secondary' },
    { value: 'medium', label: 'Moderate (within 3-5 days)', color: 'text-warning' },
    { value: 'high', label: 'High priority (within 24-48 hours)', color: 'text-destructive' },
    { value: 'crisis', label: 'Crisis - Immediate help needed', color: 'text-destructive font-semibold' },
  ];

  const timeSlots = [
    'Morning (8AM-12PM)',
    'Afternoon (12PM-5PM)', 
    'Evening (5PM-8PM)',
    'Flexible - Any time',
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elevated border-secondary">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-secondary-foreground" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
              
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your confirmation number:</p>
                <p className="text-xl font-mono font-semibold">{confirmationNumber}</p>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">What happens next:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>A counselor will review your request within the urgency timeframe</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>You'll receive session details via secure message</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>All sessions are completely confidential</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Save your confirmation number for reference</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    anonymousToken: '',
                    securityPin: '',
                    urgencyLevel: '',
                    preferredTime: '',
                    sessionType: '',
                    concerns: '',
                    previousSession: '',
                  });
                }}
                className="w-full mt-6"
                variant="outline"
              >
                Book Another Session
              </Button>
            </CardContent>
          </Card>
          
          {/* Crisis Support */}
          <Card className="mt-6 border-destructive bg-destructive/5">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <h3 className="font-semibold text-destructive mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If this is a mental health emergency, please contact:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Crisis Hotline:</strong> 988 or 1-800-273-8255</p>
                <p><strong>Emergency Services:</strong> 911</p>
                <p><strong>Campus Security:</strong> [Your campus emergency number]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Schedule Counselor Session</h1>
          <p className="text-lg text-muted-foreground">
            Connect with a qualified mental health professional. All sessions are confidential and anonymous.
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Privacy & Security</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Sessions are completely anonymous - no names stored</li>
                  <li>• Your token and PIN ensure secure, private communication</li>
                  <li>• All conversations are confidential</li>
                  <li>• Sessions can be conducted via secure chat, phone, or video</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Session Booking Form</span>
            </CardTitle>
            <CardDescription>
              Please fill out this form to schedule your confidential counseling session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Authentication */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Authentication</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Anonymous Token *</label>
                    <Input
                      placeholder="user_abc12345"
                      value={formData.anonymousToken}
                      onChange={(e) => handleInputChange('anonymousToken', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Security PIN *</label>
                    <Input
                      type="password"
                      placeholder="Create a 4-6 digit PIN"
                      value={formData.securityPin}
                      onChange={(e) => handleInputChange('securityPin', e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This PIN will be used to access your session
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Session Details</span>
                </h3>

                <div>
                  <label className="text-sm font-medium mb-2 block">Urgency Level *</label>
                  <Select onValueChange={(value) => handleInputChange('urgencyLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How urgent is your need for support?" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <span className={level.color}>{level.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Time Slot</label>
                  <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="When would you prefer to meet?" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Session Type</label>
                  <Select onValueChange={(value) => handleInputChange('sessionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How would you like to meet?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chat">Secure Text Chat</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Brief Description of Concerns</label>
                  <Textarea
                    placeholder="Optional: Help us understand what kind of support you're looking for..."
                    value={formData.concerns}
                    onChange={(e) => handleInputChange('concerns', e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This helps match you with the right counselor (optional)
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Previous DPIS Sessions</label>
                  <Select onValueChange={(value) => handleInputChange('previousSession', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Have you used DPIS counseling before?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time">This is my first session</SelectItem>
                      <SelectItem value="returning">I've had sessions before</SelectItem>
                      <SelectItem value="ongoing">I have ongoing sessions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Booking Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Crisis Support */}
        <Card className="mt-8 border-destructive bg-destructive/5">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
            <h3 className="font-semibold text-destructive mb-2">Crisis or Emergency?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you're having thoughts of self-harm or this is an emergency, please get immediate help:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Crisis Hotline:</strong> 988 (24/7 Support)</p>
              <p><strong>Emergency Services:</strong> 911</p>
              <p><strong>Campus Security:</strong> [Your campus emergency number]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}