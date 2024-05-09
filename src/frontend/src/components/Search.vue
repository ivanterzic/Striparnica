<template>
    <div>
        <select v-model="searchParams.key" class="search-field">
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
            <option v-for="mogucnost in mogucnosti['mbrreferanata']" :key="mogucnost">
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
                {{ dobavljac.ime }}
            </option>
        </select>
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
    },
});
</script>

<style></style>
