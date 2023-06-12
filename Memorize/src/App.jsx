import { useEffect, useReducer, createContext } from "react";
import CreateForm from "./components/creatingMemoComponent";
import { RiStickyNoteFill } from "react-icons/ri";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getAllTodosFn } from "./api";
import MemoList from "./components/MemoList";

const BASED_URL = "http://localhost:8000/";
const MEMO_URL = BASED_URL + "memo/";
let MEMO_ITEM_URL = (memo_id, item_id) => {
  return item_id
    ? BASED_URL + "memo/" + memo_id + "/item/" + item_id + "/"
    : BASED_URL + "memo/" + memo_id + "/item/";
};
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-200 flex-col min-w-sm max-w-6xl m-auto items-center text-center justify-center  h-full min-h-screen">
        <li className="inline-flex text-5xl gab-5 p-10 font-extrabold   text-emerald-400  ">
          <h1 className=" text-transparent bg-clip-text  bg-gradient-to-r  from-slate-600 to-emerald-500">
            MEMORIZE
          </h1>
          <RiStickyNoteFill />
        </li>
        <div className=" flex  flex-wrap justify-center g-2 font-sans"></div>
        <MemoList />
        <div className=" flex  flex-wrap justify-center g-2 font-sans"></div>
        <div>
          <CreateForm />
        </div>
      </div>
    </QueryClientProvider>
  );
}
export { MEMO_URL, BASED_URL, MEMO_ITEM_URL };
export default App;
