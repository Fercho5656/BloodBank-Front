<template>
  <div class="user-info">
    <header class="user-info__basic">
      <div class="user-info__avatar">
        <img :src="userInfo.profilePicURL" alt="" />
      </div>
      <div class="user-info__name">
        <p>
          {{ userInfo.fullName }}
        </p>
      </div>
      <div class="actions">
        <button class="btn print">
          <i class="bi bi-pencil" @click="$emit('edit-user')"></i>
        </button>
        <button class="btn print" @click="$emit('delete-user', userInfo.id)">
          <i class="bi bi-trash"></i>
        </button>
        <button class="btn btn-success print" @click="print">
          <i class="bi bi-printer"></i>
        </button>
      </div>
    </header>
    <div class="user-info__contact-info">
      <p>
        Tipo de sangre: {{ userInfo.bloodGroup.bloodType
        }}{{ userInfo.bloodGroup.rh }}
      </p>
      <hr />
      <ul>
        <li>
          Domicilio: {{ contactInfo.address }}, {{ contactInfo.postalCode }} -
          {{ contactInfo.city }}, {{ contactInfo.state }}
        </li>
        <li>Teléfono: {{ contactInfo.phone }}</li>
        <li>Correo Electrónico: {{ contactInfo.email }}</li>
        <li>Banco: {{ userInfo.bloodBank.bankName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "UserInfo",
  emits: ["delete-user", "edit-user"],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const userInfo = ref(props.user);
    const contactInfo = ref(userInfo.value.contactInfo);

    const print = () => {
      window.print();
    };

    return {
      print,
      userInfo,
      contactInfo,
    };
  },
};
</script>

<style scoped>
@media print {
  .print {
    display: none;
  }
  @page {
    size: portrait;
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
}
.user-info__basic {
  display: flex;
  align-items: baseline;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.user-info__avatar img {
  width: 4rem;
  height: 4rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}
.user-info__name p {
  font-weight: bold;
}
.user-info__contact-info {
  font-size: 0.85rem;
  padding: 0.5rem;
}
.user-info__contact-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.user-info__contact-info ul li {
  margin-bottom: 0.5rem;
}
</style>