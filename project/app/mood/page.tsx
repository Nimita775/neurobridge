'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Mood {
  mood: string;
  timestamp: string;
}

export default function MoodPage() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [journalText, setJournalText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const moodOptions = [
    { label: '😄 Happy', mood: 'Happy' },
    { label: '🙂 Okay', mood: 'Okay' },
    { label: '😢 Sad', mood: 'Sad' },
    { label: '😠 Angry', mood: 'Angry' },
    { label: '😰 Anxious', mood: 'Anxious' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('moods');
    if (saved) {
      setMoods(JSON.parse(saved));
    }
  }, []);

  const saveMood = (mood: string) => {
    const newMood = { mood, timestamp: new Date().toLocaleString() };
    const updated = [...moods, newMood];
    setMoods(updated);
    localStorage.setItem('moods', JSON.stringify(updated));
  };

  const handleSelectMood = (mood: string) => {
    saveMood(mood);
  };

  const handlePredictMood = async () => {
    if (!journalText.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journalText }),
      });

      const data = await res.json();
      saveMood(data.mood || 'Unknown');
      setJournalText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="hover:bg-white/50 rounded-xl">
            <Link href="/chat">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Link>
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
            Mood Tracker
          </h1>
          <div></div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pb-6 space-y-8">
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-gray-700">
              How are you feeling right now?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4 p-6">
            {moodOptions.map((option) => (
              <Button
                key={option.mood}
                onClick={() => handleSelectMood(option.mood)}
                className="text-lg px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                {option.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-gray-700">
              Or write a quick journal entry to auto-detect your mood
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Input
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write how you feel..."
              className="text-base border-gray-300"
              disabled={isLoading}
            />
            <Button
              onClick={handlePredictMood}
              disabled={!journalText.trim() || isLoading}
              className="bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white rounded-xl px-6"
            >
              {isLoading ? 'Analyzing...' : 'Predict Mood'}
            </Button>
          </CardContent>
        </Card>

        {moods.length > 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-gray-700">
                Your Mood History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {moods.slice().reverse().map((mood, index) => (
                <div key={index} className="flex justify-between items-center bg-white rounded-xl p-4 shadow">
                  <span className="text-lg">{mood.mood}</span>
                  <span className="text-sm text-gray-500">{mood.timestamp}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
