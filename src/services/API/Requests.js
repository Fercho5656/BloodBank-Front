const ENDPOINT = 'https://localhost:5001/api/request/'

export const getRequests = async () => {
    try {
        const response = await fetch(ENDPOINT)
        const data = await response.json()
        return data.$values
    } catch (error) {
        console.error(error)
    }
}

export const createRequest = async (request) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                Application: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}