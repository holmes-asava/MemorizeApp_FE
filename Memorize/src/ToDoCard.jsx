import React, { useContext, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdCleaningServices } from "react-icons/md";
import { MEMO_URL, MemoContext } from "./App";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoCard = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { memoState, dispatchMemo } = useContext(MemoContext);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = () => {};
  const deleteItem = (index) => {};
  const setCompleteStatus = (index) => {};
  const handleAddItem = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.inputValue,
      reminder_at: "2023-06-10",
    };
    try {
      const response = await fetch(MEMO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response as needed
        // You can update the state or fetch the updated list of items here

        // Reset the form input
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  return (
    // {console.log(key)}
    <div className=" m-5 w-3/6 max-w-sm  h-fit bg-white  rounded-3xl drop-shadow-sm">
      <div
        className=" sh
        rounded-t-3xl  p-5 text-left
        bg-slate-100"
      >
        <h1 className="ml-5 text-lg inline-flex items-baseline gap-3">
          {props.memo.name}({props.memo.reminder_at})
          <MdCleaningServices />
          <TiDelete />
        </h1>
        {props.memo.items.length > 0 ? (
          <h2 className="ml-10 font-light italic">
            {props.memo.items.length} tasks
          </h2>
        ) : null}
      </div>
      <div>
        <ul className=" ml-10 text-left">
          {props.memo.items.map((item) => (
            <div
              key={item.order}
              className="ml-2 flex-none flex-col align-text-bottom "
              draggable={true}
            >
              <h1>{item.description}</h1>
              {/* <TiDelete onClick={() => deleteTodo(item.order)} /> */}
            </div>
          ))}
        </ul>
      </div>
      <div className=" rounded-3xl  bg-slate-300">
        <input
          className=" bg-transparent"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
    </div>
  );
};

export default ToDoCard;
