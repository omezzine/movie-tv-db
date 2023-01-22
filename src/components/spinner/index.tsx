import  './spinner.scss';
export const Spinner = () => (
  <div role="alert" aria-busy="true" className='loader-container'>
    <div className='loader'></div>
  </div>
);