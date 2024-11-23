<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useDisplay, useTheme } from "vuetify";

const { xs } = useDisplay();
const theme = useTheme();

const search = ref("");
const order = ref("desc");
const itemsPerPage = 0;

const windowHeight = ref(window.innerHeight);

const colors = reactive({
  youtube: '#C4302B',
  spotify: '#1DB954',
})

const selectedSeason = ref({
  title: 'Todas',
  value: 'all',
});

const seasons = ref([
  {
    title: 'Todas',
    value: 'all',
  },
  {
    title: 'Temporada 2',
    value: 'season2',
    color: 'secondary',
  },
  {
    title: 'Temporada 1',
    value: 'season1',
    color: 'indigo',
  },
])

const youtubeUrl = "https://www.youtube.com/@SupersonicosAnonimos";
const spotifyUrl = "https://open.spotify.com/show/76NUU3guvpmVDpOXD8NwPL";
const instagramUrl = "https://www.instagram.com/supersonicosanonimos/";
const tiktokUrl = "https://www.tiktok.com/@supersonicosanonimos";
const xURL = "https://x.com/Supersonicos_A"

const links = ref([
  {
    youtubeVideoId: "Z_sFJ3slwtw",
    spotifyEpisodeId: "4QV3C42b2XIq10bul74mUt",
    title: "Capítulo 1: El del avión secreto del Pentágono",
    duration: "1:02:49",
    season: "season1",
  },
  {
    youtubeVideoId: "Jvfh1x_swMU",
    spotifyEpisodeId: "1WvXsr1mXcLaRyfhHmp7Z0",
    title: "Capítulo 2: El del accidente de avión en Tokio",
    duration: "1:00:00",
    season: "season1",
  },
  {
    youtubeVideoId: "nQXIoMZYL6I",
    spotifyEpisodeId: "5El1qkDUMKYZ8XWhdtgtTS",
    title: "Capítulo 3: El de la semana loca aeroespacial",
    duration: "1:02:16",
    season: "season1",
  },
  {
    youtubeVideoId: "0T00ZwqYROo",
    spotifyEpisodeId: "31baGasmGDzZCncCSzdPSp",
    title: "Capítulo 4: El de responder (o no) a un mensaje extraterrestre",
    subtitle: "Jorge Nicolás-Álvarez",
    subtitleUrl: "https://x.com/fugastronautica",
    duration: "58:56",
    season: "season1",
  },
  {
    youtubeVideoId: "ryHUipXzWgw",
    spotifyEpisodeId: "0JWlbjo8A6f2VdU074N5kP",
    title: "Capitulo 5: El del adiós a Ingenuity y el hola a SLIM",
    duration: "1:06:26",
    season: "season1",
  },
  {
    youtubeVideoId: "tEOq5ZmWyIU",
    spotifyEpisodeId: "0VFjD4fPj5LzhNaBFrtfbj",
    title: "Capitulo 6: Se calienta la cosa en Starbase",
    duration: "1:20:29",
    season: "season1",
  },
  {
    youtubeVideoId: "RFrEBZcAx8c",
    spotifyEpisodeId: "0VFjD4fPj5LzhNaBFrtfbj",
    title: "Capítulo 7: Starship, Donald Trump y astrofísica",
    subtitle: "Doctor Fisión",
    subtitleUrl: "https://x.com/doctorfision",
    duration: "57:30",
    season: "season1",
  },
  {
    youtubeVideoId: "csrMZAsCEq8",
    spotifyEpisodeId: "19tVoa1XmtQmDOggxtPakX",
    title: "Capitulo 8: Los proyectos MÁS LOCOS de la exploración espacial",
    subtitle: "Daniel Marín",
    subtitleUrl: "https://x.com/Eurekablog",
    duration: "1:24:34",
    season: "season1",
  },
  {
    youtubeVideoId: "yQbFgZGb-dA",
    spotifyEpisodeId: "38b2uBuIezH3zBaPE0BkOo",
    title: "Capitulo 9: Starship, vuelos supersónicos y la vuelta a la Luna",
    duration: "1:02:19",
    season: "season1",
  },
  {
    youtubeVideoId: "bi3wnk2Y2lY",
    spotifyEpisodeId: "4XTWNY8nGG9PhvU1bYoixJ",
    title: "Capitulo 10: Te subirías en el Primer Starship Tripulado?",
    duration: "1:07:15",
    season: "season1",
  },
  {
    youtubeVideoId: "BBdS1Lw5594",
    spotifyEpisodeId: "6biXe5l5oajB7r6DUuXHIl",
    title: "Capitulo 11: Especial Lanzamiento de Starship IFT-3",
    duration: "1:12:36",
    season: "season1",
  },
  {
    youtubeVideoId: "fD_shwAgbNs",
    spotifyEpisodeId: "00NDesaKCqvij14AY0ccZa",
    title: "Capitulo 12: ¿Éxito o fracaso de Starship?",
    duration: "1:15:24",
    season: "season1",
  },
  {
    youtubeVideoId: "Gv7lAuLBteQ",
    spotifyEpisodeId: "73WmAI6Vv8or5RUAxYNmDQ",
    title: "Capítulo 13: Cómo escapar de un cohete Soyuz en llamas",
    duration: "56:25",
    season: "season1",
  },
  {
    youtubeVideoId: "y7Mql3KrzDA",
    spotifyEpisodeId: "3FggKAGkuhMA0Olrbjy5Pj",
    title: "Capítulo 14: La Pólvora Negra y la búsqueda de la inmortalidad",
    duration: "1:33:32",
    season: "season1",
  },
  {
    youtubeVideoId: "W3E_llroUIY",
    spotifyEpisodeId: "30XlPDvkZvyaz7RUcXbzDQ",
    title: "Capítulo 15: Desmontando Terraplanistas",
    duration: "1:19:47",
    season: "season1",
  },
  {
    youtubeVideoId: "UAuShXH3FIA",
    title: "Capítulo 16: El Problema de la Voyager 1 y los Misiles de Irán",
    spotifyEpisodeId: "3eSqLNbEdFYfjwoi8snUdW",
    duration: "1:00:13",
    season: "season1",
  },
  {
    youtubeVideoId: "oJUjim6CkG4",
    spotifyEpisodeId: "3cRj6O8libzCtD9VAORNPQ",
    title: "Capítulo 17: Josep sobrevive a un B-737 Max SIN SABERLO",
    duration: "1:16:26",
    season: "season1",
  },
  {
    youtubeVideoId: "p_NfDTViF6c",
    spotifyEpisodeId: "0xFPfJwipJts9YvS0qtG7W",
    title: "Capítulo 18: SpaceX presenta sus nuevos trajes y BOEING lo vuelve a hacer",
    duration: "1:12:37",
    season: "season1",
  },
  {
    youtubeVideoId: "ulvrg1aVn-Y",
    spotifyEpisodeId: "2WIwMfdowjBIudeFoxH8Cy",
    title: "Capítulo 19: Las nuevas mejoras de Starship y las Auroras Boreales",
    duration: "1:07:43",
    season: "season1",
  },
  {
    youtubeVideoId: "IVGhTgKPGmo",
    spotifyEpisodeId: "3npdmYf4RhGImJ8ntYfqyT",
    title: "Consejos para Estudiantes y Carreras de Ciencias (y no tan ciencias)",
    duration: "2:00:38",
    season: "season1",
  },
  {
    youtubeVideoId: "e5vksFewaAQ",
    spotifyEpisodeId: "3hcIkhexVesJJd3cFZQ7fJ",
    title: "Capítulo 21: TODO lo que tienes que saber para el 4º Vuelo de Starship",
    duration: "54:32",
    season: "season1",
  },
  {
    youtubeVideoId: "swh61M_Ibxg",
    spotifyEpisodeId: "4L7ViINVlsEo532Twctbsh",
    title: "Capítulo 22: La locura de Starship y las nuevas informaciones de Elon Musk",
    duration: "1:07:06",
    season: "season1",
  },
  { 
    youtubeVideoId: "9QfMmn4aDnI", 
    spotifyEpisodeId: null,
    title: "Capítulo 23 / El definitivo",
    duration: "1:05:11",
    season: "season1",
  },
  {
    youtubeVideoId: "kGns4HEGlms", 
    spotifyEpisodeId: "1H8Ie7HExaSb7PIStCZ3Jj",
    title: "Capítulo 24 | HEMOS VUELTO",
    duration: "1:13:46",
    season: "season2",
  },
  {
    youtubeVideoId: "3QjDWMQehxg", 
    spotifyEpisodeId: "0KAmuZqkppMCtF2mAMqymm",
    title: "Capítulo 25 | La casi catástrofe aérea del avión de Josep",
    duration: "1:01:39",
    season: "season2",
  },
  {
    youtubeVideoId: "noggJKf9Mcc", 
    spotifyEpisodeId: "54wDQsNuD750OuSBo5tih4",
    title: "Capítulo 26 | PLD nos cuenta en EXCLUSIVA sus proyectos!",
    duration: "1:10:00",
    season: "season2",
  },
  {
    youtubeVideoId: "Ls-Om2iJtuc", 
    spotifyEpisodeId: "3HuXj8LwDdS87ObGFOOdAM",
    title: "Capítulo 27 | Histórico, Spacex atrapa un cohete gigantesco en el aire",
    duration: "1:05:10",
    season: "season2",
  },
  {
    youtubeVideoId: "ydmEKfvZD0I", 
    spotifyEpisodeId: "5naUvSnQYqNDM3mYsJvnNe",
    title: "Capítulo 28 | La NASA cerca de encontrar vida Extraterrestre",
    duration: "1:10:22",
    season: "season2",
  },
  {
    youtubeVideoId: "FPOSHUULFHY", 
    spotifyEpisodeId: "1WT6YyylKT2xW2iIDTOrRp",
    title: "Capítulo 29 | SpaceX secuestró focas para experimentar con ellas (Confirmado)",
    duration: "1:13:06",
    season: "season2",
  },
  {
    youtubeVideoId: "CzxeHx6CX8I", 
    spotifyEpisodeId: "1MeHJBMrsuCkZuRpQV9ELi",
    xVideoUrl: "https://x.com/Supersonicos_A/status/1853896253438128268",
    title: "Capítulo 30 | El Avión aniquilador Soviético y la Starship Lunar",
    duration: "1:21:25",
    season: "season2",
  },
  {
    youtubeVideoId: "jDV6tKZgx0g", 
    spotifyEpisodeId: "3DNEgoqzqsHLZ5CNwvIWIG",
    xVideoUrl: "https://x.com/Supersonicos_A/status/1856419635928723809",
    title: "Capítulo 31 | Los planes de Elon Trump para ganar a China + Otro Lanzamiento Starship",
    duration: "1:20:05",
    season: "season2",
  },
  {
    youtubeVideoId: "09DgU-zmKc4", 
    spotifyEpisodeId: "4m1ppPlMCsFPqKZBZKQ4o0",
    xVideoUrl: "https://x.com/Supersonicos_A/status/1857911419066310824",
    title: "Capítulo 32 | Elon Musk acabará con el SLS + Noticias de Starship",
    duration: "1:23:59",
    season: "season2",
  },
]);

