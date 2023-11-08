type props = {
  currentPage: number;
  pagesTotal: number;
  showPrevPage: () => void;
  showNextPage: () => void;
  hide: boolean;
};
export const Navigation = ({
  currentPage,
  pagesTotal,
  showPrevPage,
  showNextPage,
  hide,
}: props) => {
  return hide ? null : (
    <div id="navigation">
      {currentPage !== 1 && <button onClick={showPrevPage}>{"<"}</button>}
      <span>
        {currentPage}/ {pagesTotal}
      </span>
      {currentPage < pagesTotal && (
        <button onClick={showNextPage}>{">"}</button>
      )}
    </div>
  );
};
