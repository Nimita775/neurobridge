'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, MessageCircle, TrendingUp, Sparkles, NotebookPen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NeuroBridge
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/chat" className="text-gray-600 hover:text-purple-600 transition-colors">
              Chat
            </Link>
            <Link href="/mood" className="text-gray-600 hover:text-purple-600 transition-colors">
              Mood
            </Link>
            <Link href="/journal" className="text-gray-600 hover:text-purple-600 transition-colors">
              Journal
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            Designed for neurodivergent minds
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI mental health companion for{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              neurodivergent minds
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience compassionate support tailored to your unique way of thinking.
            Get personalized guidance, track your mood, and build better mental health habits.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Link href="/chat">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chatting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg rounded-xl">
              <Link href="/mood">
                <Heart className="h-5 w-5 mr-2" />
                Track Mood
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg rounded-xl">
              <Link href="/journal">
                <NotebookPen className="h-5 w-5 mr-2" />
                Daily Journal
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Empathetic Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                Have meaningful conversations with an AI that understands neurodivergent experiences and provides tailored support.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-xl w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mood Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your emotional patterns with intuitive mood tracking designed to help you understand your mental health journey.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl w-fit mx-auto mb-4">
                <NotebookPen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Daily Journal</h3>
              <p className="text-gray-600 leading-relaxed">
                Reflect on your thoughts with a simple journaling tool to support self-awareness and emotional growth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of neurodivergent individuals who are taking control of their mental health with NeuroBridge.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl font-semibold">
            <Link href="/chat">
              Get Started Now
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1.5 rounded-lg">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NeuroBridge
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Built with</span>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              Bolt
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
