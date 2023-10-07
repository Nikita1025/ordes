import baseApi from 'src/api/base-api';
import { LoginFormType, LoginResponseType } from 'src/utils';

export const authApi = {
  async login(loginData: LoginFormType) {
    const { data } = await baseApi.post<LoginResponseType>('/api-token-auth/', loginData);

    return data;
  },
};
