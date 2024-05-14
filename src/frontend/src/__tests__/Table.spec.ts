import { shallowMount } from "@vue/test-utils";
import Table from "../components/Table.vue";
import { Zaglavlje } from "@/types/Zaglavlje";
import { Narudzba } from "@/types/Narudzba";

const zaglavlja: Zaglavlje[] = [
    { displayName: "Header 1", sqlName: "header1" },
    { displayName: "Header 2", sqlName: "header2" },
    { displayName: "Header 3", sqlName: "header3" },
];
const retci: Narudzba[] = [
    {
        idnarudzbe: 1,
        datumstvaranja: "2024-05-14",
        datumzaprimanja: "2024-05-15",
        status: "Zaprimljena",
        iddobavljaca: 123,
        mbrreferenta: "ABC123",
        dodatnoPolje: "Vrijednost",
    },
];

const content = "narudzbe";

describe("Table.vue", () => {
    it("Ispravno renderiranje", () => {
        const wrapper = shallowMount(Table, {
            props: { zaglavlja, retci, content },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it("Renderiranje ispravnog broja redaka", () => {
        const wrapper = shallowMount(Table, {
            props: { zaglavlja, retci, content },
        });

        const rows = wrapper.findAll("tbody tr");
        expect(rows.length).toBe(retci.length);
    });

    it("Navigacija na /narudzbe/{id} kod dohvata narudzbi", () => {
        const idNarudzbe = 1;

        const $router = {
            push: jest.fn(),
        };

        const wrapper = shallowMount(Table, {
            props: { zaglavlja, retci, content },
            global: {
                mocks: {
                    $router,
                },
            },
        });

        wrapper.vm.detaljiNarudzbe(idNarudzbe);

        expect($router.push).toHaveBeenCalledWith(`/narudzbe/${idNarudzbe}`);
    });
});
