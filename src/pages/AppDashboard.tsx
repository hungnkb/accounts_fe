import { useOutletContext } from 'react-router-dom';
import Table from '../components/Table';
import { Authorization } from './ProtectedRoutes';
import { useEffect, useState } from 'react';
import { getItemData } from '../services/items';

export interface Context {
  authorization: Authorization;
}

export interface Category {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  accountId: number;
  categoryId: number;
  category: Category;
}

export interface ItemData {
  number?: number;
  name?: string;
  group?: Group;
  username?: string;
  email?: string;
  password?: string;
  id?: number;
}

const initialItemData: ItemData[] = [];

function AppDashboard() {
  const [data, setData] = useState(initialItemData);
  const context: Context = useOutletContext();

  useEffect(() => {
    const fetchItemData = async () => {
      const res = await getItemData();
      setData(res);
    };
    fetchItemData();
  }, [context.authorization]);

  return (
    <>
      <Table data={data} />
    </>
  );
}

export default AppDashboard;
