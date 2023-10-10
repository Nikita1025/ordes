import Cookies from 'js-cookie';
import baseApi from 'src/api/base-api';
import { createProductRequestType, ProductsResponseType } from 'src/utils';

const token = Cookies.get('Token');

export const productsApi = {
  async getProducts(work_order_id: string) {
    const { data } = await baseApi.get<ProductsResponseType[]>(
      `/workorders/${work_order_id}/products/`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );

    return data;
  },
  async createProduct(newData: createProductRequestType) {
    const { data } = await baseApi.post<ProductsResponseType>(
      `/workorders/${newData.id}/products/`,
      newData.data,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );

    return data;
  },
};
