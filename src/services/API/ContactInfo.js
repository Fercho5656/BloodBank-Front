const CONTACT_INFO_ENDPOINT = "https://192.168.1.1:5001/api/ContactInfo";

export const addContactInfo = async (contactInfo) => {
    try {
        const response = await fetch(CONTACT_INFO_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactInfo),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
