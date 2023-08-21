import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../icons/DeleteIcon";
import { Id, Task } from "../types";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (taskId: Id) => void;
  updateTask: (TaskId: Id, content: string) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask, updateTask } = props;

  const [isHovered, setIsHovered] = useState(false);

  const [edit, setEdit] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
    disabled: edit,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl
       cursor-grab relative opacity-30 border-2 border-rose-500"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
    bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl
    hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task
  "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setEdit(true)}
    >
      {!edit && (
        <p className="m-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>
      )}
      {edit && (
        <textarea
          defaultValue={task.content}
          className="bg-transparent rounded h-[90%] w-full resize-none text-white p-2 focus:outline-none"
          autoFocus
          onBlur={() => setEdit(false)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
              setEdit(false);
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          onFocus={(e) =>
            (e.target.selectionStart = e.target.selectionEnd =
              e.target.value.length)
          }
        />
      )}
      {isHovered && !edit && (
        <button
          className="stroke-gray-500 hover:stroke-white absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded "
          onClick={() => deleteTask(task.id)}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
