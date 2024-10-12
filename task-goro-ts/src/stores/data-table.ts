import { type GetDataAPIResponse } from '@/types/data-table';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDataTableStore = defineStore('data-table', () => {
  const allPosts = ref<GetDataAPIResponse[]>([]);
  const searchResults = ref<GetDataAPIResponse[]>([]);
  const isSearchActive = ref(false);

  const posts = computed(() => isSearchActive.value ? searchResults.value : allPosts.value);

  const GetData = async () => {
    try {
      const { data } = await axios.get<{ data: GetDataAPIResponse[] }>('https://api.goro.fun/api/index?');
      allPosts.value = data.data;
      isSearchActive.value = false;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const addPost = (newPost: GetDataAPIResponse) => {
    allPosts.value = [...allPosts.value, newPost];
    if (isSearchActive.value) {
      searchResults.value = [...searchResults.value, newPost];
    }
  };

  const setSearchResults = (results: GetDataAPIResponse[]) => {
    searchResults.value = results;
    isSearchActive.value = true;
  };

  const clearSearch = () => {
    isSearchActive.value = false;
    searchResults.value = [];
  };

  return {
    GetData,
    posts,
    addPost,
    setSearchResults,
    clearSearch,
    isSearchActive
  };
});