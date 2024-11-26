<script lang="ts" setup>
import EpisodeCard from "@/components/EpisodeCard.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDisplay } from "vuetify";
import type { Episode, Season, Social } from "@/interfaces/interfaces";
import episodes from "@/data/episodes";
import socials from "@/data/socials";
import seasons from "@/data/seasons";

const { mobile } = useDisplay();

const search = ref("");
const order = ref("desc");
const itemsPerPage = 0;

const windowHeight = ref(window.innerHeight);

const selectedSeason = ref<Season>({
  title: 'Todas',
  value: 'all',
  color: 'primary',
});

const availableSeasons = ref<Season[]>([...seasons]);

const socialsLinks = ref<Social[]>([...socials]);

const links = ref<Episode[]>([...episodes].reverse());

const dataIteratorPage = ref();

function changeOrder() {
  order.value = order.value === "asc" ? "desc" : "asc";
  dataIteratorPage.value = 1; 
  links.value.reverse();
}

const getItemsBySeason = computed(() => {
  if (selectedSeason.value.value === "all") {
    return links.value;
  }

  return links.value.filter((link) => {
    return link.season === selectedSeason.value.value;
  });
});

const height = computed(() => {
  const toolbarHeight = 64;
  const containerPadding = !mobile.value ? 32 : 0;
  const borderMaring = 2;
  const footer = 40;

  return windowHeight.value - toolbarHeight - containerPadding - borderMaring - footer;
});

const buttonIconSize = computed(() => {
  return mobile.value ? 20 : 28;
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
    :class="mobile ? 'pa-0' : ''"
  >
    <v-data-iterator
      v-model:page="dataIteratorPage"
      :items="getItemsBySeason" 
      :items-per-page="itemsPerPage"
      :search="search"
      class="border"
      :style="mobile ? '' : 'border-top-left-radius: 9px;border-top-right-radius: 9px;'"
      :filter-keys="['title', 'subtitle', 'episodeId']"
    >
      <template #header>
        <v-toolbar
          class="px-2"
          :class="{
            'rounded-t-lg': !mobile,
          }"
        >
          <v-select
            v-if="!mobile"
            v-model="selectedSeason"
            label="Temporadas"
            :items="availableSeasons"
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
            :density="mobile ? 'compact' : 'comfortable'"
            placeholder="Buscar"
            variant="solo"
            clearable
            hide-details
            max-width="300px"
            clear-icon="mdi-close-circle"
            class="mr-1 px-1"
          />
          <!-- Order button -->
          <v-btn
            v-if="!mobile"
            :text="order === 'asc' ? 'Más antiguos' : 'Más recientes'"
            @click="changeOrder"
          />
          <v-btn
            v-else
            :size="40"
            :icon="order === 'asc' ? 'fa:fas fa-arrow-down-1-9' : 'fa:fas fa-arrow-down-9-1'"
            @click="changeOrder"
          >
            <v-icon
              :size="buttonIconSize"
            />
          </v-btn>
          <v-spacer />
          <SocialButton
            v-for="(social, index) in socialsLinks"
            :key="index"
            :icon="social.icon"
            :social-url="social.url"
          />
        </v-toolbar>
      </template>

      <template #default="{ items }">
        <v-container
          :style="{
            height: `${height}px`,
          }"
          class="pa-1 overflow-y-auto"
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
              <EpisodeCard
                :episode="item.raw"
                :selected-season="selectedSeason"
                :seasons="availableSeasons"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #no-data>
        <v-empty-state
          :style="{
            height: `${height}px`,
          }"
          icon="mdi-magnify-remove-outline"
          title="No hay episodios"
          text="No se encontraron episodios con el filtro aplicado"
        />
      </template>
    </v-data-iterator>
    <v-footer>
      <span>
        Hecho con ❤️ por
        <a
          href="https://github.com/NotCarlosSerrano"
          target="_blank"
        >
          NotCarlosSerrano
        </a>
      </span>
    </v-footer>
  </v-container>
</template>
