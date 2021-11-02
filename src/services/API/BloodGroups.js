const ENDPOINT = 'https://localhost:5001/api/bloodbank_bloodgroup';

export const getBloodGroups = async () => {
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getBloodGroupsInfo = async () => {
    try {
        const response = await fetch(ENDPOINT);
        const { $values } = await response.json();
        const bloodGroups = $values.map(data => data.bloodGroup)
        return bloodGroups;
    } catch (error) {
        console.error(error);
    }
};

export const getByBankId = async (bankId) => {
    try {
        const response = await fetch(`${ENDPOINT}/${bankId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};