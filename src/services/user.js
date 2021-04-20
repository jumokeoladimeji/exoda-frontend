import api from './api'

const userService  = {
    list: async () => {
        try {
            return await api.get(`${process.env.REACT_APP_USER_SERVICE_URL
    }/api/v1/users`);
        } catch(error) {
            return error;
        }
    }
} 

export default userService 