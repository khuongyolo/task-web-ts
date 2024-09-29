import { type GetDataAPIResponse } from '@/types/data-table';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataTableStore = defineStore('data-table', () => {
  const posts = ref<GetDataAPIResponse[]>([]);
  const GetData = async () => {
    try {
      const { data } = await axios.get<{ data: GetDataAPIResponse[] }>(
        'https://api.goro.fun/api/index'
      );
      posts.value = data.data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const addPost = (newPost: GetDataAPIResponse) => {
    posts.value = [...posts.value, newPost];
  };

  return {
    GetData,
    posts,
    addPost
  };
});
