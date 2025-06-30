'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('journal');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    if (!entry.trim()) return;

    const updated = [...history, `${new Date().toLocaleString()}: ${entry.trim()}`];
    setHistory(updated);
    localStorage.setItem('journal', JSON.stringify(updated));
    setEntry('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-purple-50 to-blue-50">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="hover:bg-white/50 rounded-xl">
            <Link href="/chat">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Link>
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Daily Journal
          </h1>
          <div></div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pb-6">
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-gray-700">
              Write your thoughts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="Write anything on your mind..."
              className="w-full rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              rows={5}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <Button
              onClick={saveEntry}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6"
            >
              Save Entry
            </Button>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card className="mt-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-gray-700">
                Journal History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {history.slice().reverse().map((note, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow text-sm text-gray-700 whitespace-pre-wrap">
                  {note}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
