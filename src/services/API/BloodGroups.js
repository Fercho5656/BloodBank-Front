const ENDPOINT = 'https://192.168.1.1:5001/api/bloodbank_bloodgroup';
const ENDPOINT_GENERIC = 'https://192.168.1.1:5001/api/bloodgroup';

export const getBloodGroups = async () => {
    try {
        const response = await fetch(ENDPOINT_GENERIC);
        const {$values} = await response.json();
        return $values;
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
        const {$values} = await response.json();
        return $values;
    } catch (error) {
        console.error(error);
    }
};