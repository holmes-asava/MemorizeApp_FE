import axios from "axios";
const BASED_URL = "http://localhost:8000/";
const MEMO_URL = BASED_URL + "memo/";
export const makeApiRequest = async (url, method, data) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      if (method === "DELETE") {
        console.log("?");
        return;
      }

      return await response.json();
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
export const fetchMemos = async () => {
  const response = await fetch(MEMO_URL);
  const json = await response.json();
  return json;
};

let MEMO_ITEM_URL = (memo_id, item_id) => {
  return item_id
    ? BASED_URL + "memo/" + memo_id + "/item/" + item_id + "/"
    : BASED_URL + "memo/" + memo_id + "/item/";
};
export const getMemoItemsStatus = async (target_id, data) => {
  return await makeApiRequest(MEMO_URL, "GET", data);
};
export const updateMemoItemsStatus = async (target_id, data) => {
  const url = MEMO_ITEM_URL(props.memo.id, target_id);
  return await makeApiRequest(url, "PATCH", data);
};
export const updateMemoItems = async (data) => {
  const url = MEMO_ITEM_URL(props.memo.id, dragRefId.current);
  return await makeApiRequest(url, "PATCH", data);
};

export const addNewMemoItem = async (data) => {
  const url = MEMO_ITEM_URL(props.memo.id);
  return await makeApiRequest(url, "POST", data);
};
export const deleteMemo = async () => {
  const url = MEMO_URL + props.memo.id + "/";
  return await makeApiRequest(url, "DELETE");
};
export const deleteMemoItem = async (target_id) => {
  const url = MEMO_ITEM_URL(props.memo.id, target_id);
  return await makeApiRequest(url, "DELETE");
};

export const API = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllTodosFn = async (signal) => {
  const res = await API.get("memo/", { signal });
  const data = await response.json();
  return data;
};

export const postTodoFn = async (data) => {
  const res = await API.post("memo", data);
  return res.data;
};

export const deleteTodoFn = async (id) => {
  const res = await API.delete(`memo/${id}`);
  return res.data;
};

export const postTodoitem = async (id, data) => {
  const res = await API.post(`memo/${id}/item/`, data);
  return res.data;
};
export const updateTodoitem = async (id, item_id, data) => {
  const res = await API.patch(`memo/${id}/item/${item_id}/`, data);
  return res.data;
};
export const deleteTodoitem = async (id, item_id) => {
  console.log(id, item_id);
  const res = await API.delete(`memo/${id}/item/${item_id}/`);
  return res.data;
};
