const ENDPOINT = 'https://localhost:5001/api/bloodbanks'

export const getAllBloodBanks = async () => {
    try {
        const response = await fetch(ENDPOINT)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}