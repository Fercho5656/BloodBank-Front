<template>
  <article class="container">
    <header class="report-filter">
      <div class="form-group mx-2">
        <label for="initialDate" class="form-label">Desde...</label>
        <input
          type="date"
          id="initialDate"
          v-model="initialDate"
          class="form-control"
        />
      </div>
      <div class="form-group mx-2">
        <label for="finalDate" class="form-label">Hasta...</label>
        <input
          type="date"
          id="finalDate"
          v-model="finalDate"
          class="form-control"
        />
      </div>
      <div class="form-group mx-2">
        <button
          class="btn btn-success"
          @click="print"
          :disabled="!initialDate || !finalDate || donationsList.length === 0"
        >
          <i class="bi bi-printer"></i>
        </button>
      </div>
    </header>
    <p class="donation-range">
      Donaciones del {{ initialDate }} al {{ finalDate }}
    </p>
    <DataTable
      :headers="['#', 'Fecha', 'Donador', 'Tipo de Sangre', 'Cantidad (mL)']"
      :content="donationsList"
      :readonly="true"
      :exclude="['id', 'contactInfoId', 'country']"
      :hoverable="false"
      :dark="false"
    />
  </article>
</template>

<script>
import { ref } from "vue";
import DataTable from "../DataTable.vue";
export default {
  name: "DonationReport",
  components: {
    DataTable,
  },
  props: {
    donations: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const initialDate = ref("");
    const finalDate = ref("");

    const print = () => window.print();
    return {
      initialDate,
      finalDate,
      print,
    };
  },
  computed: {
    donationsList() {
      //Returns the donations made between the initial and final dates
      const donations = this.donations.filter((donation) => {
        const date = new Date(donation.date);
        const initial = new Date(this.initialDate);
        const final = new Date(this.finalDate);
        //Removes the time from the dates
        date.setHours(0, 0, 0, 0);
        initial.setHours(0, 0, 0, 0);
        final.setHours(0, 0, 0, 0);
        //Adds one day to inital and final dates
        initial.setDate(initial.getDate() + 1);
        final.setDate(final.getDate() + 1);

        return date >= initial && date <= final;
      });

      //returns number, date, donor, bloodtype and quantity of the donations
      return donations.map((donation) => {
        return [
          donation.id,
          donation.date,
          donation.donor.fullName,
          `${donation.donor.bloodGroup.bloodType}${donation.donor.bloodGroup.rh}`,
          `${donation.quantity} mL`,
        ];
      });
    },
  },
};
</script>

<style scoped>
.report-filter {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.donation-range {
  visibility: hidden;
}
@media print {
  .report-filter {
    display: none;
  }
  .donation-range {
    visibility: visible;
  }
  @page {
    size: portrait;
  }
}
</style>