import React, { useContext, useReducer, useState, useRef } from "react";
import { MEMO_URL } from "../App";
import { makeApiRequest } from "../api";
const CreateForm = () => {
  const [title, setTitle] = useState("");

  const addNewMemoItem = async (data) => {
    const url = MEMO_URL;
    return await makeApiRequest(url, "POST", data);
  };
  // const { memoState, dispatchMemo } = useContext(MemoContext);
  const onCreate = (title) => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedItems = await addNewMemoItem({ name: title });
    // dispatchMemo({ type: ADD_MEMO, payload: updatedItems });
    setTitle("");
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className=" justify-center text-center items-center ">
      <div className=" m-5 w-3/6 max-w-sm  bg-white  rounded-3xl drop-shadow-sm  h-20 justify-end ">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleChange} />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
