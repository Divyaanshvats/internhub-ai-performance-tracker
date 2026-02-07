
import { GoogleGenAI, Type } from "@google/genai";
import { Intern } from "../types";

export const summarizeInternPerformance = async (intern: Intern): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
      Please summarize the performance of an intern with the following details for a professional corporate record.
      Name: ${intern.name}
      Department: ${intern.department}
      Duration: ${intern.duration}
      Projects Completed: ${intern.projectsCompleted}
      Manager Rating: ${intern.rating}/10
      Manager Comment: ${intern.comment}

      Provide a concise, professional 2-3 sentence executive summary that highlights their contributions and potential.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Summary generation failed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI summary. Please check connection or API key.";
  }
};
