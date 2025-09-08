import React, { useState } from 'react';
import { Calendar, MapPin, Crop, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CalendarMapSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarEvents = [
    { date: '2024-09-15', title: 'Wheat Harvesting', type: 'harvest', color: 'bg-farm-accent' },
    { date: '2024-09-20', title: 'Rice Planting', type: 'plant', color: 'bg-farm-secondary' },
    { date: '2024-09-25', title: 'Fertilizer Application', type: 'maintenance', color: 'bg-farm-primary' },
    { date: '2024-10-01', title: 'Pest Inspection', type: 'inspection', color: 'bg-orange-500' }
  ];

  const regionCrops = [
    { region: 'Punjab', crop: 'Wheat', color: '#f59e0b', percentage: 65 },
    { region: 'Punjab', crop: 'Rice', color: '#10b981', percentage: 25 },
    { region: 'Punjab', crop: 'Sugarcane', color: '#8b5cf6', percentage: 10 },
    { region: 'Haryana', crop: 'Wheat', color: '#f59e0b', percentage: 70 },
    { region: 'Haryana', crop: 'Mustard', color: '#eab308', percentage: 20 },
    { region: 'Haryana', crop: 'Barley', color: '#84cc16', percentage: 10 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-farm-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 brand-gradient">Calendar & Regional Insights</h2>
          <p className="text-xl text-muted-foreground">
            Track your farming schedule and explore regional crop patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="feature-card shadow-elegant border border-border rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Farming Calendar</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                  const dateStr = `2024-09-${day.toString().padStart(2, '0')}`;
                  const event = calendarEvents.find(e => e.date === dateStr);
                  
                  return (
                    <div
                      key={day}
                      className={`relative p-3 text-center rounded-lg border transition-all hover:border-primary cursor-pointer hover-lift ${
                        event ? 'bg-primary/10 border-primary/30' : 'hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {event && (
                        <div className={`absolute bottom-1 left-1 right-1 h-1 rounded-full ${event.color}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Upcoming Activities</h4>
              <div className="space-y-3">
                {calendarEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover-lift border border-border">
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.date}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="feature-card shadow-elegant border border-border rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Regional Crop Map</h3>
            </div>

            <div className="relative h-80 bg-gradient-to-br from-farm-light/20 to-farm-secondary/20 rounded-xl p-6 mb-6 border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-20">🗺️</div>
              </div>
              
              <div className="absolute top-20 left-16 w-4 h-4 bg-farm-accent rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="absolute top-24 left-20 w-4 h-4 bg-farm-secondary rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="absolute top-32 left-24 w-4 h-4 bg-farm-primary rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform"></div>
              
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                Interactive map showing crop distribution across India
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Crop className="h-4 w-4" />
                Your Region: Punjab
              </h4>
              
              <div className="space-y-3">
                {regionCrops.filter(crop => crop.region === 'Punjab').map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: crop.color }}
                      ></div>
                      <span className="font-medium">{crop.crop}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{crop.percentage}%</div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 hover-lift" variant="outline">
                <Info className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarMapSection;


