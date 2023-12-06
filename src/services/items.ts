import { ItemData } from '../pages/AppDashboard';
import instance from '../ultis/axios';

export type CreateOneData = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  groupId?: number;
};

export const getItemData = async (): Promise<ItemData[]> => {
  return await instance.get('/items');
};

export const createOne = async (data: CreateOneData) => {
  return await instance.post('/items', data);
};
