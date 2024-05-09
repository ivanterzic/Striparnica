<template>
    <table class="table">
        <TableHead :zaglavlja="zaglavlja" :content="content" />
        <tbody>
            <tr v-for="(redak, index) in retci" :key="index">
                <td v-if="content == 'artikli'">{{ index }}</td>
                <td
                    v-for="zaglavlje in zaglavlja"
                    :key="zaglavlje"
                    :class="{ artikli: content == 'artikli', narudzbe: content == 'narudzbe' }"
                >
                    <div v-if="!kolicinaEdit(redak, zaglavlje)">{{ redak[zaglavlje.sqlName] || "-" }}</div>
                    <input v-else type="number" v-model="redak.kolicina" />
                </td>
                <td v-if="content == 'narudzbe'">
                    <div @click="detaljiNarudzbe(redak.idnarudzbe)" class="button-link back-blue">Detalji</div>
                </td>
                <td v-if="content != 'narudzbe'">
                    <div v-if="redak.edit" @click="azurirajArtikal(redak)" class="button-link back-green">Spremi</div>
                    <div v-else @click="redak.edit = true" class="button-link back-yellow">Ažuriraj</div>
                    <div class="button-link back-red" @click="obrisiArtikal(redak)">Obriši</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Narudzba } from "../types/Narudzba";
import { Artikal, ArtikalOsnovno } from "../types/Artikal";
import { Zaglavlje } from "../types/Zaglavlje";
import TableHead from "../components/TableHead.vue";

export default defineComponent({
    components: { TableHead },
    props: {
        zaglavlja: {
            type: Array as PropType<Zaglavlje[]>,
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
        id: {
            type: Number,
            required: false,
        },
    },
    data() {
        return {
            narudzbaURL: "http://localhost:3000/narudzbe/",
        };
    },
    computed: {
        artikliURL(): string {
            return this.narudzbaURL + this.id + "/urediartikle";
        },
    },
    methods: {
        detaljiNarudzbe(idNarudzbe: number): void {
            this.$router.push(`/narudzbe/${idNarudzbe}`);
        },
        kolicinaEdit(redak: Artikal, zaglavlje: any): boolean {
            return zaglavlje.sqlName === "kolicina" && redak.edit == true;
        },
        azurirajArtikal(): void {
            let data: ArtikalOsnovno[] = [];
            this.retci.forEach((redak: any) => {
                if (redak.kolicina != 0) {
                    data.push({
                        idartikla: redak.idartikla,
                        kolicina: redak.kolicina,
                    });
                }
            });
            this.posaljiArtikle(data);
        },
        obrisiArtikal(artikal: Artikal): void {
            let data: ArtikalOsnovno[] = [];
            this.retci.forEach((redak: any) => {
                if (redak.idartikla != artikal.idartikla) {
                    data.push({
                        idartikla: redak.idartikla,
                        kolicina: redak.kolicina,
                    });
                }
            });
            this.posaljiArtikle(data);
        },
        async posaljiArtikle(data: ArtikalOsnovno[]): Promise<void> {
            try {
                let response = await fetch(this.artikliURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        stavkenarudzbe: data,
                    }),
                });
                if (!response.ok) {
                    throw new Error("Server problem");
                }
                this.$emit("refresh");
            } catch (error) {
                console.log(error);
            }
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
    width: 10.2%;
}
.narudzbe {
    width: 15%;
}
</style>
