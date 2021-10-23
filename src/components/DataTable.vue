<template>
  <div class="table-actions mb-3 shadow">
    <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="$emit('open-modal') ">
      <i class="bi bi-plus-lg text-info"></i>
    </button>
    <input class="search" type="text" placeholder="Buscar" />
    <button class="btn">
      <i class="bi bi-trash text-light"></i>
    </button>
    <button class="btn">
      <i class="bi bi-arrow-clockwise text-info"></i>
    </button>
    <button class="btn">
      <i class="bi bi-download text-success"></i>
    </button>
  </div>
  <div class="table-responsive">
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th><input type="checkbox" class="form-check-input checkbox" /></th>
          <th v-for="header in headers" :key="header">
            {{ header }}
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in content" :key="data.id" :data-id="data.id">
          <td><input type="checkbox" class="form-check-input checkbox" /></td>
          <template v-for="(value, index) in data" :key="value">
            <td v-if="!['id', 'contactInfoId'].includes(index)">
              {{ value }}
            </td>
          </template>
          <td>
            <div class="action-buttons shadow">
              <button class="btn">
                <i class="bi bi-pencil text-warning"></i>
              </button>
              <button class="btn" @click="deleteTableRow(data.id)">
                <i class="bi bi-trash text-primary"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onUpdated } from "@vue/runtime-core";
export default {
  name: "DataTable",
  props: {
    headers: Array,
    content: Array,
    apiUrl: String,
    deleteRow: Function,
    updateRow: Function,
  },
  setup(props) {
    const tableData = computed(() => {
      return props.content;
    });
    onUpdated(() => {
      console.log(props.content);
    });

    //CRUD Operations
    const deleteTableRow = (id) => {
      if (confirm("¿Seguro que desea eliminar esta fila?")) {
        props.deleteRow(id);
      }
    };
    return {
      tableData,
      deleteTableRow,
    };
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.table-actions {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
}
.search {
  flex-grow: 1;
  border-radius: 10px;
}
.checkbox {
  height: 1.4em;
  width: 1.4em;
}
</style>