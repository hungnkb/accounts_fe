import { GroupData } from '../components/Addform';
import instance from '../ultis/axios';

export const getGroupData = async (): Promise<GroupData[]> => {
  return await instance.get('/groups');
};
