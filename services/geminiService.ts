import { GoogleGenAI } from "@google/genai";
import { COURSE_INFO, MODULES, ASSIGNMENTS } from '../constants';
import { ChatMessage } from '../types';

const apiKey = process.env.API_KEY;
// Note: In a real production app, you might want to proxy this through a backend
// to avoid exposing the key if not using a secure environment variable injection system suitable for client-side.
// For this demo, we assume the environment is secure or this is a prototyped internal tool.

const ai = new GoogleGenAI({ apiKey: apiKey });

const SYSTEM_INSTRUCTION = `
You are the AI Teaching Assistant for the course ${COURSE_INFO.code}: ${COURSE_INFO.name}, taught by ${COURSE_INFO.instructor}.
Your role is to help students understand the syllabus, schedule, assignments, and course concepts.

Here is the context of the course:
Description: ${COURSE_INFO.description}
Office Hours: ${COURSE_INFO.officeHours}
Email: ${COURSE_INFO.email}

Modules/Schedule:
${JSON.stringify(MODULES)}

Assignments:
${JSON.stringify(ASSIGNMENTS)}

Rules:
1. Be helpful, encouraging, and academic in tone.
2. If a student asks about grades, tell them to check the "Grades" tab but do not invent specific grades for them (unless it's general policy).
3. If asked about a specific topic (like "Explain SHAP values"), explain it briefly in the context of the course material.
4. Keep responses concise unless asked for a detailed explanation.
5. You can format your response with Markdown.
`;

export const streamChatResponse = async (
  history: ChatMessage[],
  currentMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';

    // Convert internal history to Gemini format
    // Note: We only take the last few turns to save context window if strictly necessary, 
    // but Flash has a large window so we can pass most of it.
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: currentMessage }]
    });

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble connecting to the course database right now. Please try again later.";
  }
};