<template>
  <div class="container">
    <div class="row shadow align-items-center">
      <div class="col-10">
        <button
          class="btn btn-success btn-lg"
          @click="showAddDonorModal = true"
          id="addDonor"
        >
          Añadir Donador
        </button>
      </div>
      <div class="col-2">
        <button class="btn" id="reload" @click="reloadDonors">
          <i class="bi bi-arrow-clockwise text-info"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="donor in donors" :key="donor.id">
        <UserCard
          :user="donor"
          @click="
            showDonorInfoModal = true;
            selectedDonor = donor;
          "
        />
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
  <Modal
    :show="showAddDonorModal"
    @close="showAddDonorModal = false"
    @keydown.esc="showAddDonorModal = false"
    tabindex="0"
  >
    <DonorForm :addRow="postDonor" :bloodGroups="bloodGroups" />
  </Modal>
  <Modal
    :show="showDonorInfoModal"
    @close="showDonorInfoModal = false"
    @keydown.esc="showDonorInfoModal = false"
    tabindex="0"
  >
    <UserInfo :user="selectedDonor" @delete-user="deleteUser" />
  </Modal>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import UserInfo from "../components/Donors/UserInfo.vue";
import DonorForm from "../components/Donors/DonorForm.vue";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import { onMounted, ref, reactive } from "vue";
import { getDonors, addDonor, deleteDonor } from "../services/API/Donors";
import { getBloodGroupsInfo } from "../services/API/BloodGroups";
import { addContactInfo } from "../services/API/ContactInfo";
import { uploadToCloudinary } from "../services/Cloudinary/Upload";
export default {
  name: "Donors",
  components: { UserCard, UserInfo, Loading, Modal, DonorForm },
  setup() {
    const donors = ref([]);
    const isLoading = ref(true);
    const showDonorInfoModal = ref(false);
    const showAddDonorModal = ref(false);
    const bloodGroups = ref([]);
    let selectedDonor = reactive({});

    const getAllDonors = async () => {
      isLoading.value = true;
      const response = await getDonors();
      isLoading.value = false;
      return response;
    };

    const postDonor = async (donor) => {
      isLoading.value = true;
      const { address, city, email, phone, postalCode, state } = donor;
      const contactInfoData = {
        address,
        city,
        email,
        phone,
        postalCode: postalCode + "",
        state,
      };

      const imgResponse = await uploadImg(donor.profilePic);
      const contactInfoResponse = await addContactInfo(contactInfoData);
      const donorBody = {
        ...donor,
        bloodBankId: 1,
        contactInfoId: contactInfoResponse.id,
        profilePicURL: imgResponse.url,
      };
      // eslint-disable-next-line no-unused-vars
      const donorResponse = await addDonor(donorBody);
      /* console.log('donorResponse', donorResponse);
      console.log('imgResponse', imgResponse);
      console.log('contactInfoResponse', contactInfoResponse); */
      /* donors.value.push({
        ...contactInfoResponse,
        ...donorResponse,
        bloodBankId: 1,
        profilePicURL: imgResponse.url,
        contactInfoId: contactInfoResponse.id,
      }) */
      reloadDonors();
      isLoading.value = false;
      showAddDonorModal.value = false;
    };

    const deleteUser = async (id) => {
      if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        isLoading.value = true;
        await deleteDonor(id);
        //donors.value = donors.value.filter((donor) => donor.id !== id);
        donors.value = await getAllDonors();
        showDonorInfoModal.value = false;
        isLoading.value = false;
      }
    };

    const reloadDonors = async () => {
      isLoading.value = true;
      donors.value = await getAllDonors();
      isLoading.value = false;
    };

    const uploadImg = async (img) => {
      const response = await uploadToCloudinary(img);
      return response;
    };

    onMounted(async () => {
      bloodGroups.value = await getBloodGroupsInfo();
      donors.value = await getAllDonors();
      console.log(donors.value)
    });

    return {
      donors,
      isLoading,
      showDonorInfoModal,
      selectedDonor,
      showAddDonorModal,
      uploadImg,
      postDonor,
      bloodGroups,
      reloadDonors,
      deleteUser,
    };
  },
};
</script>

<style>
#addDonor {
  width: 100%;
}
#reload {
  flex-grow: 2;
}
</style>