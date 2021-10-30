<template>
  <div class="user-info">
    <div class="user-info__basic">
      <div class="user-info__avatar">
        <img :src="userInfo.profilePicURL" alt="" />
      </div>
      <div class="user-info__name">
        <p>
          {{ userInfo.fullName }}
        </p>
      </div>
    </div>
    <div class="user-info__contact-info">
        <p>Tipo de sangre: {{userInfo.bloodGroup.bloodType}}{{userInfo.bloodGroup.rh}}</p>
        <hr>
        <p>Domicilio: {{contactInfo.address}}, {{contactInfo.postalCode}} - {{contactInfo.city}}, {{contactInfo.state}}</p>
        <p>Teléfono: {{contactInfo.phone}}</p>
        <p>Correo Electrónico: {{contactInfo.email}}</p>
    </div>
    
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "UserInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const userInfo = ref(props.user);
    const contactInfo = ref(userInfo.value.contactInfo);
    console.log(userInfo.value);
    return {
      userInfo,
      contactInfo
    };
  },
};
</script>

<style>
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
</style>