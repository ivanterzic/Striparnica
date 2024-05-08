<template>
    <div>
        <h2>Lista narudžbi</h2>
        <Table :zaglavlja="zaglavlja" :retci="narudzbe" :content="'narudzbe'" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Narudzba } from "../types/Narudzba";
import Table from "../components/Table.vue";

export default defineComponent({
    components: { Table },
    data() {
        return {
            narudzbeURL: "http://localhost:3000/narudzbe",
            zaglavlja: [
                { displayName: "ID narudžbe", sqlName: "idNarudzbe" },
                { displayName: "Datum Stvaranja", sqlName: "datumStvaranja" },
                { displayName: "Datum Zaprimanja", sqlName: "datumZaprimanja" },
                { displayName: "Status", sqlName: "status" },
                { displayName: "ID Dobavljača", sqlName: "idDobavljaca" },
                { displayName: "MBR Referenta", sqlName: "MBRReferenta" },
            ],
            narudzbe: [] as Narudzba[],
        };
    },
    mounted() {
        for (let i = 0; i < 25; i++) {
            this.narudzbe.push({
                idNarudzbe: 3,
                datumStvaranja: "2023-03-08",
                datumZaprimanja: null,
                status: "u tijeku",
                idDobavljaca: 4,
                MBRReferenta: "1006474746334",
                edit: false,
            });
        }
        //this.dohvatiNarudzbe()
    },
    methods: {
        async dohvatiNarudzbe() {
            try {
                let response = await fetch(this.narudzbeURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.narudzbe = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
    },
});
</script>

<style>
h2 {
    width: 95%;
    margin: 25px auto;
}
</style>
