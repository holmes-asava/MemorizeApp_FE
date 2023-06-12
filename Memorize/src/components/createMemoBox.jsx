import React, { useReducer, useState, useRef } from "react";
import { postMemo } from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const CreateMemoBox = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const handleAddMemo = useMutation(
    async (title) => {
      return postMemo({ name: title });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("memo-state");
        setTitle("");
      },
    }
  );
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className=" ">
      <div className=" m-auto   w-3/6 max-w-lg  bg-white  rounded-3xl drop-shadow-sm  h-20  ">
        <form className="" onSubmit={() => handleAddMemo.mutate(title)}>
          <label>
            Memo Title:
            <input type="text" value={title} onChange={handleChange} />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMemoBox;
