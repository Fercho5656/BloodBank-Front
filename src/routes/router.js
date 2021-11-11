import { createRouter, createWebHistory } from "vue-router";

import BloodInventory from "./BloodInventory.vue";
import BloodTests from "./BloodTests.vue";
import Donations from "./Donations.vue";
import Donors from "./Donors.vue";
import Home from "./Home.vue";
import Hospitals from "./Hospitals.vue";
import Login from "./Login.vue";
import Requests from "./Requests.vue";
import Roles from "./Roles.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
  },
  {
    path: "/inventory",
    component: BloodInventory,
    name: "inventory",
  },
  {
    path: "/tests",
    component: BloodTests,
    name: "tests",
  },
  {
    path: "/donations",
    component: Donations,
    name: "donations",
  },
  {
    path: "/donors",
    component: Donors,
    name: "donors",
  },
  {
    path: "/hospitals",
    component: Hospitals,
    name: "hospitals",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/requests",
    component: Requests,
    name: "requests",
  },
  {
    path: "/roles",
    component: Roles,
    name: "roles",
  },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;