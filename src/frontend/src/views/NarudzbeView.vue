<template>
    <div>
        <h2>Lista narudžbi</h2>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="zaglavlje in zaglavlja" :key="zaglavlje" class="back-light-gray">{{ zaglavlje }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(narudzba, index) in narudzbe" :key="index">
                    <td>{{ narudzba.datumStvaranja }}</td>
                    <td>{{ narudzba.datumZaprimanja || "-" }}</td>
                    <td>{{ narudzba.status }}</td>
                    <td>{{ narudzba.idDobavljaca }}</td>
                    <td>{{ narudzba.MBRReferenta }}</td>
                    <td>
                        <div @click="detaljiNarudzbe(narudzba.idNarudzbe)" class="button-link back-blue">Detalji</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Narudzba } from "../types/Narudzba";

export default defineComponent({
    data() {
        return {
            narudzbeURL: "http://localhost:3000/narudzbe",
            zaglavlja: [
                "Datum Stvaranja",
                "Datum Zaprimanja",
                "Status",
                "ID Dobavljača",
                "MBR Referenta",
                "",
            ] as string[],
            narudzbe: [
                {
                    idNarudzbe: 1,
                    datumStvaranja: "2023-01-15",
                    datumZaprimanja: null,
                    status: "u tijeku",
                    idDobavljaca: 3,
                    MBRReferenta: "1006474746334",
                },
                {
                    idNarudzbe: 2,
                    datumStvaranja: "2023-02-22",
                    datumZaprimanja: "2023-03-05",
                    status: "potvrdena",
                    idDobavljaca: 2,
                    MBRReferenta: "1006474746334",
                },
                {
                    idNarudzbe: 3,
                    datumStvaranja: "2023-03-08",
                    datumZaprimanja: null,
                    status: "u tijeku",
                    idDobavljaca: 4,
                    MBRReferenta: "1006474746334",
                },
            ] as Narudzba[],
        };
    },
    mounted() {
        //this.dohvatiNarudzbe()
    },
    methods: {
        detaljiNarudzbe(idNarudzbe: number) {
            console.log("id narudzbe: " + idNarudzbe);
            this.$router.push(`/narudzbe/${idNarudzbe}`);
        },
    },
});
</script>

<style scoped>
h2 {
    width: 95%;
    margin: 25px auto;
}
table {
    width: 95%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th {
    color: #333;
    font-weight: bold;
    padding: 25px 20px;
    text-align: left;
    border-bottom: 2px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 1;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:nth-child(odd) {
    background-color: #e9e9e9;
}

td {
    padding: 20px;
    border-bottom: 1px solid #ddd;
}
</style>
