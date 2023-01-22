import constants from '../../constants';
import { Movie } from '../../models/movie';
import noImagePlaceHolder from '../../assets/No-Image-Placeholder.svg.png';
import './dbCard.scss';

export interface OnCardClickEvent {
  id: number;
  type: 'movie' | 'tv';
}
interface DbCardPropsI {
  type?: 'movie' | 'tv';
  data: Movie;
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
          <h5 className="card-title">{data.original_title}</h5>
          <p className="card-text text-truncate">{data.overview}</p>
        </div>
      </div>
    </>
  );
};

export default DbCard;
