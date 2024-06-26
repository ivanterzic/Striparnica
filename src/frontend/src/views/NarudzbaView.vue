<template>
    <div>
        <h2 v-if="error">{{ error }}. <router-link to="/narudzbe">Povratak na listu narudžbi</router-link></h2>
        <div v-else>
            <div
                class="form-button nav-button back-blue"
                @click="susjednaNarudzba(prethodnaURL, prethodnaNarudzba)"
                :class="{ disabled: !prethodnaNarudzba }"
            >
                Prethodna
            </div>
            <div
                class="form-button nav-button back-blue"
                @click="susjednaNarudzba(sljedecaURL, sljedecaNarudzba)"
                :class="{ disabled: !sljedecaNarudzba }"
            >
                Sljedeća
            </div>
            <NarudzbaForm
                v-if="narudzba && mogucnosti"
                :narudzba="narudzba"
                :mogucnosti="mogucnosti"
                @refresh="dohvatiNarudzbu(narudzbaURL, id)"
            />
            <h2>Lista artikala</h2>
            <Table
                v-if="artikli.length"
                :zaglavlja="zaglavlja"
                :retci="artikli"
                :content="'artikli'"
                :id="narudzba.idnarudzbe"
                @refresh="dohvatiNarudzbu(narudzbaURL, id)"
            />
            <ArtikalForm
                :showModal="showModal"
                :sviArtikli="sviArtikli"
                @close="showModal = false"
                @novi-artikal="dodajArtikal"
            />
            <div id="toggle-artikal-div" class="form-button nav-button back-blue margin-bottom" @click="toggleModal">
                Dodaj artikal
            </div>
        </div>
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
import { Zaglavlje } from "../types/Zaglavlje";
import { Mogucnosti } from "../types/Mogucnosti";

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
            prethodnaNarudzba: null as number | null,
            sljedecaNarudzba: null as number | null,
            artikli: [] as Artikal[],
            mogucnosti: null as Mogucnosti | null,
            zaglavlja: [
                { displayName: "Naziv artikla", sqlName: "naziv" },
                { displayName: "Opis artikla", sqlName: "opis" },
                { displayName: "Cijena", sqlName: "cijena" },
                { displayName: "PDV", sqlName: "pdv" },
                { displayName: "Izdavač", sqlName: "izdavac" },
                { displayName: "Izdanje", sqlName: "izdanje" },
                { displayName: "Količina (skladište)", sqlName: "dostupnakolicina" },
                { displayName: "Tražena količina", sqlName: "kolicina" },
            ] as Zaglavlje[],
            showModal: false,
            sviArtikli: [] as Artikal[],
            error: "",
        };
    },
    mounted() {
        this.dohvatiNarudzbu(this.narudzbaURL, this.id);
        this.dohvatiMogucnosti();
    },
    computed: {
        narudzbaURL(): string {
            return `http://localhost:3000/narudzbe/${this.id}`;
        },
        prethodnaURL(): string {
            return `http://localhost:3000/narudzbe/${this.prethodnaNarudzba}`;
        },
        sljedecaURL(): string {
            return `http://localhost:3000/narudzbe/${this.sljedecaNarudzba}`;
        },
        artikliURL(): string {
            return this.narudzbaURL + "/urediartikle";
        },
    },
    methods: {
        async dohvatiNarudzbu(url: string, id: string | number): Promise<void> {
            if (!id) return;
            try {
                let response = await fetch(url);
                if (response.ok) {
                    let data = await response.json();
                    this.narudzba = data.narudzba;
                    this.artikli = data.artikli;
                    this.prethodnaNarudzba = data.previousId;
                    this.sljedecaNarudzba = data.nextId;
                } else if (response.status === 400) {
                    this.error = (await response.json()).error;
                } else {
                    throw new Error("Greška kod dohvaćanja narudžbe");
                }
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
            try {
                let response = await fetch(this.artikliURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        stavkenarudzbe: [...this.artikli, artikal],
                    }),
                });
                if (response.ok) {
                    this.showModal = !this.showModal;
                    this.artikli.push(artikal);
                } else if (response.status === 400) {
                    let error = (await response.json()).error;
                    alert(error);
                } else {
                    throw new Error("Greška kod dodavanja artikla");
                }
            } catch (error) {
                console.log(error);
            }
        },
        susjednaNarudzba(url: string, id: string | number) {
            if (!id) return;
            this.$router.push(`/narudzbe/${id}`);
            this.dohvatiNarudzbu(url, id);
        },
    },
});
</script>

<style>
.nav-button {
    display: inline-block;
    margin-top: 3vh;
    margin-left: 2.5vw;
    margin-right: 0;
    margin-bottom: 0;
}
.margin-bottom {
    margin-bottom: 20px;
}
.disabled {
    background-color: rgb(120, 120, 120);
}
.disabled:hover {
    cursor: not-allowed;
}
</style>
