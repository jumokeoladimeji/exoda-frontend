
import axios from 'axios';

const service = {
    async get(path) {
      // try {
        const response = await axios.get(`${path}`);
        return response;
      // } catch(error) {
      //   return error;
      // }

    }
}

export default service;