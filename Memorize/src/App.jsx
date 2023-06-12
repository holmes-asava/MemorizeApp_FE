import { useEffect, useReducer, createContext } from "react";
import CreateMemoBox from "./components/createMemoBox";
import { RiStickyNoteFill } from "react-icons/ri";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getAllMemo } from "./api";
import MemoList from "./components/MemoList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-200 flex-col max-w-6xl m-auto items-center text-center justify-center  h-full min-h-screen">
        <li className="inline-flex text-5xl gab-5 p-10 font-extrabold   text-emerald-400  ">
          <h1 className=" text-transparent bg-clip-text  bg-gradient-to-r  from-slate-600 to-emerald-500">
            MEMORIZE
          </h1>
          <RiStickyNoteFill />
        </li>
        <div className=" g-2 font-sans mb-5">
          <CreateMemoBox />
        </div>
        <div className=" flex  flex-wrap justify-center  g-2 font-sans">
          <MemoList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
export default App;
