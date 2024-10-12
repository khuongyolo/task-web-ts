<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useDataTableStore } from '../stores/data-table';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import type { GetDataAPIEntry, GetDataAPIResponse } from '../types/data-table';

const toast = useToast();
const store = useDataTableStore();
const router = useRouter();
const title = ref<string>('');
const content = ref<string>('');
const author = ref<string>('');

const searchRequestTitle = ref<string>('');
const searchRequestContent = ref<string>('');
const searchRequestAuthor = ref<string>('');


const openModal = (id: number) => {
  router.push(`/edit/${id}`);
};

// handle delete datas from datatable
const DeleteData = async (id: number): Promise<void> => {
  try {
    await axios.get(`https://api.goro.fun/api/delete/${id}`);
    await store.GetData();
    toast.add({
      severity: 'success',
      summary: 'Delete',
      detail: 'Deleted Successfully',
      life: 3000
    });
  } catch (error) {
    console.log('error: ', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Deleted Successfully',
      life: 3000
    });
  }
};

// handle adding data into datatable
const displayMissingData = ref<any>('');
const PushData = async () => {
  displayMissingData.value = '';
  try {
    const response = await axios.post<GetDataAPIResponse>('https://api.goro.fun/api/register', {
      title: title.value,
      content: content.value,
      author: author.value
    });

    store.addPost(response.data);
    await store.GetData();
    toast.add({
      severity: 'success',
      summary: 'Add Data',
      detail: 'Data pushed successfully',
      life: 3000
    });

    title.value = '';
    content.value = '';
    author.value = '';
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;
      if (errors) {
        displayMissingData.value = errors;
      } else {
        console.log('error: ', error);
      }
    }
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Data pushed unsuccessfully',
      life: 3000
    });
  }
};

// handle query data
const requestData = async () => {
  try {
    const response = await axios.post<{ data: GetDataAPIResponse[] }>('https://api.goro.fun/api/index', {
      searchString:{
        "title":  searchRequestTitle.value,
        "content": searchRequestContent.value,
        "author": searchRequestAuthor.value
      }
    });
    
    store.setSearchResults(response.data.data);

    toast.add({
      severity: 'success',
      summary: 'Search',
      detail: 'Search completed successfully',
      life: 3000
    });
  } catch (error) {
    console.error('Search error:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Search failed',
      life: 3000
    });
  }
};

const clearSearch = () => {
  searchRequestTitle.value = '';
  searchRequestContent.value = '';
  searchRequestAuthor.value = '';
  store.clearSearch();
};

onBeforeMount(() => {
  store.GetData();
});
</script>

<template>
  <div class="container">
    <Toast />
    <div class="p-8">
      <div class="search-container flex gap-3 justify-content-center align-items-center mb-6">
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="searchRequestTitle" placeholder="Search on title" />
        </IconField>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="searchRequestContent" placeholder="Search on content" />
        </IconField>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="searchRequestAuthor" placeholder="Search on author" />
        </IconField>
        <Button label="Search" @click="requestData"></Button>
        <Button v-if="store.isSearchActive" label="Clear Search" @click="clearSearch"></Button>

      </div>
      <DataTable :value="store.posts" paginator :rows="10" showGridlines tableStyle="height: 40rem">
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="content" header="Content"></Column>
        <Column field="author" header="Author"></Column>
        <Column header="Delete">
          <template #body="{ data }: { data: GetDataAPIResponse }">
            <Button
              type="button"
              label="Delete"
              class="p-button-danger"
              @click="DeleteData(data.id)"
            >
            </Button>
          </template>
        </Column>
        <Column header="Edit">
          <template #body="{ data }: { data: GetDataAPIResponse }">
            <Button
              type="button"
              label="Edit"
              class="p-button-success"
              @click="openModal(data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="card p-7 border-round-xl bg-white w-20rem m-auto">
      <div class="input-container flex flex-column gap-5 align-items-center">
        <FloatLabel>
          <div class="error-container flex gap-3">
            <InputText v-model="title" />
            <p class="text-sm text-red-500" v-if="displayMissingData.title">Title is required !</p>
          </div>
          <label for="username">Title</label>
        </FloatLabel>

        <FloatLabel>
          <div class="error-container flex gap-3">
            <InputText v-model="content" />
            <p class="text-sm text-red-500" v-if="displayMissingData.content">
              Content is required 1
            </p>
          </div>
          <label for="username">Content</label>
        </FloatLabel>

        <FloatLabel>
          <div class="error-container flex gap-3">
            <InputText v-model="author" />
            <p class="text-sm text-red-500" v-if="displayMissingData.author">
              Author is required !
            </p>
          </div>
          <label for="username">Author</label>
        </FloatLabel>

        <Button label="Add Data" class="border-none bg-green-500" @click="PushData"></Button>
      </div>
    </div>
    <div class="h-7rem"></div>
  </div>
</template>

<style scoped lang="scss">
::placeholder{
  opacity: .4;
}
</style>
