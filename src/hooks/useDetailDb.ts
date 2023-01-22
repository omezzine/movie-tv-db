import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import constants from '../constants';
import { toast } from 'react-toastify';
import { Movie } from '../models/movie';

interface UseDetailPropsI {
  type?: string;
  id?: string;
  apiKey: string;
}

export const useDetailDb = (props: UseDetailPropsI) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setApiData] = useState<Movie>();
  const [serverError, setServerError] = useState<AxiosError>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get<any>(`${constants.MOVIE_SERIE_DB.ENDPOINT}/${props.type}/${props.id}?api_key=${props.apiKey}`)
        .then((data) => {
          setApiData(data.data);
        })
        .catch((error: AxiosError) => {
          setServerError(error);
          toast(error.message, { type: 'error' });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  return { isLoading, data, serverError };
};
