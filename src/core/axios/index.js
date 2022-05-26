import rootAxios from 'axios';

let baseUrl = process.env.NEXT_PUBLIC_API_URL;
const axios = rootAxios.create({
  baseURL: baseUrl,
});

export { axios };
