import React, { useContext, useReducer, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { MdCleaningServices } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MEMO_URL } from "../App";
import { getAllTodosFn, deleteTodoitem } from "../api";

import { useQuery, useMutation } from "react-query";
const makeApiRequest = async (url, method, data) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      if (method === "DELETE") {
        console.log("?");
        return;
      }

      return await response.json();
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
const MemoItem = (props) => {
  const dragRefId = useRef(null);
  const dragOverRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  // const { memoState, dispatchMemo } = useContext(MemoContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateMemoItemsStatus = async (target_id, data) => {
    const url = MEMO_ITEM_URL(props.memo.id, target_id);
    return await makeApiRequest(url, "PATCH", data);
  };
  const updateMemoItems = async (data) => {
    const url = MEMO_ITEM_URL(props.memo.id, dragRefId.current);
    return await makeApiRequest(url, "PATCH", data);
  };

  const addNewMemoItem = async (data) => {
    const url = MEMO_ITEM_URL(props.memo.id);
    return await makeApiRequest(url, "POST", data);
  };
  const deleteMemo = async () => {
    const url = MEMO_URL + props.memo.id + "/";
    return await makeApiRequest(url, "DELETE");
  };
  const deleteMemoItem = async (target_id) => {
    const url = MEMO_ITEM_URL(props.memo.id, target_id);
    return await makeApiRequest(url, "DELETE");
  };
  const handleMemoUpdate = (updatedItems) => {
    // dispatchMemo({
    //   type: UPDATE_MEMO_ITEMS,
    //   payload: { memo_id: props.memo.id, updated_items: updatedItems },
    // });
  };

  const sortAndUpdateMemoItem = async (event) => {
    const data = { order: dragOverRef.current };
    const updatedItems = await updateMemoItems(data);
    handleMemoUpdate(updatedItems);
  };
  const handleDeleteMemo = async () => {
    const updatedItems = await deleteMemo();
    // dispatchMemo({
    //   type: DELETE_MEMO,
    //   payload: { memo_id: props.memo.id },
    // });
  };
  const deleteItem = useMutation((delete_target) => {
    return deleteTodoitem(delete_target.id, delete_target.itemId);
  });

  // const deleteItem = async (memoItemId) => {
  //   const updatedItems = await deleteMemoItem(memoItemId);
  //   // dispatchMemo({
  //   //   type: DELETE_MEMO_ITEM,
  //   //   payload: { memo_id: props.memo.id, memoItemId: memoItemId },
  //   // });
  // };
  const handleAddItem = async (e) => {
    e.preventDefault();
    const data = { description: inputValue };
    const updatedItems = await addNewMemoItem(data);
    handleMemoUpdate(updatedItems);
    setInputValue("");
  };
  const handleCompletedStatus = async (memoItem) => {
    const data = { is_completed: !memoItem.is_completed };
    const updatedItems = await updateMemoItemsStatus(memoItem.id, data);
    handleMemoUpdate(updatedItems);
  };
  return (
    <div className=" m-5 w-3/6 max-w-sm  h-fit bg-white  rounded-3xl drop-shadow-sm">
      <div
        className=" sh
        rounded-t-3xl  p-5 text-left
        bg-slate-100"
      >
        <h1 className="ml-5 text-lg inline-flex items-baseline gap-3">
          {props.memo.name}
          <TiDelete onClick={() => handleDeleteMemo(props.memo.id)} />
        </h1>
        {props.memo.items.length > 0 ? (
          <h2 className="ml-10 font-light italic">
            {props.memo.items.length} tasks
          </h2>
        ) : null}
      </div>
      <div>
        <ul className=" ml-10 text-left">
          {props.memo.items.map((item, index) => (
            <div
              key={item.order}
              className="ml-2  flex align-text-bottom   items-baseline  m-3 gap-2 text-lg "
              draggable
              onDragStart={(e) => {
                dragRefId.current = item.id;
              }}
              onDragEnter={(e) => {
                dragOverRef.current = index + 1;
              }}
              onDragEnd={sortAndUpdateMemoItem}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                id={item.id}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounde "
                value="adsf"
                checked={item.is_completed}
                onChange={() => handleCompletedStatus(item)}
              ></input>
              <h1
                className={` ${
                  item.is_completed ? "line-through" : "no-underline"
                }`}
              >
                {item.description}
              </h1>
              <RiDeleteBin2Fill
                onClick={() => {
                  console.log(props.memo.id, item.id);
                  deleteItem.mutate({ id: props.memo.id, itemId: item.id });
                }}
                className="text-slate-500"
              />
            </div>
          ))}
        </ul>
      </div>
      <div className=" rounded-b-3xl  bg-gradient-to-br from-slate-200 to-emerald-300">
        <input
          className=" bg-transparent "
          placeholder="create new task"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
};
export { makeApiRequest };
export default MemoItem;
