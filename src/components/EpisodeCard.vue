<script setup lang="ts">
import { reactive } from 'vue';
import { useTheme } from 'vuetify';
import type { Episode, Season } from '@/interfaces/interfaces';

const theme = useTheme();

const props = defineProps({
  episode: {
    type: Object as () => Episode,
    required: true,
  },
  selectedSeason: {
    type: Object as () => Season,
    required: true,
  },
  seasons: {
    type: Array as () => Season[],
    required: true,
  },
});

const colors = reactive({
  youtube: '#C4302B',
  spotify: '#1DB954',
})

const getSeasonTitle = (season: string) => {
  return props.seasons.find((s) => s.value === season)?.title;
};

const getSeasonColor = (season: string) => {
  return props.seasons.find((s) => s.value === season)?.color;
};

const getThumbnail = (youtubeVideoId: string) => {
  if (!youtubeVideoId) {
    return '-';
  }
  return `https://img.youtube.com/vi_webp/${youtubeVideoId}/maxresdefault.webp`;
};

const getYoutubeUrl = (youtubeVideoId: string) => {
  return `https://www.youtube.com/watch?v=${youtubeVideoId}`;
};

const getSpotifyUrl = (spotifyEpisodeId: string | null) => {
  return `https://open.spotify.com/episode/${spotifyEpisodeId}`;
};

const isNewEpisode = (releaseDate: Date) => {
  const today = new Date();
  const release = new Date(releaseDate);
  const fiveDaysAgo = new Date(today.setDate(today.getDate() - 5));

  return release > fiveDaysAgo;
};

</script>

<template>
  <v-card
    class="pb-1 rounded-xl"
    border
    flat
  >
    <v-img
      :aspect-ratio="16/9"
      :src="getThumbnail(episode.youtubeVideoId)"
      alt="Episode thumbnail"
    >
      <template
        #default
      >
        <v-chip
          v-if="selectedSeason.value === 'all'"
          class="ma-2 user-select-none"
          :color="getSeasonColor(episode.season)"
          variant="flat"
          :text="getSeasonTitle(episode.season)"
        />
        <v-chip
          v-if="episode.releaseDate && isNewEpisode(episode.releaseDate)"
          class="ma-1 position-absolute bottom-0 right-0 rounded-lg user-select-none"
          color="orange-darken-2"
          variant="flat"
          text="¡Nuevo episodio!"
        />
      </template>

      <template #error>
        <v-empty-state
          icon="mdi-image-broken"
          text="No se ha podido cargar la imagen"
        />
      </template>
    </v-img>

    <v-list-item>
      <template #subtitle>
        <div class="text-caption">
          Con
          <a
            v-if="episode.subtitle"
            :href="episode.subtitleUrl"
            target="_blank"
          >{{ episode.subtitle }}</a>
          <span
            v-if="episode.subtitle"
          >,
          </span>
          <a
            href="https://x.com/SergioHidalAERO"
            target="_blank"
          >Sergio</a>
          <span>
            y
          </span>
          <a
            href="https://x.com/ControlMision"
            target="_blank"
          >Josep</a>
        </div>
      </template>
      <template #title>
        <strong
          v-tooltip="{
            text: episode.title,
            openOnHover: true,
            location: 'bottom',
            openDelay: 250,
          }"
          class="text-subtitle-2"
        >
          {{ episode.title }}
        </strong>
      </template>
    </v-list-item>

    <div class="d-flex justify-space-between px-4">
      <div
        class="d-flex align-center text-caption text-medium-emphasis me-1"
      >
        <v-icon
          icon="mdi-clock"
          start
        />

        <div class="text-truncate">
          {{ episode.duration }}
        </div>
      </div>

      <div>
        <v-btn
          :disabled="!episode.youtubeVideoId"
          icon="fa:fab fa-youtube"
          :href="getYoutubeUrl(episode.youtubeVideoId)"
          target="_blank"
          class="mr-1"
          variant="text"
          :color="theme.current.value.dark ? undefined : colors.youtube"
        />
        <v-btn
          :disabled="!episode.spotifyEpisodeId"
          icon="fa:fab fa-spotify"
          :href="getSpotifyUrl(episode.spotifyEpisodeId)"
          target="_blank"
          class="mr-1"
          variant="text"
          :color="theme.current.value.dark ? undefined : colors.spotify"
        />
        <v-btn
          :disabled="!episode.xVideoUrl"
          icon="fa:fab fa-x-twitter"
          :href="episode.xVideoUrl"
          target="_blank"
          class="mr-1"
          variant="text"
        />
        <!-- <v-btn
          class="text-none"
          size="small"
          text="Read"
          border
          flat
          @click="() => {}"
        /> -->
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>