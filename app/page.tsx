'use client'
import { useState } from "react";
import { searchExaAndGetContents } from "../actions/exa-actions";

interface SearchResult {
  author: string;
  id: string;
  publishedDate: string;
  score: number;
  text: string;
  title: string;
  url: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [aiAnswer, setAIAnswer] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchResults([]);
    setAIAnswer("");
    try {
      const results = await searchExaAndGetContents(searchQuery);
      console.log("Exa search results:", results);
      
      if (results && results.results) {
        const topResults = results.results
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, 5);
        setSearchResults(topResults as SearchResult[]);
        
        // Longer placeholder for AI-generated answer
        setAIAnswer("This is a placeholder for the AI-generated answer. In a real implementation, you would process the search results and generate a comprehensive answer using an AI model. The answer would typically be several sentences long, providing a detailed summary of the information found in the search results. It might include key points, relevant facts, and a synthesis of the most important information related to the user's query. The AI would aim to provide a clear, concise, yet thorough response to the user's search query based on the content of the top search results.");
      }
    } catch (error) {
      console.error("Error performing search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '2rem 1rem' }}>
      <main style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', width: '100%', maxWidth: '40rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid #000000',
                borderRight: 'none',
                outline: 'none',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: '#000000'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#000000',
                color: 'white',
                fontWeight: 'bold',
                border: '1px solid #000000',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#000000' }}>Sources:</h2>
            <div style={{ overflowX: 'auto', padding: '0.5rem' }}>
              <ul style={{ display: 'flex', gap: '1rem', paddingBottom: '0.5rem' }}>
                {searchResults.map((result) => (
                  <li key={result.id} style={{ flexShrink: 0, width: '18rem' }}>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        padding: '1rem',
                        border: '1px solid #000000',
                        backgroundColor: 'white',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000000' }}>{result.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#000000' }}>{result.text.slice(0, 100)}...</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {aiAnswer && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#000000' }}>AI-Generated Answer:</h2>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #000000' }}>
              <p style={{ color: '#000000', lineHeight: '1.5' }}>{aiAnswer}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
