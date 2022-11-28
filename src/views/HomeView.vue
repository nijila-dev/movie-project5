<template>
  <section>
    <q-input
      type="text"
      v-model="search"
      placeholder="What are you looking for?"
      debounce="250"
      @update:model-value="(search) => showSearchStore.searchShows(search as string)"
    >
      <template v-slot:append>
        <q-icon
          v-if="search"
          name="clear"
          @click="search = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <SearchResults
      v-if="search.length > 0"
      :shows="showSearchStore.searchResults"
      :is-loading="showSearchStore.isLoading"
    />

    <DisplayShows
      v-else
      v-for="genre in showsStore.genres"
      :key="genre"
      :title="genre"
      :shows="showsStore.showsByGenre(genre)"
      :can-load-more="showsStore.hasMoreShows"
      :is-loading="showsStore.isLoading"
      @load-more="showsStore.loadMoreShows"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showStore, searchStore } from '@/store/showList';
import DisplayShows from '../components/DisplayShows.vue';
import SearchResults from '../components/SearchResults.vue';

const search = ref<string>('');
const showSearchStore = searchStore();
const showsStore = showStore();

onMounted(async () => {
  if (!showsStore.shows.length) {
    showsStore.loadMoreShows();
  }
});
</script>

