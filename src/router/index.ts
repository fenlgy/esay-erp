import { createRouter, createWebHistory } from "vue-router";

const routesModule:Record<string, {default:any}> = import.meta.glob("./routes/**/*.ts", { eager: true });
const routes = Object.keys(routesModule).map(key => routesModule[key].default)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/login.vue")
    },
    {
      path: "/icons",
      name: "icons",
      component: () => import("@/views/icons.vue")
    }, {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/not-found.vue")
    },
    ...routes
  ],

  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;