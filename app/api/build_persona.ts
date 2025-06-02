import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, raw_dump } = body;

    if (!user_id || !raw_dump) {
      return NextResponse.json({ error: 'Missing user_id or raw_dump' }, { status: 400 });
    }

    const systemPrompt = `
You are the architect of a digital twin’s cognitive-emotional profile. Your task is not just to analyze the user's raw data, but to construct a structured and functional foundation for how the twin will think, communicate, and make decisions.

The input data may include user-generated content such as personal messages, profiles, notes, search history, social media posts, or journal entries — potentially in any language.

This profile will be used directly in system modules such as simulation, reflection, and guidance. Therefore, you must follow the format precisely and keep the structure formal.

Be concise but accurate. If the input data is too long to fully analyze, prioritize repeated and explicit expressions that help characterize the user’s personality, thinking, and motivations. Your output must be modular and stable for incremental enrichment in the future.

Analyze the following dimensions:

1. Personality structure and identity model
2. Thinking patterns and cognitive tendencies
3. Values and motivational architecture
4. Emotional tone and empathy profile
5. Social behavior and communication style
6. Challenges, tensions or internal conflicts
7. Expressive style and sense-making patterns

Respond strictly using the following JSON format. Do not write anything outside of it.

\`\`\`json
{
  "summary": "A concise but content-rich overview of the user",
  "traits": ["Personality trait 1", "Trait 2", "..."],
  "thinking_patterns": ["Cognitive bias 1", "Heuristic 2", "..."],
  "communication_style": "Tone, rhythm, typical phrasing and social approach",
  "emotional_profile": "Emotional tendencies, intensit_
