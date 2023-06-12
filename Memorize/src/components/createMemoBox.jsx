import React, { useContext, useReducer, useState, useRef } from "react";
import { postMemo } from "../api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const CreateMemoBox = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

  const onCreate = (title) => {};
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
