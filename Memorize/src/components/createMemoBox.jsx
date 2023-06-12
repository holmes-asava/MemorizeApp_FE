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
    <div className=" m-auto max-w-sm  w-80 sm:w-3/6  bg-slate-100 rounded-3xl drop-shadow-sm  h-20 flex  font-light">
      <form
        className="  m-auto justify-center  align-middle "
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMemo.mutate(title);
        }}
      >
        <label>
          <input
            type="text"
            className="bg-transparent text-center focus:outline-none
           "
            value={title}
            onChange={handleChange}
            placeholder=" add new memo "
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMemoBox;
