<template>
  <section class="shows">
    <template v-if="shows.length > 0">
      <ul class="shows__list">
        <li class="shows__list-item" v-for="show in shows" :key="show.id">
          <RouterLink :to="`${Routes.show}/${show.id}`">
            <ShowPoster :src="show.image?.medium" :name="show.name" />
          </RouterLink>
        </li>
      </ul>
    </template>

    <p v-else>No shows matching the search criteria</p>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ShowPoster from '@/components/ShowPoster.vue';
import type { Show } from '@/api/models';
import { Routes } from '@/constants/routes.constant';

withDefaults(
  defineProps<{
    shows: Show[];
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);
</script>

<style lang="scss" scoped>
.shows {
  &__list {
    list-style-type: none;

    &-item {
      display: inline-block;
    }
  }
}
</style>
