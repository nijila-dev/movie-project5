<template>
  <section class="shows">
    <h1 class="text-h6">{{ title }}</h1>

    <table class="shows__table">
      <tr class="shows__table-row">
        <th class="shows__table-header">Poster</th>
        <th class="shows__table-header">Title</th>
        <th class="shows__table-header">Genre</th>
        <th class="shows__table-header">Rating</th>
      </tr>
      <tr
        class="shows__table-row"
        v-for="show in paginatedShows"
        :key="show.id"
        @click="changeRoute(`${Routes.show}/${show.id}`)"
      >
        <td
          class="shows__table-col shows__table-col--small"
          data-column="Poster"
        >
          <ShowPoster :src="show.image?.medium" :name="show.name" />
        </td>
        <td class="shows__table-col" data-column="Title">
          {{ show.name }}
        </td>
        <td class="shows__table-col" data-column="Genre">
          <q-badge
            v-for="genre in show.genres"
            :key="genre"
            :label="genre"
            class="q-mr-sm"
          />
        </td>
        <td class="shows__table-col" data-column="Rating">
          {{ show.rating.average ? show.rating.average : '-' }}
        </td>
      </tr>
    </table>
    <div class="shows__pagination">
      <div @click.stop="setOffset(currentItem - itemsPerPage)">
        <q-icon
          class="shows__pagination-icon"
          data-test="prev-page"
          name="arrow_back"
          size="md"
        />
      </div>
      <div>
        <q-icon
          v-if="!isLoading"
          data-test="next-page"
          class="shows__pagination-icon"
          name="arrow_forward"
          size="md"
          @click.stop="
            () => {
              setOffset(currentItem + itemsPerPage);

              if (
                canLoadMore &&
                currentItem + itemsPerPage >= props.shows.length
              ) {
                $emit('load-more');
              }
            }
          "
        />
        <q-circular-progress indeterminate v-else />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ShowPoster from '@/components/ShowPoster.vue';
import type { Show } from '@/api/models';
import { Routes } from '@/constants/routes.constant';
import router from '@/router';

const props = withDefaults(
  defineProps<{
    title: string;
    shows: Show[];
    canLoadMore?: boolean;
    isLoading?: boolean;
  }>(),
  {
    canLoadMore: false,
    isLoading: false,
  }
);

const itemsPerPage = ref<number>(3);
const currentItem = ref<number>(0);

const paginatedShows = computed(() => {
  return props.shows.slice(
    currentItem.value,
    currentItem.value + itemsPerPage.value
  );
});

const setOffset = (offset: number): void => {
  if (offset < 0) {
    return;
  }
  if (offset > props.shows.length) {
    return;
  }

  currentItem.value = offset;
};

const changeRoute = (route: string): void => {
  router.push(route);
};
</script>



<style lang="scss" scoped>
.shows {
  @media (max-width: 767px) {
    overflow: auto;
  }
  &__table {
    width: 100%;
    border-collapse: collapse;

    @media (max-width: 767px) {
      min-width: 600px;
    }

    &-col,
    &-header {
      border: 1px solid var(--color-yellow);
      border-color: var(--color-yellow);
      padding: 8px;
    }

    &-row {
      cursor: pointer;

      &:nth-child(even) {
        background-color: var(--color-pink);
      }

      &:nth-child(odd) {
        background-color: var(--color-pink);
      }

      &:hover {
        background-color: var(--color-peach);
      }
    }

    &-header {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: var(--color-yellow);
    }

    &-col {
      height: 192px;

      &--small {
        width: 150px;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: end;
    margin-top: 10px;

    &-icon {
      cursor: pointer;
    }
  }
}
</style>
