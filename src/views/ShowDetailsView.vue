<template>
  <section class="pagecolor">
    <q-btn to="/" flat color="primary" icon="arrow_back" label="Home" />

    <div v-if="isLoading">
      <q-circular-progress indeterminate rounded size="50px" class="q-ma-md" />
    </div>

    <template v-else-if="show">
      <h1 class="text-h4">{{ show.name }}</h1>
      <ShowPoster :src="show.image?.medium" :name="show.name" />
      <p v-html="show.summary" />

      <h2 class="text-h6">Genre</h2>
      <q-badge
        v-for="genre in show.genres"
        :key="genre"
        :label="genre"
        class="q-mr-sm"
      />

      <h2 class="text-h6">Rating</h2>
      <span>{{ show.rating.average }}</span>
    </template>
  </section>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ShowPoster from '@/components/ShowPoster.vue';
import type { Show } from '@/api/models';
import { fetchSingleShow } from '@/api/fetchAndSearchShows';

const route = useRoute();
const id = route.params.id as unknown as number;
const show = ref<Show | null>(null);
const isLoading = ref(false);

const loadShow = async () => {
  isLoading.value = true;
  try {
    show.value = await fetchSingleShow(id);
  } catch (e) {
    const err = e as Error;

    console.error(err.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  loadShow();
});
</script>

<style lang="scss" scoped>

.pagecolor{
  background-color: var(--color-pink);
}
</style>
