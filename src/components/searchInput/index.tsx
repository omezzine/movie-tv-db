import { QueryI } from '../../hooks/useSearchDb';
import './style.scss';

interface SearchInputPropsI {
  placeHolder?: string;
  defaultValue: QueryI;
  onInputChange: (obj: QueryI) => void;
  onTypeChange: (obj: QueryI) => void;
}
type dbType = 'movie' | 'tv';

const SearchInput: React.FC<SearchInputPropsI> = ({ placeHolder, onInputChange, onTypeChange, defaultValue }) => {
  return (
    <div className="search-input">
      <div className="input-group">
        <input
          defaultValue={defaultValue.query}
          onChange={(e) => onInputChange({ query: e.currentTarget.value })}
          type="text"
          className="form-control"
          placeholder={placeHolder}
          aria-label={placeHolder}
          aria-describedby="basic-addon2"
        />
        <div className="input-group-prepend">
          <select
            defaultValue={defaultValue.type || 'movie'}
            className="form-select"
            aria-label="Select Search Type"
            onChange={(e) => onTypeChange({ type: e.target.value as dbType, page: '1' })}
          >
            <option value="movie">Movie</option>
            <option value="tv">Serie</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
