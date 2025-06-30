import { NextResponse } from 'next/server';

// Use this for production
const API_ENDPOINT = 'https://api.deepseek.com/chat/completions';
// Use this as fallback if DNS issues persist
// const API_ENDPOINT = 'https://104.18.27.90/chat/completions';

export async function POST(req: Request) {
  try {
    const { journalText } = await req.json();

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    });

    const body = JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'Analyze the journal entry and identify the primary emotion. Respond with ONLY one word: happy, sad, angry, anxious, tired, calm, excited, or unsure.'
        },
        {
          role: 'user',
          content: journalText
        }
      ],
      temperature: 0.2,
      max_tokens: 10
    });

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      console.error('❌ Mood API Error:', res.status);
      return NextResponse.json({ mood: 'unsure' }, { status: 200 });
    }

    const data = await res.json();
    const mood = data.choices[0].message.content.trim().toLowerCase();
    
    const validMoods = ['happy', 'sad', 'angry', 'anxious', 'tired', 'calm', 'excited'];
    return NextResponse.json({ 
      mood: validMoods.includes(mood) ? mood : 'unsure' 
    });

  } catch (error) {
    console.error('🚨 Mood Analysis Error:', error);
    return NextResponse.json({ mood: 'unsure' }, { status: 200 });
  }
}