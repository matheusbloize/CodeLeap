// CSS and Images
import "./Pagination.css"
import arrowIcon from "/images/arrow.png"

const Pagination = ({ currentPage, previousPage, nextPage, totalPages }) => {

  return (
    <nav className="pagination">
      {currentPage == 1 ?
        (
          <button style={{ cursor: "not-allowed" }} onClick={previousPage}>
            <img src={arrowIcon} alt="Left Arrow Icon" />
          </button>
        ) : (
          <button onClick={previousPage}>
            <img src={arrowIcon} alt="Left Arrow Icon" />
          </button>
        )
      }
      <span>
        {currentPage}
      </span>
      {currentPage >= totalPages  ?
        (
          <button style={{ cursor: "not-allowed" }} onClick={nextPage}>
            <img src={arrowIcon} alt="Right Arrow Icon" style={{ transform: "rotateZ(180deg" }} />
          </button>
        ) : (
          <button onClick={nextPage}>
        <img src={arrowIcon} alt="Right Arrow Icon" style={{ transform: "rotateZ(180deg" }} />
      </button>
        )
      }
    </nav>
  )
}

export default Pagination