import Cookies from 'js-cookie';

import { PurchaseOrdersResponseType } from '../utils';

import baseApi from './base-api';
const token = Cookies.get('Token');

export const purchaseOrdersApi = {
  async getPurchaseOrders() {
    const { data } = await baseApi.get<PurchaseOrdersResponseType>('/workorders/', {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
};
