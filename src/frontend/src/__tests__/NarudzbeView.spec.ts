import fetchMock from "jest-fetch-mock";
import { mount, flushPromises } from "@vue/test-utils";
import NarudzbeView from "../views/NarudzbeView.vue";
import { Narudzba } from "@/types/Narudzba";

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

const narudzbe: Narudzba[] = [
    {
        idnarudzbe: 1,
        datumstvaranja: "2024-05-10",
        datumzaprimanja: null,
        status: "u tijeku",
        iddobavljaca: 5,
        mbrreferenta: "1006474746334",
    },
    {
        idnarudzbe: 2,
        datumstvaranja: "2023-05-18",
        datumzaprimanja: "2023-05-22",
        status: "potvrdena",
        iddobavljaca: 5,
        mbrreferenta: "1006474746334",
    },
];

const mogucnosti = {
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

describe("NarudzbeView.vue", () => {
    it("Ispravan dohvat narudzbi i mogucnosti", async () => {
        // Mock the fetch responses
        fetchMock.mockResponses(JSON.stringify(narudzbe), JSON.stringify(mogucnosti));

        const wrapper = mount(NarudzbeView);

        // Wait to ensure DOM updates have occurred
        await flushPromises();

        // Assert that the component has fetched and populated the data properties
        expect(wrapper.vm.narudzbe).toEqual(narudzbe);
        expect(wrapper.vm.mogucnosti).toEqual(mogucnosti);
    });

    it("Ispravno filtriranje narudzbi", async () => {
        fetchMock.mockResponses(JSON.stringify(narudzbe), JSON.stringify(mogucnosti));

        const wrapper = mount(NarudzbeView);

        await flushPromises();

        //console.log(wrapper.html());
        const searchInput = wrapper.findAll(".search-field")[0];
        await searchInput.setValue("status");
        const statusSelect = wrapper.findAll(".search-field")[1];
        await statusSelect.setValue("potvrdena");
        const tableRows = wrapper.findAll("tbody tr");
        expect(tableRows.length).toBe(1);
    });
});
