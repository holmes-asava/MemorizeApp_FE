import React, { useContext, useReducer, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { MdCleaningServices } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { getAllMemo } from "../api";
import { useQuery } from "react-query";
import MemoItem from "./MemoItem";
const MemoList = (props) => {
  const dragRefId = useRef(null);
  const dragOverRef = useRef(null);

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
