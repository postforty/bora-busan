import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { text, targetLocale, isJson, model = 'gemini-3.1-flash-lite' } = await request.json();

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

    let prompt = '';
    if (isJson) {
      prompt = `Translate the string values in the following JSON into ${targetLanguage}. 
Keep all JSON keys exactly as they are. Keep the original structure intact.
CRITICAL INSTRUCTION: Do NOT translate the value of the "type" key (e.g., if it is "course" or "place", keep it exactly as "course" or "place").
Ensure the output is valid JSON without any markdown code blocks, quotes, or additional text around it. Just return the raw JSON string.

JSON to translate:
${text}`;
    } else {
      prompt = `You are a professional translator. Translate the following Korean text into ${targetLanguage}.

CRITICAL INSTRUCTIONS:
1. MUST translate the text into ${targetLanguage}. Do NOT return the original Korean text.
2. Keep the original Markdown formatting exactly as it is (headers, lists, links, etc).
3. Use a natural and engaging tone, suitable for global K-Pop fans and tourists visiting Busan.
4. Output ONLY the translated text. Do not add any additional explanations, quotes, or markdown wrappers around the output.

Text to translate:
${text}`;
    }

    const interaction = await ai.interactions.create({
      model: model,
      input: prompt
    });

    return NextResponse.json({ translatedText: interaction.output_text });
  } catch (error: any) {
    console.error('Translation API error:', error);
    return NextResponse.json({ error: error.message || 'Translation failed' }, { status: 500 });
  }
}
