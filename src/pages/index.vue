<script lang="ts" setup>
import { computed, ref } from 'vue';
import EpisodeCard from '@/components/EpisodeCard.vue';
import type { Episode, Season, Social } from '@/interfaces/interfaces';
import { useDisplay } from 'vuetify';
import socials from '@/data/socials';
import episodes from '@/data/episodes';
import seasons from '@/data/seasons';

const { mobile, smAndDown, xs } = useDisplay();

const showMore = ref<boolean>(false);

const recentEpisodes = ref<Episode[]>([...episodes].slice(-3).reverse());

const selectedSeason = ref<Season>({
  title: 'Todas',
  value: 'all',
  color: 'primary',
});

const availableSeasons = ref<Season[]>([...seasons]);

const title = ref<string>('Supersónicos Anónimos');

const subtitle = ref<string>('By NotCarlosSerrano');

const description = ref<string>(
  'SuperSónicos Anónimos es el podcast de divulgación aeroespacial liderado por los creadores de contenido Sergio Hidalgo (<a href="https://x.com/SergioHidalAERO" target="_blank">@SergioHidalgoAero</a>) y Josep Calatayud (<a href="https://x.com/ControlMision" target="_blank">@ControldeMisión</a>), conocidos por sus canales líderes en el sector, se unen para llevar a los oyentes a un viaje a través del cielo y el espacio, hablando de manera clara y amena. En SuperSónicos Anónimos, la complejidad de la tecnología aeroespacial se traduce en historias cautivadoras que cualquiera, desde el apasionado entusiasta hasta el recién llegado, puede disfrutar y maravillarse.'
);

const socialsLinks = ref<Social[]>([...socials]);

const getLastEpisodes = computed(() => {
  if (xs.value) {
    return recentEpisodes.value.slice(0, 1);
  } else if (smAndDown.value) {
    return recentEpisodes.value.slice(0, 2);
  } else {
    return recentEpisodes.value;
  }
});
</script>

<template>
  <v-container>
    <v-row
      justify-lg="center"
    >
      <v-col
        cols="12"
        sm="12"
        lg="4"
        xl="3"
        align="center"
      >
        <v-img
          src="/src/assets/logo.jpg"
          max-width="344"
          class="rounded-lg"
          :width="mobile ? 200 : 344"
          alt="Podcast logo"
        />
      </v-col>
      <v-col
        :class="mobile ? 'pt-0' : undefined"
        cols="12"
        sm="12"
        lg="6"
        xl="4"
      >
        <v-card
          height="100%"
          class="d-flex flex-column justify-space-between"
          elevation="0"
        >
          <v-card-title
            :class="{
              'text-h5': mobile,
              'text-h4': !mobile,
            }"
          >
            {{ title }}
          </v-card-title>

          <v-card-subtitle>
            {{ subtitle }}
          </v-card-subtitle>

          <v-card-text>
            <p v-if="smAndDown && !showMore">
              <!-- eslint-disable vue/no-v-html -->
              <span
                v-html="description.slice(0, 309) + '...'"
              />
              <v-btn
                text="Leer más"
                variant="text"
                size="small"
                class="text-none"
                @click="showMore = true"
              />
            </p>
            <p v-else-if="smAndDown && showMore">
              <span
                v-html="description"
              />
            </p>
            <p v-else>
              <span
                v-html="description"
              />
            </p>
          </v-card-text>
          
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <SocialButton
              v-for="(social, index) in socialsLinks"
              :key="index"
              :icon="social.icon"
              :social-url="social.url"
            />
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col
        :class="mobile ? 'pt-0' : undefined"
        cols="12"
        lg="10"
        xl="8"
      >
        <v-card
          elevation="0"
        >
          <v-card-title>
            {{ xs ? 'Último episodio' : 'Últimos episodios' }}
          </v-card-title>
          <v-card-text
            class="py-0"
          >
            <v-row dense>
              <v-col
                v-for="(episode, index) in getLastEpisodes"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="4"
              >
                <EpisodeCard
                  :episode="episode"
                  :selected-season="selectedSeason"
                  :seasons="availableSeasons"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text="Ver todos los episodios"
              href="/#/episodes"
              append-icon="mdi-arrow-right"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
