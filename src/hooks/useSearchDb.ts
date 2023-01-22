import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import constants from '../constants';
import { toast } from 'react-toastify';
import { Movie } from '../models/movie';

import { useSearchParams } from 'react-router-dom';

export interface QueryI {
  page?: string;
  type?: 'movie' | 'tv';
  query?: string;
}
interface UseSearchPropsI {
  debounce?: number;
  query?: QueryI;
  apiKey: string;
}
interface SerchData {
  movies: Movie[];
  count: number;
  page: number;
  totalPages: number;
}

const paramsToObject = (entries: IterableIterator<[string, string]>) => {
  const result: Record<string, any> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

export const useSearchDb = (props: UseSearchPropsI) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setApiData] = useState<SerchData>();
  const [serverError, setServerError] = useState<AxiosError>();
  const [query, setQuery] = useState<QueryI>({ ...paramsToObject(searchParams.entries()), ...{ type: 'movie' } });

  const updateQuery = (obj: QueryI) => {
    setQuery({
      ...query,
      ...obj,
    });
  };
  useEffect(() => {
    if (query?.query?.trim().length === 0) {
      setApiData(null);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      setSearchParams(query as any);
      await axios
        .get<any>(
          `${constants.MOVIE_SERIE_DB.ENDPOINT}/search/${query.type}?api_key=${props.apiKey}&query=${
            query.query
          }&page=${query.page || ''}`,
        )
        .then((data) => {
          setApiData({
            movies: data.data.results,
            count: data.data.total_results,
            page: data.data.page,
            totalPages: data.data.total_pages,
          });
        })
        .catch((error: AxiosError) => {
          setServerError(error);
          toast(error.message, { type: 'error' });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    let fetchDataTimeout: any;
    if (props.debounce) {
      fetchDataTimeout = setTimeout(() => fetchData(), props.debounce);
    } else {
      fetchData();
    }

    return () => clearTimeout(fetchDataTimeout);
  }, [query]);

  return { isLoading, data, updateQuery, serverError, query };
};
