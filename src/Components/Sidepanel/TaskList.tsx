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
  padding: 2,
  margin: `0 0 8px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgray" : "white",
  border: "1px solid lightgray",

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
