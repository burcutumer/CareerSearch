import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:7064/api/';
axios.defaults.withCredentials= true;

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const responseBody = (response: AxiosResponse) => response.data.data;

 const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
 }

const Jobs = {
    list: () => requests.get('JobPosting'),
    listEmployer: () => requests.get('JobPosting/employer'),
    details: (id: number) => requests.get(`JobPosting/${id}`),
    detailsEmployer: (id: number) => requests.get(`JobPosting/employer/${id}`),
    addJob: (values:any) => requests.post('JobPosting', values)
}

const Applications = {
    list: () =>requests.get('JobApplication'),
    details: (id: number) => requests.get(`JobApplication/${id}`),
    addApplication: (values:any) => requests.post('JobApplication', values)
}

const Account = {
    login: (values: any) => requests.post('auth',values),
    register: (values: any) => requests.post('user',values),
    curentUser: () => requests.get('user'),
}

const agent = {
    Jobs,
    Applications,
    Account
}

export default agent;