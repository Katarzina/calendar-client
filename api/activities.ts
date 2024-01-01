import axios from "@/core/axios";
import { ActivityDataItem } from "./dto/activities.dto";

export const getAll = async (): Promise<ActivityDataItem[]> => {
  return (await axios.get("/activities")).data;
};

export const getActivity = async (id: number): Promise<ActivityDataItem> => {
  return (await axios.get("/activities/" + id)).data;
};

export const remove = (id: number): Promise<void> => {
  return axios.delete("/activities/" + id);
};

export const create = async (values: ActivityDataItem): Promise<any> => {
  return (await axios.post("/activities", values)).data;
};

export const update = async (
  id: number,
  values: ActivityDataItem,
): Promise<any> => {
  return (await axios.patch("/activities/" + id, values)).data;
};
