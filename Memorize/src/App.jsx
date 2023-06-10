import { useEffect, useReducer, createContext } from "react";
import TodoList from "./ToDoCard";
import { RiStickyNoteFill } from "react-icons/ri";

const UPDATE_MEMO = "UPDATE_MEMO";
const UPDATE_MEMO_ITEM = "UPDATE_MEMO_ITEM";
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
    case UPDATE_MEMO:
      return {
        ...state,
        memos: action.payload,
      };
    // return {
    //   ...state,
    //   todos: state.todos.map((todo) => {
    //     if (todo.id === action.payload.todoId) {
    //       return {
    //         ...todo,
    //         items: todo.items.filter(
    //           (item) => item.id !== action.payload.itemId
    //         ),
    //       };
    //     }
    //     return todo;
    //   }),
    // };
    case UPDATE_MEMO_ITEM:
      return {
        ...state,

        memos: action.payload,
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
        dispatchMemo({ type: UPDATE_MEMO, payload: json });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemos();
  }, []);

  return (
    <MemoContext.Provider value={dispatchMemo}>
      <div className="bg-slate-200 flex-col min-w-sm max-w-6xl m-auto items-center text-center justify-center  h-full min-h-screen">
        <li className="inline-flex text-5xl gab-5 p-10 font-extrabold   text-emerald-400  ">
          <h1 className=" text-transparent bg-clip-text  bg-gradient-to-r  from-slate-600 to-emerald-500">
            MEMORIZE
          </h1>
          <RiStickyNoteFill />
        </li>

        <div className=" flex  flex-wrap justify-center g-2 font-sans">
          {memoState.memos.map((memo) => (
            <ToDoCard key={memo.id} a={memo} memo={memo} />
          ))}
        </div>
      </div>
    </MemoContext.Provider>
  );
}
export { MemoContext, MEMO_URL, MEMO_ITEM_URL };
export default App;