const getThumbnail = (youtubeVideoId: string) => {
  return `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
};

const getYoutubeUrl = (youtubeVideoId: string) => {
  return `https://www.youtube.com/watch?v=${youtubeVideoId}`;
};

const getSpotifyUrl = (spotifyEpisodeId: string | null) => {
  return `https://open.spotify.com/episode/${spotifyEpisodeId}`;
};

const orderedLinks = computed(() => {
  if (order.value === "asc") {
    return links.value;
  } else {
    const copy = [...links.value];
    return copy.reverse();
  }
});

const dataIteratorPage = ref();

function changeOrder() {
  order.value = order.value === "asc" ? "desc" : "asc";
  dataIteratorPage.value = 1; 
}

const getItemsBySeason = computed(() => {
  return orderedLinks.value.filter((link) => {
    if (selectedSeason.value.value === "all") {
      return true;
    }
    return link.season === selectedSeason.value.value;
  });
});

const getSeasonTitle = (season: string) => {
  return seasons.value.find((s) => s.value === season)?.title;
};

const getSeasonColor = (season: string) => {
  return seasons.value.find((s) => s.value === season)?.color;
};

const height = computed(() => {
  const toolbarHeight = 64;
  const containerPadding = !xs.value ? 32 : 0;
  const borderMaring = 2;

  return windowHeight.value - toolbarHeight - containerPadding - borderMaring;
});

