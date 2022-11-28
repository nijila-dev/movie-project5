import { shallowMount } from '@vue/test-utils';
import SearchResults from '../SearchResults.vue';

describe('SearchResults', () => {
  it('renders properly without shows', () => {
    const wrapper = shallowMount(SearchResults, {
      props: {
        shows: [],  
        isLoading: false,
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.text()).toContain('No shows matching the search criteria');
  });
});
