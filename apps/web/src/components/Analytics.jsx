import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp } from 'lucide-react';

const Analytics = () => {
  const [timePeriod, setTimePeriod] = useState('7D');
  const [analyticsData, setAnalyticsData] = useState({
    '24H': {
      visitors: { value: 0, change: 0, trend: 'up' },
      pageViews: { value: 0, change: 0, trend: 'up' }
    },
    '7D': {
      visitors: { value: 199, change: 36.3, trend: 'up' },
      pageViews: { value: 508, change: 46.8, trend: 'up' }
    },
    '30D': {
      visitors: { value: 0, change: 0, trend: 'up' },
      pageViews: { value: 0, change: 0, trend: 'up' }
    }
  });

  // Note: Vercel Analytics data is shown in the Vercel dashboard
  // This component displays placeholder metrics. Once deployed to Vercel
  // with Analytics enabled, real data will be available in your Vercel dashboard
  // at https://vercel.com/[your-username]/[project-name]/analytics

  useEffect(() => {
    // Real Vercel Analytics data is available via Vercel's dashboard API
    // For now, we're using mock data. After deployment, you can fetch real data
    // using Vercel's Analytics API if needed for custom displays
  }, [timePeriod]);

  const currentData = analyticsData[timePeriod];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-white">Analytics</CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Portfolio performance metrics
              </CardDescription>
            </div>
            <Tabs value={timePeriod} onValueChange={setTimePeriod}>
              <TabsList className="bg-slate-800/50 border border-slate-700">
                <TabsTrigger 
                  value="24H" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  24H
                </TabsTrigger>
                <TabsTrigger 
                  value="7D" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  7D
                </TabsTrigger>
                <TabsTrigger 
                  value="30D" 
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  30D
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visitors Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-400">Visitors</p>
                <div className="flex items-end justify-between">
                  <motion.h3 
                    key={`visitors-${timePeriod}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold text-white"
                  >
                    {currentData.visitors.value.toLocaleString()}
                  </motion.h3>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      ↑ {currentData.visitors.change}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Page Views Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-400">Page Views</p>
                <div className="flex items-end justify-between">
                  <motion.h3 
                    key={`pageviews-${timePeriod}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold text-white"
                  >
                    {currentData.pageViews.value.toLocaleString()}
                  </motion.h3>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      ↑ {currentData.pageViews.change}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
