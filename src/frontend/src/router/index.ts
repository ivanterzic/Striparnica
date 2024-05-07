import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NarudzbeView from "../views/NarudzbeView.vue";
import NarudzbaView from "../views/NarudzbaView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/narudzbe",
        name: "narudzbe",
        component: NarudzbeView,
    },
    {
        path: "/narudzbe/:id",
        name: "narudzba",
        component: NarudzbaView,
        props: true,
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
