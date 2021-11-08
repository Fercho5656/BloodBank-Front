const ENDPOINT = 'https://localhost:5001/api/request/'

export const getRequests = async () => {
    try {
        const response = await fetch(ENDPOINT)
        const { $values } = await response.json()
        const requests = $values.map(request => {
            return {
                ...request,
                date: new Date(request.date).toLocaleDateString()
            }
        })
        return requests
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

export const updateRequest = async (request, requestId) => {
    try {
        const response = await fetch(`${ENDPOINT}${requestId}`, {
            method: 'PUT',
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