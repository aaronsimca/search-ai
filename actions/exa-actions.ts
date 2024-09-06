'use server'

import Exa from "exa-js";

export async function searchExaAndGetContents(query: string) {
  const apiKey = process.env.EXA_API_KEY;
  
  if (!apiKey) {
    throw new Error("EXA_API_KEY is not set in the environment variables");
  }

  const exa = new Exa(apiKey);

  const result = await exa.searchAndContents(query, {
    type: "neural",
    useAutoprompt: true,
    numResults: 10,
    text: true
  });

  return result;
}

