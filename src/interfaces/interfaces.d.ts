interface Episode {
  youtubeVideoId: string;
  spotifyEpisodeId: string | null;
  title: string;
  duration: string;
  season: string;
  subtitle?: string;
  subtitleUrl?: string;
  xVideoUrl?: string;
}

interface Season {
  title: string;
  value: string;
  color?: string;
}

interface Social {
  icon: string;
  url: string;
}

export { Episode, Season, Social };