const ENDPOINT = 'https://192.168.1.1:5001/api/bloodbanks'

export const getAllBloodBanks = async () => {
    try {
        const response = await fetch(ENDPOINT)
        const {$values} = await response.json()
        return $values
    } catch (error) {
        console.error(error)
    }
}