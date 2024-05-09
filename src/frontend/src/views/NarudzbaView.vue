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
        <ArtikalForm
            :showModal="showModal"
            :sviArtikli="sviArtikli"
            @close="showModal = false"
            @novi-artikal="dodajArtikal"
        />
        <div class="form-button nav-button back-blue margin-bottom" @click="toggleModal">Dodaj artikal</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import NarudzbaForm from "../components/NarudzbaForm.vue";
import Table from "../components/Table.vue";
import ArtikalForm from "../components/ArtikalForm.vue";
//types
import { Artikal } from "../types/Artikal";
import { Narudzba } from "../types/Narudzba";

export default defineComponent({
    components: { NarudzbaForm, Table, ArtikalForm },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            mogucnostiURL: "http://localhost:3000/narudzbe/kljucevi",
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
            showModal: false,
            sviArtikli: [] as Artikal[],
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

        artikliURL(): string {
            return this.narudzbaURL + "/urediartikle";
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
                this.$router.push(`/narudzbe/${data.narudzba.idnarudzbe}`);
            } catch (error) {
                console.log(error);
            }
        },
        async toggleModal() {
            this.showModal = !this.showModal;
            try {
                let response = await fetch("http://localhost:3000/artikli");
                if (!response.ok) {
                    throw new Error("Greška kod dohvaćanja artikala");
                }
                let data = await response.json();
                this.sviArtikli = data.filter((a1: Artikal) => {
                    let flag = false;
                    this.artikli.forEach((a2: Artikal) => {
                        if (a1.idartikla == a2.idartikla) flag = true;
                    });
                    return !flag;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async dodajArtikal(artikal: Artikal): Promise<void> {
            this.artikli.push(artikal);
            this.showModal = !this.showModal;
            try {
                let response = await fetch(this.artikliURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        stavkenarudzbe: this.artikli,
                    }),
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
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
.margin-bottom{
    margin-bottom: 20px
}
</style>
