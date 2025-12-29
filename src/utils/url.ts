const youtubeHostnames = [
  'www.youtube.com',
  'youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtube-nocookie.com',
];

const youtubeProtocols = [
  'http:',
  'https:',
];

function isYoutubeURL(urlString: string) {
  try {
    const url = new URL(urlString);

    if (!youtubeProtocols.includes(url.protocol)) return false;
    if (!youtubeHostnames.includes(url.hostname)) return false;

    return true;
  }
  catch {
    return false;
  }
}

const youtubeIdRegex = /(?:v=|\/v\/|\/embed\/|\/shorts\/|\/live\/|youtu\.be\/|\/e\/|watch\/|u\/\w+\/|attribution_link\?.*v%3D|watch\?.*v%3D|&v=)([a-zA-Z0-9_-]{11})(?![a-zA-Z0-9_-])/;

export function getVideoIdFromYoutubeURL(url: string) {
  if (!isYoutubeURL(url)) return null;

  const match = url.match(youtubeIdRegex);
  if (!match) return null;

  const id = match[1];
  if (!id || id.length !== 11) return null;

  return id;
}
