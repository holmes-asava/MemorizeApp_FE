import { useEffect, useReducer, createContext } from "react";
import ToDoCard from "./ToDoCard";
import CreateForm from "./creatingMemoComponent";
import { RiStickyNoteFill } from "react-icons/ri";

const SET_MEMO = "SET_MEMO";
const UPDATE_MEMO_ITEMS = "UPDATE_MEMO_ITEMS";
const DELETE_MEMO_ITEM = "DELETE_MEMO_ITEM";
const DELETE_MEMO = "DELETE_MEMO";
const ADD_MEMO = "ADD_MEMO";
const BASED_URL = "http://localhost:8000/";
const MEMO_URL = BASED_URL + "memo/";
let MEMO_ITEM_URL = (memo_id, item_id) => {
  return item_id
    ? BASED_URL + "memo/" + memo_id + "/item/" + item_id + "/"
    : BASED_URL + "memo/" + memo_id + "/item/";
};
const MemoContext = createContext();

let initialState = { memos: [] };
let reducer = (state, action) => {
  switch (action.type) {
    case ADD_MEMO:
      return {
        ...state,
        memos: [...state.memos, action.payload],
      };
    case SET_MEMO:
      return {
        ...state,
        memos: action.payload,
      };
    case UPDATE_MEMO_ITEMS:
      return {
        ...state,

        memos: state.memos.map((memo) => {
          if (memo.id === action.payload.memo_id) {
            return { ...memo, items: action.payload.updated_items };
          }

          return memo;
        }),
      };
    case DELETE_MEMO_ITEM:
      return {
        ...state,

        memos: state.memos.map((memo) => {
          if (memo.id === action.payload.memo_id) {
            const updatedItems = memo.items.filter(
              (item) => item.id !== action.payload.memoItemId
            );
            return { ...memo, items: updatedItems };
          }

          return memo;
        }),
      };
    case DELETE_MEMO:
      return {
        ...state,
        memos: state.memos.filter((memo) => memo.id !== action.payload.memo_id),
      };
    default:
      return state;
  }
};
function App() {
  let [memoState, dispatchMemo] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await fetch(MEMO_URL);
        const json = await response.json();
        dispatchMemo({ type: SET_MEMO, payload: json });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemos();
  }, []);

  return (
    <MemoContext.Provider value={{ memoState, dispatchMemo }}>
      <div className="bg-slate-200 flex-col min-w-sm max-w-6xl m-auto items-center text-center justify-center  h-full min-h-screen">
        <li className="inline-flex text-5xl gab-5 p-10 font-extrabold   text-emerald-400  ">
          <h1 className=" text-transparent bg-clip-text  bg-gradient-to-r  from-slate-600 to-emerald-500">
            MEMORIZE
          </h1>
          <RiStickyNoteFill />
        </li>

        <div className=" flex  flex-wrap justify-center g-2 font-sans">
          {memoState.memos.map((memo) => (
            <ToDoCard key={memo.id} memo={memo} />
          ))}
        </div>
        <div className=" flex  flex-wrap justify-center g-2 font-sans"></div>
        <div>
          <CreateForm />
        </div>
      </div>
    </MemoContext.Provider>
  );
}
export {
  MemoContext,
  MEMO_URL,
  BASED_URL,
  UPDATE_MEMO_ITEMS,
  DELETE_MEMO_ITEM,
  MEMO_ITEM_URL,
  ADD_MEMO,
  DELETE_MEMO,
};
export default App;
