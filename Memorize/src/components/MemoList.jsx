import React from "react";

import { getAllMemo } from "../api";
import { useQuery } from "react-query";
import MemoItem from "./MemoItem";
const MemoList = () => {
  const { data, isLoading, error } = useQuery("memo-state", getAllMemo, {});
  if (isLoading) {
    return <p> ...loading</p>;
  }
  if (error) {
    return <p> error</p>;
  }

  return (
    <>
      {data ? (
        data.map((memo) => (
          <MemoItem className="justify-between" key={memo.id} memo={memo} />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default MemoList;
