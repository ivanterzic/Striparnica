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
            narudzbeURL: "http://localhost:3000/narudzbe" as string,
            zaglavlja: [
                { displayName: "ID narudžbe", sqlName: "idnarudzbe" },
                { displayName: "Datum stvaranja", sqlName: "datumstvaranja" },
                { displayName: "Datum zaprimanja", sqlName: "datumzaprimanja" },
                { displayName: "Status", sqlName: "status" },
                { displayName: "ID dobavljača", sqlName: "iddobavljaca" },
                { displayName: "MBR referenta", sqlName: "mbrreferenta" },
            ],
            narudzbe: [] as Narudzba[],
        };
    },
    mounted() {
        for (let i = 0; i < 25; i++) {
            this.narudzbe.push({
                idnarudzbe: 3,
                datumstvaranja: "2023-03-08",
                datumzaprimanja: null,
                status: "u tijeku",
                iddobavljaca: 4,
                mbrreferenta: "1006474746334",
            });
        }
        //this.dohvatiNarudzbe()
    },
    methods: {
        async dohvatiNarudzbe(): Promise<void> {
            try {
                let response = await fetch(this.narudzbeURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Greška kod dohvaćanja narudžbi s poslužitelja");
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