function handleResize() {
  windowHeight.value = window.innerHeight;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>

<template>
  <v-container
    fluid
    :class="xs ? 'pa-0' : ''"
  >
    <v-data-iterator
      v-model:page="dataIteratorPage"
      :items="getItemsBySeason" 
      :items-per-page="itemsPerPage"
      :search="search"
      class="border"
      :style="xs ? '' : 'border-top-left-radius: 9px;border-top-right-radius: 9px;'"
      :filter-keys="['title', 'subtitle']"
    >
      <template #header>
        <v-toolbar
          class="px-2"
          :class="{
            'rounded-t-lg': !xs,
          }"
        >
          <v-select
            v-if="!xs"
            v-model="selectedSeason"
            label="Temporadas"
            :items="seasons"
            density="comfortable"
            hide-details
            max-width="200px"
            variant="solo"
            class="mr-2"
            menu-icon="mdi-menu-down"
            return-object
          />
          <v-text-field
            v-model="search"
            :density="xs ? 'compact' : 'comfortable'"
            prepend-inner-icon="mdi-magnify"
            placeholder="Buscar"
            variant="solo"
            clearable
            hide-details
            clear-icon="mdi-close-circle"
            class="mr-1 px-1"
          />
          <!-- Order button -->
          <v-btn
            v-if="!xs"
            :text="order === 'asc' ? 'Más antiguos' : 'Más recientes'"
            @click="changeOrder"
          />
          <v-btn
            v-else
            :size="40"
            :icon="order === 'asc' ? 'fa:fas fa-arrow-down-1-9' : 'fa:fas fa-arrow-up-1-9'"
            :text="order === 'asc' ? 'Más antiguos' : 'Más recientes'"
            @click="changeOrder"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
          <v-spacer />
          <v-btn
            :size="xs ? 40 : 48"
            icon="fa:fab fa-x-twitter"
            :href="xURL"
            target="_blank"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
          <v-btn
            :size="xs ? 40 : 48"
            icon="fa:fab fa-spotify"
            :href="spotifyUrl"
            target="_blank"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
          <v-btn
            :size="xs ? 40 : 48"
            icon="fa:fab fa-youtube"
            :href="youtubeUrl"
            target="_blank"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
          <v-btn
            :size="xs ? 40 : 48"
            icon="fa:fab fa-instagram"
            :href="instagramUrl"
            target="_blank"
            class="gradient"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
          <v-btn
            :size="xs ? 40 : 48"
            icon="fa:fab fa-tiktok"
            :href="tiktokUrl"
            target="_blank"
          >
            <v-icon
              :size="xs ? 20 : 28"
            />
          </v-btn>
        </v-toolbar>
      </template>

      <template #default="{ items }">
        <v-container
          :style="{
            height: `${height}px`,
            overflow: 'auto',
          }"
          class="pa-1"
          fluid
        >
          <v-row
            dense
          >
            <v-col
              v-for="(item, index) in items"
              :key="index"
              cols="12"
              sm="12"
              md="6"
              lg="3"
              xl="2"
            >
              <v-card
                class="pb-1 rounded-xl"
                border
                flat
              >
                <v-img
                  :src="getThumbnail(item.raw.youtubeVideoId)"
                >
                  <template
                    #default
                  >
                    <v-chip
                      v-if="selectedSeason.value === 'all'"
                      class="ma-2"
                      :color="getSeasonColor(item.raw.season)"
                      variant="flat"
                      :text="getSeasonTitle(item.raw.season)"
                      style="user-select: none;"
                    />
                  </template>
                </v-img>

                <v-list-item>
                  <template #subtitle>
                    <div class="text-caption">
                      Con
                      <a
                        :href="item.raw.subtitleUrl"
                        target="_blank"
                      >{{ item.raw.subtitle }}</a>
                      <span>
                        {{ 
                          item.raw.subtitle ? ', ' : ''
                        }}
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
                        text: item.raw.title,
                        openOnHover: true,
                        location: 'bottom',
                        openDelay: 250,
                      }"
                      class="text-subtitle-2"
                    >
                      {{ item.raw.title }}
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
                      {{ item.raw.duration }}
                    </div>
                  </div>

                  <div>
                    <v-btn
                      :disabled="!item.raw.youtubeVideoId"
                      icon="fa:fab fa-youtube"
                      :href="getYoutubeUrl(item.raw.youtubeVideoId)"
                      target="_blank"
                      class="mr-1"
                      variant="text"
                      :color="theme.current.value.dark ? undefined : colors.youtube"
                    />
                    <v-btn
                      :disabled="!item.raw.spotifyEpisodeId"
                      icon="fa:fab fa-spotify"
                      :href="getSpotifyUrl(item.raw.spotifyEpisodeId)"
                      target="_blank"
                      class="mr-1"
                      variant="text"
                      :color="theme.current.value.dark ? undefined : colors.spotify"
                    />
                    <v-btn
                      :disabled="!item.raw.xVideoUrl"
                      icon="fa:fab fa-x-twitter"
                      :href="item.raw.xVideoUrl"
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
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template
        #footer="{ page, pageCount, prevPage, nextPage }"
      >
        <div
          v-if="itemsPerPage > 0"
          class="d-flex align-center justify-center pa-4"
        >
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          />

          <div class="mx-2 text-caption">
            Página {{ page }} de {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          />
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>
