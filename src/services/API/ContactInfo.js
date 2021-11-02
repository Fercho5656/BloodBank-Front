const CONTACT_INFO_ENDPOINT = "https://localhost:5001/api/ContactInfo";

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
