<template>
  <div class="roles">
    <RolesList id="rolesList" />
  </div>
</template>

<script>
import RolesList from "../components/RolesList.vue";
export default {
  name: "Roles",
  components: {
    RolesList,
  },
};
</script>

<style>
.roles {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}
#rolesList {
  /* margin: 0 1px; */
  /* width: 50%; */
}
</style>