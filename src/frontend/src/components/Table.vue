<template>
    <table class="table">
        <TableHead :zaglavlja="zaglavlja" :content="content" />
        <tbody>
            <tr v-for="(redak, index) in retci" :key="index">
                <td v-if="content == 'narudzbe'" :class="{ 'artikli-padding': content != 'narudzbe' }">{{ index }}</td>
                <td
                    v-for="zaglavlje in zaglavlja"
                    :key="zaglavlje"
                    :class="{ artikli: content == 'artikli', narudzbe: content == 'narudzbe' }"
                >
                    <div v-if="!redak.edit">{{ redak[zaglavlje.sqlName] || "-" }}</div>
                    <input v-else type="text" />
                </td>
                <td v-if="content == 'narudzbe'">
                    <div @click="detaljiNarudzbe(redak.idNarudzbe)" class="button-link back-blue">Detalji</div>
                </td>
                <td v-if="content != 'narudzbe'">
                    <div v-if="redak.edit" @click="spremiArtikal(redak)" class="button-link back-green">Spremi</div>
                    <div v-else @click="redak.edit = true" class="button-link back-yellow">Ažuriraj</div>
                    <div class="button-link back-red">Obriši</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Narudzba } from "../types/Narudzba";
import { Artikal } from "../types/Artikal";
import TableHead from "../components/TableHead.vue";

export default defineComponent({
    components: { TableHead },
    props: {
        zaglavlja: {
            type: Array,
            required: true,
        },
        retci: {
            type: Array as PropType<Narudzba[] | Artikal[]>,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        detaljiNarudzbe(idNarudzbe: number) {
            this.$router.push(`/narudzbe/${idNarudzbe}`);
        },
        async spremiArtikal(redak) {
            //spremi artikal
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
    width: 10.7%;
}
.narudzbe {
    width: 14%;
}
</style>
