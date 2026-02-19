const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const UPLOAD_PLAYLIST_ID = "PASTE_UPLOAD_PLAYLIST_ID_HERE";

export const fetchYouTubeVideos = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${UPLOAD_PLAYLIST_ID}&part=snippet&maxResults=20`
    );

    if (!response.ok) {
      throw new Error(`YouTube API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.items) {
      throw new Error("Invalid API response structure");
    }

    return data.items;
  } catch (error) {
    console.error("YouTube Fetch Error:", error);
    return [];
  }
};
