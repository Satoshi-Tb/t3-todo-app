import useStore from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      //createTask = insert処理が成功した場合に実行される処理
      //resは、createTaskの戻り値 = 登録したtaskアイテム

      //contextから現状の値（キャッシュ）取り出し
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(undefined, [res, ...previousTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      //updateTask = update処理が成功した場合に実行される処理
      //resは、updateTaskの戻り値 = 更新したtaskアイテム

      //contextから現状の値（キャッシュ）取り出し
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deteteTask.useMutation({
    onSuccess: (_, deleteKey) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.filter((task) => task.id !== deleteKey.taskId)
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
