<template>
  <transition name="fade">
    <div class="modal-wrapper" v-if="showModal">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    show: function (val) {
      this.showModal = val;
    },
  },
  methods: {
    close() {
      //this.showModal = false;
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.modal-content {
  width: 500px;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(182, 166, 166, 0.5);
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>