const ENDPOINT = 'https://localhost:5001/api/Donation'

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