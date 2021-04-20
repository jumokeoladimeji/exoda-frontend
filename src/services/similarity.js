import api from './api'

const similarityService  = {
    list: async (userId) => {
        return await api.get(`${process.env.REACT_APP_SIMILARITY_SERVICE_URL}/api/v1/users/${userId}/transactions/trends/similarity`)
    }
} 

export default similarityService 