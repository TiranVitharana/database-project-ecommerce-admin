import styles from "./pagination.module.css";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {/* Show page numbers */}
      {Array.from({ length: pageNumbers }, (_, index) => (
        <button
          key={index + 1}
          className={`${styles.button} ${currentPage === index + 1 ? styles.active : ''}`}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={styles.button}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
