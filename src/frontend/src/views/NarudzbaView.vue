<template>
    <div>
        <div class="form-button nav-button back-blue" @click="dohvatiSusjednu(prethodnaURL)">Prethodna</div>
        <div class="form-button nav-button back-blue" @click="dohvatiSusjednu(sljedecaURL)">Sljedeća</div>
        <NarudzbaForm v-if="narudzba && mogucnosti" :narudzba="narudzba" :mogucnosti="mogucnosti" />
        <h2>Lista artikala</h2>
        <Table
            v-if="artikli.length"
            :zaglavlja="zaglavlja"
            :retci="artikli"
            :content="'artikli'"
            :id="narudzba.idnarudzbe"
            @refresh="dohvatiNarudzbu"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import NarudzbaForm from "../components/NarudzbaForm.vue";
import Table from "../components/Table.vue";
//types
import { Artikal } from "../types/Artikal";
import { Narudzba } from "../types/Narudzba";

export default defineComponent({
    components: { NarudzbaForm, Table },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            mogucnostiURL: "http://localhost:3000/narudzbe/stranikljucevi",
            narudzba: null as Narudzba | null,
            artikli: [] as Artikal[],
            mogucnosti: null,
            zaglavlja: [
                { displayName: "Naziv artikla", sqlName: "naziv" },
                { displayName: "Opis artikla", sqlName: "opis" },
                { displayName: "Cijena", sqlName: "cijena" },
                { displayName: "PDV", sqlName: "pdv" },
                { displayName: "Izdavač", sqlName: "izdavac" },
                { displayName: "Izdanje", sqlName: "izdanje" },
                { displayName: "Količina (skladište)", sqlName: "dostupnakolicina" },
                { displayName: "Tražena količina", sqlName: "kolicina" },
            ],
        };
    },
    mounted() {
        this.dohvatiNarudzbu();
        this.dohvatiMogucnosti();
    },
    computed: {
        narudzbaURL(): string {
            return `http://localhost:3000/narudzbe/${this.id}`;
        },
        prethodnaURL(): string {
            return `http://localhost:3000/narudzbe/prethodna/${this.id}`;
        },
        sljedecaURL(): string {
            return `http://localhost:3000/narudzbe/sljedeca/${this.id}`;
        },
    },
    methods: {
        async dohvatiNarudzbu(): Promise<void> {
            try {
                let response = await fetch(this.narudzbaURL);
                if (!response.ok) {
                    throw new Error("Greška kod dohvaćanja narudžbe");
                }
                let data = await response.json();
                this.narudzba = data.narudzba;
                this.artikli = data.artikli;
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
        async dohvatiSusjednu(url: string): Promise<void> {
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Greška kod prelaska na susjednu narudžbu");
                }
                let data = await response.json();
                this.narudzba = data.narudzba;
                this.artikli = data.artikli;
                console.log(this.narudzba);
                this.$router.push(`/narudzbe/${data.narudzba.idnarudzbe}`);
            } catch (error) {
                console.log(error);
            }
        },
    },
});
</script>

<style scoped>
.nav-button {
    display: inline-block;
    margin-top: 3vh;
    margin-left: 2.5vw;
    margin-right: 0;
    margin-bottom: 0;
}
</style>
