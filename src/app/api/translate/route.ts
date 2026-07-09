import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { text, targetLocale } = await request.json();

    if (!text || !targetLocale) {
      return NextResponse.json({ error: 'Missing text or targetLocale' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API Key is missing' }, { status: 500 });
    }

    // GoogleGenAI automatically uses process.env.GEMINI_API_KEY if not explicitly provided,
    // but passing it explicitly is safe.
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const localeMap: Record<string, string> = {
      en: 'English',
      ja: 'Japanese',
      zh: 'Chinese (Simplified)'
    };
    
    const targetLanguage = localeMap[targetLocale] || targetLocale;

    const prompt = `Translate the following Korean text into ${targetLanguage}. 
Keep the original Markdown formatting exactly as it is.
Use natural and engaging tone, suitable for global K-Pop fans and tourists visiting Busan.
Do not add any additional explanations, quotes, or text around the output, just return the translated text directly.

Text to translate:
${text}`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt
    });

    return NextResponse.json({ translatedText: interaction.output_text });
  } catch (error: any) {
    console.error('Translation API error:', error);
    return NextResponse.json({ error: error.message || 'Translation failed' }, { status: 500 });
  }
}
