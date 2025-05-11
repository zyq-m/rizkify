import api from '@/utils/axios';
import { useEffect, useState } from 'react';

type CategoryT = {
  id: string;
  name: string;
  image?: string;
};

const useCategory = () => {
  const [category, setCategory] = useState<CategoryT[]>([]);

  useEffect(() => {
    api
      .get('/category')
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { category };
};

export default useCategory;
