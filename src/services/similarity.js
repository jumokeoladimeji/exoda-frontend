import api from './api'

const similarityService  = {
    list: async (userId) => {
        return await api.get(`http://localhost:4000/api/v1/users/${userId}/transactions/trends/similarity`)
    }
} 

export default similarityService 