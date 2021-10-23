<template>
  <div class="container">
    <table class="table table-primary">
      <thead>
        <tr>
          <th>#</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(role, index) in data" :key="role.id">
          <td>{{ index + 1 }}</td>
          <td
            :id="role.roleName + role.roleId"
            :contenteditable="role.isEditable"
          >
            {{ role.roleName }}
          </td>
          <td>
            <button @click="change(role)" class="btn btn-warning">
              <i class="bi bi-pencil-fill">&nbsp;Editar</i>
            </button>
            <button class="btn btn-danger">
              <i class="bi bi-trash-fill">&nbsp;Eliminar</i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>
            <button class="btn btn-success">Añadir</button>
          </th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "RolesList",
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const change = (data) => {
      data.isEditable = !data.isEditable;
      console.log(data);
    };

    const fetchData = async () => {
      loading.value = true;
      try {
        const response = await fetch("https://localhost:5001/api/Roles");
        if (!response.ok) throw new Error(response.statusText);
        const response_1 = await response.json();

        //Adds isEditable bool to every object
        const newData = response_1.map((data) => {
          data.isEditable = false;
          return data;
        });
        data.value = newData;
      } catch (e) {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      change,
    };
  },
};
</script>
<style >
td,
th {
  text-align: center;
  vertical-align: top;
  padding: 0;
  margin: 0;
}
td button {
  margin: 0 1em;
}
</style>