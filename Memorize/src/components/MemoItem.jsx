import React, { useContext, useReducer, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { MdCleaningServices } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  getAllMemo,
  deleteTodoitem,
  postTodoitem,
  updateTodoitem,
  deleteMemo,
} from "../api";
import { useQueryClient } from "react-query";
import { useQuery, useMutation } from "react-query";

const MemoItem = (props) => {
  const dragRefId = useRef(null);
  const dragOverRef = useRef(null);
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  // const { memoState, dispatchMemo } = useContext(MemoContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleDeleteMemo = useMutation(
    async () => {
      return deleteMemo(props.memo.id);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const sortAndUpdateMemoItem = useMutation(
    async (item) => {
      const data = { order: dragOverRef.current };
      return updateTodoitem(props.memo.id, item.id, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const deleteItem = useMutation(
    async (delete_target) => {
      return deleteTodoitem(delete_target.id, delete_target.itemId);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const addItem = useMutation(
    async (id) => {
      const data = { description: inputValue };
      return postTodoitem(id, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );

  const setCompletedStatus = useMutation(
    async (item) => {
      const data = { is_completed: !item.is_completed };
      return updateTodoitem(props.memo.id, item.id, data);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
      },
    }
  );
  const handleCompletedStatus = async (memoItem) => {
    const data = { is_completed: !memoItem.is_completed };
    const updatedItems = await updateMemoItemsStatus(memoItem.id, data);
    handleMemoUpdate(updatedItems);
  };
  return (
    <div className=" m-5 w-3/6 max-w-sm  h-fit bg-white  rounded-3xl drop-shadow-sm">
      <div
        className=" sh
        rounded-t-3xl  p-5 text-left         bg-slate-100 inline-flex w-full justify-between items-baseline "
      >
        <div className=" flex flex-col">
          <h1 className="ml-5 text-lg inline-flex items-baseline gap-3">
            {props.memo.name}
          </h1>
          {props.memo.items.length > 0 ? (
            <h2 className="ml-10 font-light italic">
              {props.memo.items.length} tasks
            </h2>
          ) : null}
        </div>

        <RiDeleteBin2Fill
          className=" text-2xl"
          onClick={() => handleDeleteMemo.mutate()}
        />
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
              onDragEnd={() => sortAndUpdateMemoItem.mutate(item)}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                id={item.id}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounde "
                value="adsf"
                checked={item.is_completed}
                onChange={() => setCompletedStatus.mutate(item)}
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
        <button
          onClick={() => {
            addItem.mutate(props.memo.id);
            setInputValue("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
export default MemoItem;
