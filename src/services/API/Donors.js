const ENDPOINT = "https://192.168.1.1:5001/api/donor";
const MILLISECONDS_IN_YEAR = 31536000000;

export const getDonors = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const { $values } = await response.json();
    const valuesWithAge = $values.map((donor) => {
      const age = (new Date() - new Date(donor.birthDate)) / MILLISECONDS_IN_YEAR;
      return { ...donor, age: +age.toFixed(0) };
    });
    return valuesWithAge;
  } catch (error) {
    console.error(error);
  }
};

export const addDonor = async (donor) => {
  console.log('donor', donor);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donor),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const deleteDonor = async (id) => {
  try {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("error", response.error);
  } catch (error) {
    console.error(error);
  }
}