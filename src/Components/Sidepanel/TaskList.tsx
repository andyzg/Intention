import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { ITask } from "../../types";

interface TaskListProps {
  tasks: ITask[];
}

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 8,
  margin: `0 0 8px 0`,
  borderRadius: 4,

  // change background colour if dragging
  background: isDragging ? "rgb(240,240,240)" : "white",
  border: "1px solid rgba(0,0,0,0.1)",

  // styles we need to apply on draggables
  ...draggableStyle
});

const TaskList: React.FunctionComponent<TaskListProps> = (props) => {
  const { tasks } = props;

  return (
    <div>
      {tasks.map((task: ITask, index: number) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot: DraggableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {task.name}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};


export default TaskList;
