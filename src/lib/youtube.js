const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

function getApiKey() {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!key) {
    console.warn('[youtube] VITE_YOUTUBE_API_KEY is not set.');
  }
  return key ?? '';
}

/**
 * Internal fetch helper — returns parsed JSON or null on failure.
 * @param {string} url
 * @returns {Promise<any|null>}
 */
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[youtube] HTTP ${response.status} fetching ${url}`);
      return null;
    }
    return await response.json();
  } catch (err) {
    console.error(`[youtube] Fetch error for ${url}:`, err);
    return null;
  }
}

/**
 * Fetches the latest videos from a YouTube channel.
 * @param {string} channelId - The YouTube channel ID.
 * @param {number} maxResults - Maximum number of results to return (default 3).
 * @returns {Promise<Array<{id: string, title: string, thumbnail: string, publishedAt: string, description: string}>|null>}
 */
export async function getLatestVideos(channelId, maxResults = 3) {
  const apiKey = getApiKey();
  if (!apiKey || !channelId) return null;

  const params = new URLSearchParams({
    part: 'snippet',
    channelId,
    maxResults: String(maxResults),
    order: 'date',
    type: 'video',
    key: apiKey,
  });

  const data = await safeFetch(`${YOUTUBE_API_BASE}/search?${params}`);
  if (!data?.items) return null;

  return data.items.map((item) => ({
    id: item.id?.videoId ?? '',
    title: item.snippet?.title ?? '',
    thumbnail:
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.medium?.url ??
      item.snippet?.thumbnails?.default?.url ??
      '',
    publishedAt: item.snippet?.publishedAt ?? '',
    description: item.snippet?.description ?? '',
  }));
}

/**
 * Fetches details for a single YouTube video by ID.
 * @param {string} videoId - The YouTube video ID.
 * @returns {Promise<{id: string, title: string, thumbnail: string, publishedAt: string, description: string, channelTitle: string, viewCount: string, likeCount: string}|null>}
 */
export async function getVideoById(videoId) {
  const apiKey = getApiKey();
  if (!apiKey || !videoId) return null;

  const params = new URLSearchParams({
    part: 'snippet,statistics',
    id: videoId,
    key: apiKey,
  });

  const data = await safeFetch(`${YOUTUBE_API_BASE}/videos?${params}`);
  if (!data?.items?.length) return null;

  const item = data.items[0];
  return {
    id: item.id ?? '',
    title: item.snippet?.title ?? '',
    thumbnail:
      item.snippet?.thumbnails?.maxres?.url ??
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.medium?.url ??
      '',
    publishedAt: item.snippet?.publishedAt ?? '',
    description: item.snippet?.description ?? '',
    channelTitle: item.snippet?.channelTitle ?? '',
    viewCount: item.statistics?.viewCount ?? '0',
    likeCount: item.statistics?.likeCount ?? '0',
  };
}
