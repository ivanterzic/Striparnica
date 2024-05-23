import { shallowMount } from "@vue/test-utils";
import Search from "../components/Search.vue";
import { Zaglavlje } from "@/types/Zaglavlje";
import { SearchParams } from "@/types/SearchParams";
import { Mogucnosti } from "@/types/Mogucnosti";

const zaglavlja: Zaglavlje[] = [
    { displayName: "ID narudžbe", sqlName: "idnarudzbe" },
    { displayName: "Datum stvaranja", sqlName: "datumstvaranja" },
    { displayName: "Datum zaprimanja", sqlName: "datumzaprimanja" },
];

const mogucnosti: Mogucnosti = {
    mbrreferanata: ["1006474746334"],
    statusi: ["potvrdena", "u tijeku", "nepotpuna"],
    dobavljaci: [
        {
            id: 1,
            ime: "Kreativna Kolekcija d.o.o.",
        },
    ],
    narudzbe: [4, 5, 6],
};

const searchParams: SearchParams = {
    key: "datumstvaranja",
    value: "2024-05-14",
};

describe("Search.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(Search, {
            props: { zaglavlja, mogucnosti },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Emitiranje dogadaja filter na poziv metode emitirajFilter", async () => {
        const wrapper = shallowMount(Search, {
            props: { zaglavlja, mogucnosti },
        });

        await wrapper.vm.emitirajFilter();
        expect(wrapper.emitted("filter")).toBeTruthy();
    });

    it("Resetiranje parametara pretrazivanja i emitiranje na poziv metode ocistiFilter", async () => {
        const wrapper = shallowMount(Search, {
            props: { zaglavlja, mogucnosti },
        });

        await wrapper.setData({
            searchParams,
        });
        await wrapper.vm.ocistiFilter();

        expect(wrapper.vm.searchParams.key).toBe("idnarudzbe");
        expect(wrapper.vm.searchParams.value).toBe("");
        expect(wrapper.emitted("ocisti-filter")).toBeTruthy();
    });
});
