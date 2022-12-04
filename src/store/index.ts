import create from "zustand";
import { updateTaskInput } from "../schema/todo";

type State = {
  editedTask: updateTaskInput;
  updateEditedTask: (payload: updateTaskInput) => void;
  resetEditedTask: () => void;
};

const useStore = create<State>((set) => ({
  editedTask: { body: "", taskId: "", title: "" },
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () => {
    set({ editedTask: { body: "", taskId: "", title: "" } });
  },
}));

export default useStore;
