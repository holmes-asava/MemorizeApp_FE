import axios from "axios";
const BASED_URL = "http://localhost:8000/";
const MEMO_URL = BASED_URL + "memo/";

export const API = axios.create({
  baseURL: BASED_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAllMemo = async () => {
  const res = await API.get("memo/");
  return res.data;
};

export const postMemo = async (data) => {
  const res = await API.post("memo/", data);
  return res;
};

export const deleteMemo = async (id) => {
  const res = await API.delete(`memo/${id}/`);
  return res;
};

export const postMemoItem = async (id, data) => {
  const res = await API.post(`memo/${id}/item/`, data);
  return res;
};
export const updateMemoItem = async (id, item_id, data) => {
  const res = await API.patch(`memo/${id}/item/${item_id}/`, data);
  return res;
};
export const deleteMemoItem = async (id, item_id) => {
  const res = await API.delete(`memo/${id}/item/${item_id}/`);
  return res;
};
