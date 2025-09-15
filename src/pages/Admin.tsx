import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, MessageSquare, Calendar, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export default function Admin() {
  // Sample data for demonstration
  const riskLevelData = [
    { level: 'Level 0-1', count: 145, percentage: 45 },
    { level: 'Level 2', count: 89, percentage: 28 },
    { level: 'Level 3-4', count: 67, percentage: 21 },
    { level: 'Level 5', count: 19, percentage: 6 },
  ];

  const dailyAssessments = [
    { day: 'Mon', assessments: 32, bookings: 8 },
    { day: 'Tue', assessments: 28, bookings: 12 },
    { day: 'Wed', assessments: 45, bookings: 15 },
    { day: 'Thu', assessments: 38, bookings: 9 },
    { day: 'Fri', assessments: 52, bookings: 18 },
    { day: 'Sat', assessments: 24, bookings: 6 },
    { day: 'Sun', assessments: 19, bookings: 4 },
  ];

  const monthlyTrends = [
    { month: 'Jan', users: 120, sessions: 89 },
    { month: 'Feb', users: 135, sessions: 102 },
    { month: 'Mar', users: 158, sessions: 124 },
    { month: 'Apr', users: 172, sessions: 145 },
    { month: 'May', users: 189, sessions: 168 },
    { month: 'Jun', users: 203, sessions: 187 },
  ];

  const pieColors = ['hsl(var(--secondary))', 'hsl(var(--warning))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

  const keyStats = [
    {
      title: 'Total Registered Users',
      value: '1,247',
      change: '+12%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'AI Assessments (This Week)',
      value: '238',
      change: '+8%',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Counselor Sessions Booked',
      value: '72',
      change: '+23%',
      icon: Calendar,
      trend: 'up'
    },
    {
      title: 'Forum Posts',
      value: '156',
      change: '+15%',
      icon: MessageSquare,
      trend: 'up'
    },
  ];

  const recentAlerts = [
    {
      type: 'high-risk',
      message: '3 Level 5 assessments in the last 24 hours',
      time: '2 hours ago',
      status: 'addressed'
    },
    {
      type: 'capacity',
      message: 'Counselor availability at 85% capacity',
      time: '4 hours ago',
      status: 'monitoring'
    },
    {
      type: 'trend',
      message: 'Increased anxiety-related assessments this week',
      time: '1 day ago',
      status: 'noted'
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">DPIS Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Anonymized mental health metrics and system overview
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-secondary">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Level Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Mental Health Risk Distribution</CardTitle>
              <CardDescription>
                Assessment results from the past 30 days (anonymized)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskLevelData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.level}</span>
                      <span>{item.count} users ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskLevelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {riskLevelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Daily Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
              <CardDescription>
                AI assessments and counselor bookings by day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAssessments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="assessments" fill="hsl(var(--primary))" name="AI Assessments" />
                    <Bar dataKey="bookings" fill="hsl(var(--secondary))" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends and Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Monthly Growth Trend */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Monthly Growth Trends</CardTitle>
              <CardDescription>
                System usage and engagement over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="New Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      name="Counselor Sessions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>System Alerts</span>
              </CardTitle>
              <CardDescription>
                Recent notifications and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={
                          alert.type === 'high-risk' ? 'destructive' :
                          alert.type === 'capacity' ? 'default' : 
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {alert.type === 'high-risk' ? 'High Risk' :
                         alert.type === 'capacity' ? 'Capacity' : 'Trend'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                    >
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Notice */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Privacy & Data Protection
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>• All data shown is aggregated and anonymized</div>
              <div>• No personal identifiers are stored or displayed</div>
              <div>• Individual user data cannot be traced or identified</div>
              <div>• Compliant with FERPA and HIPAA privacy standards</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}