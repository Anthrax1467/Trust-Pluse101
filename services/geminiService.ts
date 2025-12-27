
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { ProductInsight, InfluencerProfile, SocialComment, BrandInsight, BusinessListing } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Classifies the search query quickly using Flash.
 * Refined to distinguish between high-level brand entities and specific product/line searches.
 */
export async function classifyQuery(query: string): Promise<'product' | 'brand'> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Classify query: "${query}". 
      If the user is asking about a specific model, version, flavor, scent, or product line (e.g. "Dior Homme", "iPhone 15", "Woody Dior"), respond "product".
      If the user is asking about the company/entity broadly (e.g. "Dior", "Apple", "Nike"), respond "brand".
      Respond ONLY: "product" or "brand".`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    const text = response.text?.toLowerCase().trim();
    return text?.includes('brand') ? 'brand' : 'product';
  } catch {
    return 'product';
  }
}

/**
 * High-Velocity Product Insight Extraction
 * Optimized for Gemini 3 Flash for maximum speed and data density.
 * Now explicitly targets Amazon, eBay, and Pinterest for mixed review segments.
 */
export async function fetchProductInsights(query: string): Promise<ProductInsight | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: `ACT AS A HIGH-SPEED DATA EXTRACTOR. 
      TARGET: "${query}"
      
      CORE TASK:
      1. REVIEWS: Extract as many unique, organic user reviews as possible (MAX 10 per category) for: 'topRelevantReviews', 'topPositiveReviews', and 'topNegativeReviews'.
      2. MIXED SOURCES: You MUST find and include reviews from Amazon, eBay, Pinterest, Reddit, and Google. Map the 'source' field correctly.
      3. PRICING: Find current market prices from at least 3 distinct retailers.
      4. CATEGORIZED PULSE: Score Quality, Durability, Value, and Utility from 0-100 based on community consensus.
      5. ATTRIBUTES: If this is a fragrance/scent, include 'notes' in specifications. If food, include nutrition.
      
      OUTPUT: Valid JSON only. Do not provide markdown commentary.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            isConsumable: { type: Type.BOOLEAN },
            description: { type: Type.STRING },
            totalVerifiedReviews: { type: Type.INTEGER },
            priceComparison: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  store: { type: Type.STRING },
                  price: { type: Type.STRING },
                  link: { type: Type.STRING },
                  availability: { type: Type.BOOLEAN }
                }
              }
            },
            categorizedPulse: {
              type: Type.OBJECT,
              properties: {
                quality: { type: Type.NUMBER },
                durability: { type: Type.NUMBER },
                value: { type: Type.NUMBER },
                utility: { type: Type.NUMBER }
              }
            },
            nutritionalFacts: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.STRING },
                macros: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.STRING }
                    }
                  }
                },
                healthBenefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                healthWarnings: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  servings: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            pairings: { type: Type.ARRAY, items: { type: Type.STRING } },
            sentiment: {
              type: Type.OBJECT,
              properties: {
                positive: { type: Type.NUMBER },
                neutral: { type: Type.NUMBER },
                negative: { type: Type.NUMBER },
                averageRating: { type: Type.NUMBER },
                totalReviewsAnalyzed: { type: Type.INTEGER },
                history: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { date: { type: Type.STRING }, positive: { type: Type.NUMBER }, neutral: { type: Type.NUMBER }, negative: { type: Type.NUMBER }, netScore: { type: Type.NUMBER } } } }
              }
            },
            topRelevantReviews: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  user: { type: Type.STRING }, 
                  text: { type: Type.STRING }, 
                  score: { type: Type.NUMBER }, 
                  date: { type: Type.STRING }, 
                  source: { type: Type.STRING }, 
                  sourceUrl: { type: Type.STRING } 
                } 
              } 
            },
            topPositiveReviews: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { user: { type: Type.STRING }, text: { type: Type.STRING }, score: { type: Type.NUMBER }, source: { type: Type.STRING } } } },
            topNegativeReviews: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { user: { type: Type.STRING }, text: { type: Type.STRING }, score: { type: Type.NUMBER }, source: { type: Type.STRING } } } },
            influencerReviews: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, platform: { type: Type.STRING }, content: { type: Type.STRING }, trustScore: { type: Type.NUMBER } } } },
            videoReviews: { type: Type.ARRAY, items: { type: Type.STRING } },
            specifications: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING } } } },
            similarProducts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, imageUrl: { type: Type.STRING }, priceEstimate: { type: Type.STRING }, styleCategory: { type: Type.STRING } } } },
            brandScore: { type: Type.NUMBER }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    if (!parsed.name) return null;
    return parsed as ProductInsight;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return null;
  }
}

export async function fetchBrandInsight(query: string): Promise<BrandInsight | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Quick Brand Pulse Audit for: "${query}". Return data in JSON format.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            industry: { type: Type.STRING },
            description: { type: Type.STRING },
            marketTrustScore: { type: Type.NUMBER },
            productCatalog: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, category: { type: Type.STRING }, trustPulse: { type: Type.NUMBER } } } },
            webMentions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { user: { type: Type.STRING }, text: { type: Type.STRING }, source: { type: Type.STRING } } } }
          }
        }
      }
    });
    return JSON.parse(response.text || "{}") as BrandInsight;
  } catch {
    return null;
  }
}

export async function generateBusinessAsset(prompt: string, assetType: 'logo' | 'card'): Promise<string | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Generate a professional ${assetType}: ${prompt}` }] }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function startPulseChat(): Chat {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are TrustPulse AI, a world-class senior market and nutrition analyst.',
    },
  });
}

export async function searchInfluencers(query: string): Promise<InfluencerProfile[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Identify top 5 influencers or food bloggers for category: "${query}".`,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]") as InfluencerProfile[];
  } catch {
    return [];
  }
}

export async function virtualTryOn(base64Image: string, prompt: string, mode: 'personal' | 'space'): Promise<string | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: `Virtual try-on for: ${prompt}. Mode: ${mode}.` },
        ],
      },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch {
    return null;
  }
}

export async function estimateMeasurement(base64Image: string, target: string): Promise<string> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: `Estimate dimensions for ${target}.` },
        ],
      },
    });
    return response.text || "Analysis inconclusive.";
  } catch {
    return "Scan failed.";
  }
}

export async function fetchLocalServices(query: string): Promise<BusinessListing[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find local businesses or services for: "${query}".`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              businessName: { type: Type.STRING },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              slogan: { type: Type.STRING },
              location: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              isVerified: { type: Type.BOOLEAN },
              image: { type: Type.STRING }
            },
            required: ["id", "businessName", "category", "description", "location", "rating", "isVerified", "image"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]") as BusinessListing[];
  } catch {
    return [];
  }
}

export async function fetchBusinessReputation(businessName: string): Promise<SocialComment[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find recent reviews and reputation data for "${businessName}".`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              user: { type: Type.STRING },
              text: { type: Type.STRING }, 
              score: { type: Type.NUMBER },
              date: { type: Type.STRING },
              source: { type: Type.STRING }
            },
            required: ["user", "text", "score", "date", "source"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]") as SocialComment[];
  } catch {
    return [];
  }
}

export async function findCollabMatches(query: string, targetType: 'influencers' | 'brands'): Promise<any[]> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find potential collaboration matches for: "${query}". Target Type: ${targetType}.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              reach: { type: Type.STRING },
              description: { type: Type.STRING },
              matchedPulse: { type: Type.NUMBER },
              email: { type: Type.STRING }
            },
            required: ["id", "name", "category", "reach", "description", "matchedPulse", "email"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch {
    return [];
  }
}
