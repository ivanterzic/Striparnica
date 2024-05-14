import { shallowMount } from "@vue/test-utils";
import TableHead from "../components/TableHead.vue";
import { Zaglavlje } from "@/types/Zaglavlje";

const zaglavlja: Zaglavlje[] = [
    { displayName: "Header 1", sqlName: "header1" },
    { displayName: "Header 2", sqlName: "header2" },
    { displayName: "Header 3", sqlName: "header3" },
];
const content: string = "artikli";

describe("TableHead.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(TableHead, {
            props: { zaglavlja, content },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Renderiranje ispravnog broja zaglavlja", () => {
        const wrapper = shallowMount(TableHead, {
            props: { zaglavlja, content },
        });

        // pronadi sve th tagove u komponenti
        const headers = wrapper.findAll("th");

        // broj zaglavlja je u slucaju artikala + 2, a u slucaju narudzbi + 1
        expect(headers.length).toBe(content === "artikli" ? zaglavlja.length + 2 : zaglavlja.length + 1);
    });
});
