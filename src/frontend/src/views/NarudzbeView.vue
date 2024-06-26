<template>
    <div>
        <h2>Lista narudžbi</h2>
        <div class="form-button nav-button back-blue margin-bottom" @click="showModal = !showModal">Dodaj narudžbu</div>
        <Search
            v-if="mogucnosti"
            :zaglavlja="zaglavlja"
            :mogucnosti="mogucnosti"
            @filter="filtrirajNarudzbe"
            @ocisti-filter="ocistiFilter"
        />
        <Table :zaglavlja="zaglavlja" :retci="filteredNarudzbe" :content="'narudzbe'" />
        <NovaNarudzba
            v-if="mogucnosti"
            :showModal="showModal"
            :zaglavlja="zaglavlja"
            :mogucnosti="mogucnosti"
            @close="showModal = false"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//types
import { Narudzba } from "../types/Narudzba";
import { Zaglavlje } from "../types/Zaglavlje";
import { SearchParams } from "../types/SearchParams";
import { Mogucnosti } from "../types/Mogucnosti";
//components
import Table from "../components/Table.vue";
import Search from "../components/Search.vue";
import NovaNarudzba from "../components/NovaNarudzba.vue";

export default defineComponent({
    components: { Table, Search, NovaNarudzba },
    data() {
        return {
            narudzbeURL: "http://localhost:3000/narudzbe",
            narudzbe: [] as Narudzba[],
            filteredNarudzbe: [] as Narudzba[],
            mogucnostiURL: "http://localhost:3000/narudzbe/kljucevi",
            mogucnosti: null as Mogucnosti | null,
            zaglavlja: [
                { displayName: "ID narudžbe", sqlName: "idnarudzbe" },
                { displayName: "Datum stvaranja", sqlName: "datumstvaranja" },
                { displayName: "Datum zaprimanja", sqlName: "datumzaprimanja" },
                { displayName: "Status", sqlName: "status", plural: "statusi" },
                { displayName: "Dobavljač", sqlName: "iddobavljaca", plural: "dobavljaci" },
                { displayName: "MBR referenta", sqlName: "mbrreferenta", plural: "mbrreferenata" },
            ] as Zaglavlje[],
            showModal: false,
        };
    },
    mounted() {
        this.dohvatiNarudzbe();
        this.dohvatiMogucnosti();
    },
    methods: {
        async dohvatiNarudzbe(): Promise<void> {
            try {
                let response = await fetch(this.narudzbeURL);
                if (!response.ok) {
                    throw new Error("Greška kod dohvaćanja narudžbi s poslužitelja");
                }
                this.narudzbe = await response.json();
                this.filteredNarudzbe = [...this.narudzbe];
            } catch (error) {
                console.log(error);
            }
        },
        async dohvatiMogucnosti(): Promise<void> {
            try {
                let response = await fetch(this.mogucnostiURL);
                if (!response.ok) {
                    throw new Error("Greška kod dohvaćanja mogućnosti");
                }
                this.mogucnosti = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        filtrirajNarudzbe(searchParams: SearchParams) {
            this.filteredNarudzbe = this.narudzbe.filter((narudzba: Narudzba) => {
                return narudzba[searchParams.key] == searchParams.value;
            });
        },
        ocistiFilter() {
            this.filteredNarudzbe = [...this.narudzbe];
        },
    },
});
</script>

<style>
h2 {
    width: 95%;
    margin: 25px auto;
}
.search-field {
    width: 12vw;
    margin-left: 2.5vw;
    margin-bottom: 2.5vw;
}
</style>
