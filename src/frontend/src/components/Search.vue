<template>
    <div>
        <select v-model="searchParams.key" class="search-field" @change="searchParams.value = ''">
            <option v-for="(zaglavlje, index) in zaglavlja" :key="index" :value="zaglavlje.sqlName">
                {{ zaglavlje.displayName }}
            </option>
        </select>
        <input
            v-if="searchParams.key == 'datumstvaranja' || searchParams.key == 'datumzaprimanja'"
            type="date"
            v-model="searchParams.value"
            class="search-field"
            @input="emitirajFilter"
        />
        <input
            v-if="searchParams.key == 'idnarudzbe'"
            v-model="searchParams.value"
            type="text"
            class="search-field"
            @input="emitirajFilter"
        />

        <select
            v-if="searchParams.key == 'status'"
            v-model="searchParams.value"
            class="search-field"
            @change="emitirajFilter"
        >
            <option v-for="mogucnost in mogucnosti['statusi']" :key="mogucnost">
                {{ mogucnost }}
            </option>
        </select>
        <select
            v-if="searchParams.key == 'mbrreferenta'"
            v-model="searchParams.value"
            class="search-field"
            @change="emitirajFilter"
        >
            <option v-for="mogucnost in mogucnosti['mbrreferenata']" :key="mogucnost">
                {{ mogucnost }}
            </option>
        </select>
        <select
            v-if="searchParams.key == 'iddobavljaca'"
            v-model="searchParams.value"
            class="search-field"
            @change="emitirajFilter"
        >
            <option v-for="dobavljac in mogucnosti['dobavljaci']" :key="dobavljac" :value="dobavljac.id">
                ID: {{ dobavljac.id }} - {{ dobavljac.ime }}
            </option>
        </select>
        <div class="artikal-button back-red margin-left" @click="ocistiFilter">Očisti Pretragu</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Zaglavlje } from "../types/Zaglavlje";

export default defineComponent({
    props: {
        zaglavlja: {
            type: Object as PropType<Zaglavlje[]>,
            required: true,
        },
        mogucnosti: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            searchParams: {
                key: "idnarudzbe",
                value: "",
            },
        };
    },
    methods: {
        emitirajFilter() {
            this.$emit("filter", this.searchParams);
        },
        ocistiFilter() {
            this.searchParams = {
                key: "idnarudzbe",
                value: "",
            };
            this.$emit("ocisti-filter");
        },
    },
});
</script>

<style scoped>
div.margin-left {
    margin-left: 2.5vw;
}
</style>
