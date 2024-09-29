<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue'; 
import { useDataTableStore } from '../stores/data-table';
import router from '@/router';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useDataTableStore();

const title = ref("");
const content = ref("");
const author = ref("");

const DeleteData = async (id: number): Promise<void> => {
    try{
      await axios.get(`https://api.goro.fun/api/delete/${id}`);
      router.push("/");
      await store.GetData();
      toast.add({
        severity: 'success', 
        summary: 'Success Message', 
        detail: 'Deleted Successfully', 
        life: 3000
      })
    } catch (error) {
      console.log("error: ", error);
      toast.add({
        severity: 'error', 
        summary: 'Error Message', 
        detail: 'Deleted Successfully', 
        life: 3000
      })
    }
  };

onBeforeMount(() => {
  store.GetData();
});

</script>

<template>
    <div class="container">
        <Toast />
        <div class="p-8">
            <DataTable :value="store.posts" paginator :rows="5" showGridlines tableStyle="height: 40rem">
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Title"></Column>
                <Column field="content" header="Content"></Column>
                <Column field="author" header="Author"></Column>
                <Column header="Delete">
                    <template #body="slotProps">
                        <Button type="button" label="Delete" class="p-button-danger" @click="DeleteData(slotProps.data.id)"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="input-container flex flex-column gap-5 align-items-center">
            <FloatLabel>
                <div class="error-container flex gap-4">
                    <InputText id="title" v-model="title" />
                    <!-- <p>Title is required</p> -->
                </div>
                <label for="username">Title</label>
            </FloatLabel>

            <FloatLabel>
                <div class="error-container flex gap-4">
                    <InputText id="content" v-model="content" />
                    <!-- <p>Content is required</p> -->
                </div>
                <label for="username">Content</label>
            </FloatLabel>

            <FloatLabel>
                <div class="error-container flex gap-4">
                    <InputText id="author" v-model="author" />
                    <!-- <p>Author is required</p> -->
                </div>
                <label for="username">Author</label>
            </FloatLabel>

            <Button label="Add Data" class="border-none bg-red-400"></Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
