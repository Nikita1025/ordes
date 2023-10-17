import Cookies from 'js-cookie';
import baseApi from 'src/api/base-api';
import {
  EditPurchaseOrderType,
  PurchaseOrdersResponseType,
  PurchaseOrderType,
} from 'src/utils';

const token = Cookies.get('Token');

export const purchaseOrdersApi = {
  async getPurchaseOrders(search?: string, filter?: number) {
    const { data } = await baseApi.get<PurchaseOrdersResponseType>(
      `/workorders/?is_finished__exact=${filter}`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );

    return data;
  },
  async getPurchaseOrder(id: string) {
    const { data } = await baseApi.get<PurchaseOrderType>(`workorders/${id}/ `, {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
  async editPurchaseOrder(editData: EditPurchaseOrderType, id: string) {
    const { data } = await baseApi.put(`workorders/${id}/ `, editData, {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
  async addPurchaseOrder(addData: any) {
    const { data } = await baseApi.post('workorders/', addData, {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  },
};
