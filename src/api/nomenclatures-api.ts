import Cookies from 'js-cookie';
import { NomenclaturesResponseType } from 'src/utils';

import baseApi from './base-api';

const token = Cookies.get('Token');

export const nomenclaturesApi = {
  async getNomenclatures() {
    const { data } = await baseApi.get<NomenclaturesResponseType>('/nomenclatures/', {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
};
