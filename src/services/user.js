import api from './api'

const userService  = {
    list: async () => {
        return await api.get('http://localhost:4002/api/v1/users')
    }
} 

export default userService 