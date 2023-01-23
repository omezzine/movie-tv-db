import './details.scss';
import noImagePlaceHolder from '../../assets/No-Image-Placeholder.svg.png';
import useTitle from '../../hooks/useTitle';
import { useDetailDb } from '../../hooks/useDetailDb';
import constants from '../../constants';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components/spinner';
import { useEffect, useState } from 'react';
import { DbType } from '../../models/db';

function Details() {
  useTitle('Details');
  let { id, type } = useParams();
  const { isLoading, data } = useDetailDb({ apiKey: constants.MOVIE_SERIE_DB.API_KEY, id, type: type as DbType });
  const [imagePath, setImagePath] = useState<string>();

  useEffect(() => {
    setImagePath(
      data?.backdrop_path ? `${constants.MOVIE_SERIE_DB.IMAGE_PATH}${data.backdrop_path}` : noImagePlaceHolder,
    );
  }, [data]);

  return (
    <div className="container details">
      {isLoading && <Spinner />}
      {data && (
        <>
          <h1 className="text-center title">{data.title || data.name}</h1>
          <img className="card-img-top" src={imagePath} alt="Card image cap" />
          <h4>Released Date:</h4>
          <p>{data.release_date || data.first_air_date}</p>
          <h4>Overview:</h4>
          <p>{data.overview}</p>
        </>
      )}
    </div>
  );
}

export default Details;
