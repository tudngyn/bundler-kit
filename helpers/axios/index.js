import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    const { data, status } = response;
    return {
      status: data.status,
      data: data.data,
      message: data.message,
      statusCode: status,
    };
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(path) {
    return this.service.get(path);
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }

  put(path, payload) {
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }
}

export default new Service();
