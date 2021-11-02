<template>
  <div class="shadow">
    <div class="table-actions mb-3 shadow">
      <button
        v-if="readonly"
        class="btn"
        @click="
          $emit('open-modal');
          $emit('add-mode');
        "
      >
        <i class="bi bi-plus-lg text-info"></i>
      </button>
      <input
        class="search"
        type="text"
        placeholder="Buscar"
        v-model="searchQuery"
      />
      <button
        class="btn"
        :disabled="tableContent.length === 0 || selectedRows.length === 0"
        @click="unselectDeleted"
      >
        <i class="bi bi-trash text-light"></i>
      </button>
      <button class="btn" @click="$emit('reload')">
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
            <th>
              <input
                type="checkbox"
                class="form-check-input checkbox"
                v-model="allSelected"
                @change="selectAll"
              />
            </th>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableContent" :key="data.id" :data-id="data.id">
            <td>
              <input
                type="checkbox"
                class="form-check-input checkbox"
                @change="selectRow(data.id)"
                :checked="selectedRows.includes(data.id)"
              />
            </td>
            <template v-for="(value, index) in data" :key="value">
              <td v-if="!exclude.includes(index)">
                {{ value }}
              </td>
            </template>
            <td>
              <div class="action-buttons shadow">
                <button
                  class="btn"
                  @click="
                    $emit('open-modal');
                    $emit('edit-mode', data);
                  "
                >
                  <i :class=editIcon></i>
                </button>
                <button class="btn" @click="$emit('delete-row', data)">
                  <i :class=deleteIcon></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Loading v-if="isLoading" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Loading from "../components/Loading.vue";
export default {
  name: "DataTable",
  components: {
    Loading,
  },
  props: {
    headers: Array,
    content: Array,
    apiUrl: String,
    deleteRow: Function,
    updateRow: Function,
    exclude: Array,
    readonly: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    editIcon: {
      type: String,
      default: "bi bi-pencil text-warning",
    },
    deleteIcon: {
      type: String,
      default: "bi bi-trash text-primary",
    },
  },
  emits: [
    "open-modal",
    "add-mode",
    "edit-mode",
    "reload",
    "delete-row",
    "delete-selected",
  ],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const selectedRows = ref([]);
    const allSelected = ref(false);

    const selectRow = (id) => {
      if (selectedRows.value.includes(id)) {
        selectedRows.value = selectedRows.value.filter((item) => item !== id);
      } else {
        selectedRows.value.push(id);
      }
    };

    const selectAll = () => {
      if (!allSelected.value) {
        selectedRows.value = [];
      } else {
        selectedRows.value = props.content.map((item) => item.id);
      }
    };

    const unselectDeleted = () => {
      emit("delete-selected", selectedRows.value);
      selectedRows.value = [];
    };

    return {
      searchQuery,
      selectedRows,
      selectRow,
      selectAll,
      allSelected,
      unselectDeleted,
    };
  },
  computed: {
    tableContent() {
      return this.content.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
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
  border-radius: 5px;
}
.checkbox {
  height: 1.4em;
  width: 1.4em;
}
</style>