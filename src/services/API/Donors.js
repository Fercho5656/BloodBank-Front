const ENDPOINT = "https://localhost:5001/api/donor/";
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
