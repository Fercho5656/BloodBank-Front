<template>
  <div class="report">
    <header class="chart-header">
      <h1 class="text-center mx-3">{{ title }}</h1>
      <button class="btn btn-success print" @click="print">
        <i class="bi bi-printer"></i>
      </button>
    </header>
    <p class="text-center">{{ description }}</p>
    <pie-chart
      :data="data"
      legend="bottom"
      :bytes="true"
      :library="library"
      adapter="google"
    ></pie-chart>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  setup() {
    const library = {
      backgroundColor: "#fff",
      pieSliceText: "value",
      width: 500,
      suffix: "ml",
      legend: {
        position: "bottom",
        textStyle: { color: "#efef", fontSize: 16 },
      },
    };

    const print = () => {
      window.print();
    };

    return { library, print };
  },
};
</script>

<style scoped>
.chart-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
@media print {
  .print {
    display: none;
  }
  @page {
    size: portrait;
  }
}
</style>