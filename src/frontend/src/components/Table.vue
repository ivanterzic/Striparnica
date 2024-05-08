<template>
    <table class="table">
        <thead>
            <tr>
                <th class="back-light-gray">#</th>
                <th v-for="zaglavlje in zaglavlja" :key="zaglavlje" class="back-light-gray">
                    {{ zaglavlje.displayName }}
                </th>
                <th class="back-light-gray"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(redak, index) in retci" :key="index">
                <td :class="{ 'artikli-padding': content != 'narudzbe' }">{{ index }}</td>
                <td
                    v-for="zaglavlje in zaglavlja"
                    :key="zaglavlje"
                    :class="{ artikli: content == 'artikli', narudzbe: content == 'narudzbe' }"
                >
                    {{ redak[zaglavlje.sqlName] || "-" }}
                </td>
                <td v-if="content == 'narudzbe'">
                    <div @click="detaljiNarudzbe(redak.idNarudzbe)" class="button-link back-blue">Detalji</div>
                </td>
                <td v-if="content != 'narudzbe'">
                    <div class="button-link back-green">Ažuriraj</div>
                    <div class="button-link back-red">Obriši</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Narudzba } from "../types/Narudzba";

export default defineComponent({
    props: {
        zaglavlja: {
            type: String,
            required: true,
        },
        retci: {
            type: Array as PropType<Narudzba[]>,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    methods: {
        detaljiNarudzbe(idNarudzbe: number) {
            this.$router.push(`/narudzbe/${idNarudzbe}`);
        },
    },
});
</script>

<style>
table {
    width: 95%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
th {
    font-weight: bold;
    padding: 25px 10px;
    text-align: left;
    border-bottom: 2px solid #ddd;
    position: sticky;
    top: 9.9vh;
    z-index: 1;
}
tr:nth-child(even) {
    background-color: #f9f9f9;
}
tr:nth-child(odd) {
    background-color: #e9e9e9;
}
td {
    padding: 8px 10px;
    border-bottom: 1px solid #ddd;
}
.artikli {
    width: 10%;
}
.narudzbe {
    width: 17%;
}
</style>
