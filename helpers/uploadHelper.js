import { normalizeUrl } from 'Helpers/urlHelper';
import _isEmpty from 'lodash/isEmpty';

export const defaultAuthData = {
  token:
    'Wls1dLC2ny0sj0kU6Lb0/2kC/NgI3cM3dOKkU+/44CovzL0C0N9miHmw9SR0K7WRSmjAKDkNyKphy4dH9fbeozb4PE8Vbwx5u8fJwZK4qW1YMGtU1TE+Pc5m6O/an2Kj5Lwa6cJCK7+tBUmPcLwmfo0OO3vNWhi9bCA843IGbTA=',
  shopexternalid: '12070',
  sendoid: '2000001638',
};

export const getApiUrl = (uploadUrl, apiUrl) => {
  if (uploadUrl && apiUrl) {
    return normalizeUrl(uploadUrl, true);
  }
  console.log('error: missing params');
};

export const UploadImage = (imageFile, apiUrl, authData) => {
  const name = 'file';
  const hasProtocol = /^http(|s)?:\/\//.test(apiUrl);
  if (_isEmpty(authData)) {
    authData = defaultAuthData;
  }
  if (imageFile && apiUrl && apiUrl !== '/' && hasProtocol) {
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append(name, imageFile);
      let xhr = new XMLHttpRequest();
      xhr.open('post', apiUrl, true);
      xhr.setRequestHeader(
        'authdata',
        JSON.stringify({
          token: authData.token.toString(),
          id: authData.shopexternalid.toString(),
          sendoid: authData.sendoid.toString(),
        })
      );
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.send(imageFormData);
    });
  } else {
    console.log('error: missing file or api');
  }
};
