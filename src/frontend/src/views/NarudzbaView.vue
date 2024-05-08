<template>
    <div>
        <div class="form-button nav-button back-blue">Prethodna</div>
        <div class="form-button nav-button back-blue">Sljedeća</div>
        <NarudzbaForm :narudzba="narudzba" :id="narudzba.idNarudzbe" :mogucnosti="mogucnosti" />
        <h2>Lista artikala</h2>
        <Table :zaglavlja="zaglavlja" :retci="artikli" :content="'artikli'" :id="id" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NarudzbaForm from "../components/NarudzbaForm.vue";
import Table from "../components/Table.vue";
import { Artikal } from "../types/Artikal";

export default defineComponent({
    components: { NarudzbaForm, Table },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            narudzbaBaseURL: "http://localhost:3000/",
            mogucnostiURL: "http://localhost:3000/mogucnosti",
            zaglavlja: [
                { displayName: "Naziv artikla", sqlName: "naziv" },
                { displayName: "Opis artikla", sqlName: "opis" },
                { displayName: "Cijena", sqlName: "cijena" },
                { displayName: "PDV", sqlName: "pdv" },
                { displayName: "Izdavač", sqlName: "izdavac" },
                { displayName: "Izdanje", sqlName: "izdanje" },
                { displayName: "Dostupna količina", sqlName: "dostupnakolicina" },
                { displayName: "Tražena količina", sqlName: "kolicina" },
            ],
            narudzba: {
                idnarudzbe: 3,
                datumstvaranja: "2023-03-08",
                datumzaprimanja: null,
                status: "u tijeku",
                iddobavljaca: 4,
                mbrreferenta: "1006474746334",
            },
            artikli: [] as Artikal[],
            mogucnosti: {
                status: ["potvrdena", "u tijeku", "nepotvrdena"],
                iddobavljaca: [2, 3, 4],
                mbrreferenta: ["1006474746334", "3824629348629", "..."],
            },
        };
    },
    computed: {
        narudzbaURL(): string {
            return this.narudzbaBaseURL + this.id;
        },
    },
    mounted() {
        for (let i = 0; i < 25; i++) {
            this.artikli.push({
                idartikla: 2,
                naziv: "strip",
                opis: "opis",
                dostupnakolicina: 12,
                cijena: 7,
                pdv: 0.34,
                izdavac: "dinamo",
                izdanje: "prvo",
                kolicina: 4,
                edit: false,
            });
        }
        // this.getNarudzba();
        // this.getMogucnosti();
    },
    methods: {
        async getNarudzba() {
            try {
                let response = await fetch(this.narudzbaURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.narudzba = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        async getMogucnosti() {
            try {
                let response = await fetch(this.mogucnostiURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.mogucnosti = await response.json();
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
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 0;
}
</style>
