<template>
    <thead>
        <tr>
            <th v-if="content == 'narudzbe'" class="back-light-gray">#</th>
            <th v-for="zaglavlje in zaglavlja" :key="zaglavlje" class="back-light-gray">
                {{ zaglavlje.displayName }}
            </th>
            <th class="back-light-gray"></th>
        </tr>
    </thead>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        zaglavlja: {
            type: Array,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
});
</script>

<style>
th {
    font-weight: bold;
    padding: 25px 10px;
    text-align: left;
    border-bottom: 2px solid #ddd;
    position: sticky;
    top: 9.9vh;
    z-index: 1;
}
</style>
