import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DirectoryView from "../views/DirectoryView.vue";
import PageNotFound from "../views/404Error.vue";
import DoctorView from "../views/DoctorView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/directory",
      name: "directory",
      component: DirectoryView,
    },
    {
      path: "/doctors",
      name: "doctors",
      component: DoctorView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: PageNotFound,
    },
  ],
});

export default router;
