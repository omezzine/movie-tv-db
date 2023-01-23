import constants from '../../constants';
import { Movie } from '../../models/movie';
import noImagePlaceHolder from '../../assets/No-Image-Placeholder.svg.png';
import './dbCard.scss';
import { DbType } from '../../models/db';
import { Tv } from '../../models/tv';

export interface OnCardClickEvent {
  id: number;
  type: DbType;
}
interface DbCardPropsI {
  type?: DbType;
  data: Movie & Tv;
  onClick: (obj: OnCardClickEvent) => void;
}

const DbCard: React.FC<DbCardPropsI> = ({ data, onClick, type }) => {
  const imagePath = data.backdrop_path
    ? `${constants.MOVIE_SERIE_DB.IMAGE_PATH}${data.backdrop_path}`
    : noImagePlaceHolder;
  return (
    <>
      <div className="card" onClick={(e) => onClick({ id: data.id, type: type || 'movie' })}>
        {<img className="card-img-top" src={imagePath} alt="Card image cap" />}
        <div className="card-body">
          <h5 className="card-title">{data.original_title || data.name}</h5>
          <p className="card-text text-truncate">{data.overview}</p>
        </div>
      </div>
    </>
  );
};

export default DbCard;
