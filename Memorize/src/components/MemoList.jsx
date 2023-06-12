import React, { useContext, useReducer, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { MdCleaningServices } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MEMO_URL } from "../App";
import { getAllTodosFn, fetchMemos } from "../api";
import { BASED_URL, MEMO_ITEM_URL } from "../App";
import { useQuery } from "react-query";
import MemoItem from "./MemoItem";
const MemoList = (props) => {
  const dragRefId = useRef(null);
  const dragOverRef = useRef(null);

  const { data, isLoading, error } = useQuery("memostate", fetchMemos, {});
  if (isLoading) {
    return <p> ...loading</p>;
  }
  if (error) {
    return <p> error</p>;
  }

  return (
    <>
      {data ? (
        data.map((memo) => <MemoItem key={memo.id} memo={memo} />)
      ) : (
        <></>
      )}
    </>
  );
};

export default MemoList;
