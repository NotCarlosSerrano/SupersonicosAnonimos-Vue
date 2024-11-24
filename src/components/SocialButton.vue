<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

defineProps({
  socialUrl: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const buttonIconSize = computed(() => {
  return mobile.value ? 20 : 28;
});

const buttonSize = computed(() => {
  return mobile.value ? 40 : 48;
});

</script>

<template>
  <v-btn
    :size="buttonSize"
    :icon="icon"
    :href="socialUrl"
    target="_blank"
  >
    <v-icon
      :size="buttonIconSize"
    />
  </v-btn>
</template>