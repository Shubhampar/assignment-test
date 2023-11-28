import React from "react";
import style from "../Styles/pagination.module.css";
import { Button } from "@chakra-ui/react";

function Pagination({ page, setPage }) {
  let totalpage = 20;

  let pages = [];
  if (page == 1) {
    pages = [page, page + 1, page + 2, page + 3, page + 4];
  } else if (page == 2) {
    pages = [page - 1, page, page + 1, page + 2, page + 3];
  } else if (page == totalpage - 1) {
    pages = [page - 3, page - 2, page - 1, page, page + 1];
  } else if (page == totalpage) {
    pages = [page - 4, page - 3, page - 2, page - 1, page];
  } else {
    pages = [page - 2, page - 1, page, page + 1, page + 2];
  }


  return (
    <div className={style.pageDiv}>
      <Button className={style.sideButton} onClick={() => setPage((prev) => prev - 1)} isDisabled={page == 1}>
        Prev
      </Button>
      {pages.map((num) => (
        <Button
          colorScheme={num == page ? 'messenger' : null}
          onClick={() => setPage(num)}
        >
          {num}
        </Button>
      ))}
      <Button className={style.sideButton}
        onClick={() => setPage((prev) => prev + 1)}
        isDisabled={page == totalpage}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
