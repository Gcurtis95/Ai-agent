import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { userData } from '../../lib/userData';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { date, time } = await req.json();
  const userContext = userData();

  const prompt = `
Current Date and Time: ${date} ${time}

User Context:
${userContext}

What is the best recommendation or action to take for the user right now?
`;



  const systemPrompt = `
You are Dan's personal AI assistant. By tapping into device data, act on Dan's behalf, surface timely and accurate recommendations,
and even curate personalized entertainment experiences in a timely, non-intrusive way.
Dan is captivated by the idea of living in a world where technology not only responds to commands but also
foresees his needs and acts independently to improve his daily life. Make helpful suggestions based on the data provided including 
recommendations on location, social, media, calendar, make suggestions for activities or tasks that you can perform on behalf of the 
user like sending emails/messages, buying train tickets etc. Get creative.

You must always respond with a structured JSON object like this:

{
  "summary": "short, human-friendly summary. no questions here",
  "actions": [
    {
      "type": "suggest playlist",
      "playlist_name": "which name from the playlists provided",
      "song name": "suggest a song name from corresponding playlist"
    },
    {
      "type": "reminder",
      "title": "Always ask a question and make suggestions for activities or tasks that you can perform on behalf of the user like sending emails/messages,
      buying items, train tickets etc. Get creative. Send reminders e.g. Team Standup at.... If sending a time, please send 'time' in the following format: '2025-05-16T15:00:00Z'"
    }
  ]
}

Your goal is to provide 1–2 *relevant* and *context-aware* actions that would help Dan in the current moment, based on his digital life data. Actions should be practical, non-intrusive, and empathetic.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    const rawContent = response.choices[0].message?.content || '';

    try {
      const parsed = JSON.parse(rawContent);
      return NextResponse.json(parsed);
    } catch {
      console.error('Failed to parse response content:', rawContent);
      return NextResponse.json(
        { error: 'Failed to parse structured response', raw: rawContent },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to call OpenAI' },
      { status: 500 }
    );
  }
}
