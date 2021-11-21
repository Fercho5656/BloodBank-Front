<template>
  <div class="shadow">
    <div v-if="!readonly" class="table-actions mb-3 shadow">
      <button
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
        :disabled="tableContent.length === 0 || selectedRowsIds.length === 0"
        @click="unselectDeleted"
      >
        <i class="bi bi-trash text-light"></i>
      </button>
      <button class="btn" @click="$emit('reload')">
        <i class="bi bi-arrow-clockwise text-info"></i>
      </button>
      <button class="btn" @click="$emit('download-pdf', selectedRowsData)">
        <i class="bi bi-download text-success"></i>
      </button>
    </div>
    <div class="table-responsive">
      <table :class="tableClass">
        <thead>
          <tr>
            <th v-if="!readonly">
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
            <th v-if="!readonly">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableContent" :key="data.id" :data-id="data.id">
            <td v-if="!readonly">
              <input
                type="checkbox"
                class="form-check-input checkbox"
                @change="selectRow(data)"
                :checked="selectedRowsIds.includes(data.id)"
              />
            </td>
            <template v-for="(value, index) in data" :key="value">
              <td v-if="!exclude.includes(index)">
                {{ value }}
              </td>
            </template>
            <td>
              <div class="action-buttons shadow" v-if="!readonly">
                <button
                  class="btn"
                  @click="
                    $emit('open-modal');
                    $emit('edit-mode', data);
                  "
                >
                  <i :class="editIcon"></i>
                </button>
                <button class="btn" @click="$emit('delete-row', data)">
                  <i :class="deleteIcon"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DataTable",
  props: {
    headers: Array,
    content: Array,
    apiUrl: String,
    deleteRow: Function,
    updateRow: Function,
    hoverable: {
      type: Boolean,
      default: true,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    exclude: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
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
    "download-pdf",
  ],
  setup(props, { emit }) {
    const searchQuery = ref("");
    const selectedRowsIds = ref([]);
    const selectedRowsData = ref([]);
    const allSelected = ref(false);

    const selectRow = (data) => {
      const { id } = data;
      if (selectedRowsIds.value.includes(id)) {
        selectedRowsIds.value = selectedRowsIds.value.filter(
          (item) => item !== id
        );
        selectedRowsData.value = selectedRowsData.value.filter(
          (item) => item.id !== id
        );
      } else {
        selectedRowsIds.value.push(id);
        selectedRowsData.value.push(data);
      }
    };

    const selectAll = () => {
      if (!allSelected.value) {
        selectedRowsIds.value = [];
        selectedRowsData.value = [];
      } else {
        selectedRowsIds.value = props.content.map((item) => item.id);
        selectedRowsData.value = props.content;
      }
    };

    const unselectDeleted = () => {
      emit("delete-selected", selectedRowsIds.value);
      selectedRowsIds.value = [];
    };

    return {
      searchQuery,
      selectedRowsIds,
      selectedRowsData,
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
    tableClass() {
      //returns a string of table classes if a flag is true
      let tableClass = "table ";
      this.hoverable ? (tableClass += "table-hover ") : tableClass;
      this.dark ? (tableClass += "table-dark ") : tableClass;
      return tableClass;
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