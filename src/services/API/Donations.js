const ENDPOINT = 'https://localhost:5001/api/Donation'

export const addDonation = async (donation) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donation)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getDonations = async () => {
    try {
        const response = await fetch(ENDPOINT)
        const { $values } = await response.json()
        const donations = $values.map(donation => {
            return {
                ...donation,
                date: new Date(donation.date).toLocaleDateString()
            }
        })

        return donations
    } catch (error) {
        console.log(error)
    }
}