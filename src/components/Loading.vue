<template>
  <div class="loading-container">
    <div class="loading-icon">
      <svg class="circular" viewBox="25 25 50 50">
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
    <div class="loading-text">
      <strong class="text-white">{{ text }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Cargando...",
    },
  },
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.loading-icon {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circular {
  position: relative;
  width: 50px;
  height: 50px;
}
.circular .path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: loading-dash 1.5s ease-in-out infinite,
    loading-color 6.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite,
    loading-color 6.5s ease-in-out infinite;
  stroke-linecap: round;
}
.circular .path.second {
  stroke: #f44336;
  stroke-dashoffset: -100;
  -webkit-animation: loading-dash 1.5s ease-in-out infinite,
    loading-color 6.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite,
    loading-color 6.5s ease-in-out infinite;
}
@-webkit-keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@-webkit-keyframes loading-color {
  0%,
  80%,
  100% {
    stroke: #f44336;
  }
  40% {
    stroke: #9c27b0;
  }
  60% {
    stroke: #03a9f4;
  }
}
@keyframes loading-color {
  0%,
  80%,
  100% {
    stroke: #f44336;
  }
  40% {
    stroke: #9c27b0;
  }
  60% {
    stroke: #03a9f4;
  }
}
.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>