import './home.scss';
import SearchInput from '../../components/searchInput';
import DbCard, { OnCardClickEvent } from '../../components/dbCard';
import useTitle from '../../hooks/useTitle';
import { useSearchDb } from '../../hooks/useSearchDb';
import { Spinner } from '../../components/spinner';
import Pagination from '../../components/pagination';
import constants from '../../constants';
import { useNavigate } from 'react-router-dom';

function Home() {
  useTitle('Home');
  const navigate = useNavigate();
  const { isLoading, data, updateQuery, query } = useSearchDb({
    debounce: 500,
    apiKey: constants.MOVIE_SERIE_DB.API_KEY,
  });

  const onPaginationchange = (offset: string) => {
    updateQuery({ page: offset });
  };

  const onCardClick = (obj: OnCardClickEvent) => {
    navigate(`/details/${obj.type}/${obj.id}`);
  };

  return (
    <div className="container">
      <h1 className="text-center title">Welcome to Movie/Tv DB !</h1>
      <div className="row">
        <SearchInput
          defaultValue={query}
          placeHolder="Search for movies/series.."
          onInputChange={updateQuery}
          onTypeChange={updateQuery}
        />
      </div>
      <div className="row">
        {data && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={query.page}
            offset={data.page}
            onChange={onPaginationchange}
          />
        )}
      </div>
      <div className="row search-result">
        {isLoading && <Spinner />}
        {data &&
          data.movies.map((item) => (
            <div key={item.id} className="col-md-3 card-movie">
              <DbCard type={query.type} data={item} onClick={onCardClick} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
