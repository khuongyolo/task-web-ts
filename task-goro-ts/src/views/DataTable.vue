<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'; 
import { useDataTableStore } from '../stores/data-table';

const store = useDataTableStore();

const title = ref("");
const content = ref("");
const author = ref("");

onBeforeMount(() => {
  store.GetData();
});

</script>

<template>
    <div class="container">
        <div class="p-8">
            <DataTable :value="store.posts" paginator :rows="5" showGridlines tableStyle="height: 40rem">
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Title"></Column>
                <Column field="content" header="Content"></Column>
                <Column field="author" header="Author"></Column>
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
