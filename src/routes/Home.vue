<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-md-6 col-xl-4"
        v-for="route in routes"
        :key="route.name"
      >
        <RouteCard
          :name="route.name"
          :description="route.description"
          :icon="route.icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RouteCard from "../components/RouteCard.vue";
export default {
  name: "Home",
  components: {
    RouteCard,
  },
  setup() {
    const routes = [
      {
        name: "Donadores",
        description:
          "En esta sección encontrarás a los donadores que han ayudado a la comunidad.",
        icon: "bi bi-person-circle",
        route: "/donors",
      },
      {
        name: "Donaciones",
        description:
          "En esta sección encontrarás las donaciones que han realizado los donadores.",
        icon: "bi bi-heart-fill",
        route: "/donations",
      },
      {
        name: "Solicitudes",
        description:
          "En esta sección encontrarás las solicitudes de donaciones que han realizado los hospitales.",
        icon: "bi bi-pen",
        route: "/requests",
      },
      {
        name: "Inventario",
        description:
          "En esta sección encontrarás la cantidad de sangre que hay en el inventario.",
        icon: "bi bi-box-seam",
        route: "/inventory",
      },
    ];
    return {
      routes,
    };
  },
};
</script>

<style>
</style>