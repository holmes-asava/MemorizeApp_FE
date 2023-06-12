import React, { useReducer, useState, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  deleteMemoItem,
  postMemoItem,
  updateMemoItem,
  deleteMemo,
} from "../api";
import { useQueryClient } from "react-query";
import { useQuery, useMutation } from "react-query";

const MemoItem = (props) => {
  const dragRefId = useRef(null);
  const dragOverRef = useRef(null);
  const queryClient = useQueryClient();

  const useDeleteMemo = useMutation(
    async (info) => {
      return deleteMemo(info.id);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );

  const useSortAndUpdateMemoItem = useMutation(
    async (info) => {
      const data = { order: info.dragOverRef };
      return updateMemoItem(info.id, info.itemId, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const useDeleteMemoItem = useMutation(
    async (info) => {
      return deleteMemoItem(info.id, info.itemId);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const useAddMemoItem = useMutation(
    async (info) => {
      const data = { description: info.inputValue };
      return postMemoItem(info.id, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );

  const useSetCompletedStatus = useMutation(
    async (info) => {
      const data = { is_completed: !info.itemIsCompleted };
      return updateMemoItem(info.id, info.itemId, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className=" m-5   w-80 sm:w-3/6   max-w-sm font-light   h-fit bg-white  rounded-3xl drop-shadow-sm ">
      <div
        className="
        rounded-t-3xl  p-5 text-left   bg-slate-100 inline-flex w-full justify-between items-center  "
      >
        <div className=" flex flex-col">
          <h1
            className=" text-md sm:text-2xl ml-5   font-san
           inline-flex items-baseline gap-3"
          >
            {props.memo.name}
          </h1>
          {props.memo.items.length > 0 ? (
            <h2 className="ml-10  italic text-sm">
              {props.memo.items.length} tasks
            </h2>
          ) : null}
        </div>

        <RiDeleteBin2Fill
          className=" text-2xl mr-5 cursor-pointer"
          onClick={() => useDeleteMemo.mutate({ id: props.memo.id })}
        />
      </div>

      <div>
        <ul className=" ml-10 text-left">
          {props.memo.items.map((item, index) => (
            <div
              key={item.order}
              className="ml-2  cursor-move flex align-text-bottom   items-baseline  m-3 gap-2  text-md sm:text-lg "
              draggable
              onDragStart={(e) => {
                dragRefId.current = item.id;
              }}
              onDragEnter={(e) => {
                dragOverRef.current = index + 1;
              }}
              onDragEnd={() =>
                useSortAndUpdateMemoItem.mutate({
                  dragOverRef: dragOverRef.current,
                  id: props.memo.id,
                  itemId: dragRefId.current,
                })
              }
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                id={item.id}
                className="cursor-pointer w-4 h-4 bg-gray-100 border-gray-300  accent-emerald-200  "
                checked={item.is_completed}
                onChange={() =>
                  useSetCompletedStatus.mutate({
                    itemId: item.id,
                    id: props.memo.id,
                    itemIsCompleted: item.is_completed,
                  })
                }
              ></input>
              <h1
                className={` ${
                  item.is_completed
                    ? "line-through text-gray-400"
                    : "no-underline text-black"
                }`}
              >
                {item.description}
              </h1>
              <RiDeleteBin2Fill
                onClick={() => {
                  useDeleteMemoItem.mutate({
                    id: props.memo.id,
                    itemId: item.id,
                  });
                }}
                className="cursor-pointer text-slate-600"
              />
            </div>
          ))}
        </ul>
      </div>
      <div className=" rounded-b-3xl  h-10  bg-gradient-to-br from-slate-200 to-emerald-300 flex ">
        <form
          className=" m-auto h-5  "
          onSubmit={(e) => {
            e.preventDefault();
            useAddMemoItem.mutate({
              id: props.memo.id,
              inputValue: inputValue,
            });
            setInputValue("");
          }}
        >
          <input
            className=" bg-transparent border-state-600 focus:outline-none  text-center text-black"
            placeholder="add new task"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};
export default MemoItem;
