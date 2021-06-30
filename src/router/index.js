import Vue from "vue";
import VueRouter from "vue-router";
import Files from "../views/Files";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/files",
        name: "Files",
        component: Files,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
