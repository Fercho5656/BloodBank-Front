<template>
  <article class="card route-card mb-3">
    <header class="card-header">
      <h1>{{ name }}</h1>
    </header>
    <div class="card-body">
      <i :class="icon"></i>
      <p>{{ description }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "RouteCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      default: "bi bi-slash-circle",
    },
  },
};
</script>

<style scoped>
.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transform: scale(1.01);
  cursor: pointer;
}
.route-card {
  background-color: #f5f5f5;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin-bottom: 1rem;
}

.card-header {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.5rem;
}
.card-header h1 {
  font-size: 2rem;
  margin: 0;
  text-align: center;
  user-select: none;
}
.card-body {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.card-body i {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.card-body p {
  font-size: 1.25rem;
  margin-bottom: 0;
  text-align: center;
  user-select: none;
}
</style>