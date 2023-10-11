import Cookies from 'js-cookie';
import baseApi from 'src/api/base-api';
import { NomenclaturesResponseType } from 'src/utils';

const token = Cookies.get('Token');

export const nomenclaturesApi = {
  async getNomenclatures() {
    const { data } = await baseApi.get<NomenclaturesResponseType>('/nomenclatures/', {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
};
