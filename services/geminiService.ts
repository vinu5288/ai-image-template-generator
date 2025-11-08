
import { GoogleGenAI, Modality } from "@google/genai";
import { UploadedImage } from "../types";

// The GoogleGenAI instance is now initialized inside the function 
// to prevent a crash on startup when process.env.API_KEY is not yet available.
let ai: GoogleGenAI | null = null;

const getAI = () => {
    if (!ai) {
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        if (!API_KEY) {
            throw new Error("VITE_GEMINI_API_KEY environment variable is not set");
        }
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
}

export const generateImageFromTemplate = async (
  images: UploadedImage[],
  prompt: string
): Promise<string> => {
  try {
    const aiClient = getAI();
    const imageParts = images.map(image => ({
        inlineData: {
            data: image.base64,
            mimeType: image.mimeType,
        },
    }));

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          ...imageParts,
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};
