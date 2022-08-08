import { IPagination } from '../../types/types';
import './Pagination.css';

function Pagination(props: IPagination) {
  const isPrevDisabled = props.isDisabled || props.page === 1;
  const isNextDisabled = props.isDisabled || props.page * props.pageSize >= props.count;
  return (
    <div className="pagination">
      <button
        type="button"
        className={`pagination__prev-button button${isPrevDisabled ? ' disabled' : ''}`}
        disabled={isPrevDisabled}
        onClick={() => props.setPage(props.page - 1)}
      >
        PREV
      </button>
      <button
        type="button"
        className={`pagination__next-button button${isNextDisabled ? ' disabled' : ''}`}
        disabled={isNextDisabled}
        onClick={() => props.setPage(props.page + 1)}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
