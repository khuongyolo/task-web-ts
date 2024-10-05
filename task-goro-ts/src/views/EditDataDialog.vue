<script setup lang="ts">
import type { GetDataByIdResponse } from '@/types/data-table';
import axios from 'axios';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDataTableStore } from '@/stores/data-table';
import { useToast } from 'primevue/usetoast';

const store = useDataTableStore();
const router = useRouter();
const route = useRoute();

const idOfPost = ref<number>();
const title = ref<string>("");
const content = ref<string>("");
const author = ref<string>("");
const toast = useToast();

const getDataById = async() => {
    const id = route.params.id
    try{
        const { data } = await axios.get<{ data: GetDataByIdResponse }>(`https://api.goro.fun/api/edit/${id}`);
        idOfPost.value = data.data.id;
        title.value = data.data.title;
        content.value = data.data.content;
        author.value = data.data.author;
    } catch (error) {
        console.log(error);
    }
};

const pushNewData = async() => {
    const id = route.params.id;
    try{
        await axios.post<GetDataByIdResponse>("https://api.goro.fun/api/update"), {
            title: title.value,
            content: content.value,
            author: author.value,
        };
        await store.GetData();
        router.push("/");
        toast.add({
            severity: 'success',
            summary: 'Add Data',
            detail: 'Data pushed successfully',
            life: 3000
        });
    } catch (error) {
        console.log(error);
    }
};

onBeforeMount(() => {
    getDataById();
});

</script>

<template>
    <div class="container w-8 m-auto card bg-white border-round-xl">
        <div class="p-4">
            <p>ID of data : {{ idOfPost }}</p>
            <div class="grid m-auto align-items-center">
                <div class="col-3">
                    <p>Title</p>
                </div>
                <div class="col-9">
                    <InputText v-model="title" class="w-full" placeholder="Input new data" />
                </div>
            </div>
            <div class="grid m-auto align-items-center">
                <div class="col-3">
                    <p>Content</p>
                </div>
                <div class="col-9">
                    <InputText v-model="content" class="w-full" placeholder="Input new data" />
                </div>
            </div>
            <div class="grid m-auto align-items-center">
                <div class="col-3">
                    <p>Author</p>
                </div>
                <div class="col-9">
                    <InputText v-model="author" class="w-full" placeholder="Input new data" />
                </div>
            </div>
            <div class="w-full mt-7 flex flex-column align-items-center">
                <Button label="Update Data" class="px-5" @click="pushNewData" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

::placeholder{
    padding-left: 8px;
    opacity: 0.3;
}
</style>