import { NextResponse } from 'next/server';

// Use this for production
const API_ENDPOINT = 'https://api.deepseek.com/chat/completions';
// Use this as fallback if DNS issues persist
// const API_ENDPOINT = 'https://104.18.27.90/chat/completions';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    });

    const body = JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a friendly mental health companion. Provide supportive, empathetic responses focusing on emotional well-being.'
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    // Try with custom DNS resolver
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ DeepSeek Chat API Error:', {
        status: res.status,
        error: errorText
      });
      
      return NextResponse.json(
        { response: "Our support services are temporarily unavailable. Please try again later." },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ response: data.choices[0].message.content.trim() });

  } catch (error: any) {
    console.error('🚨 Network Error:', error);
    
    return NextResponse.json(
      { response: "Connection issues detected. Please check your internet connection." },
      { status: 503 }
    );
  }
}