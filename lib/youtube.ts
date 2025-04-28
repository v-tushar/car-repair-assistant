// src/lib/youtube.ts
export async function fetchYouTubeVideos(query: string) {
    const apiKey = "YOUR_GEMINI_API_KEY; // ✅ Your key
    const maxResults = 2;
  
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(query)}&part=snippet&type=video&maxResults=${maxResults}`;
  
    const response = await fetch(url);
  
    if (!response.ok) {
      console.error("Failed to fetch YouTube videos");
      return [];
    }
  
    const data = await response.json();
  
    if (!data.items) return [];
  
    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  }
  
