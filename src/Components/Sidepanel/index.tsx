import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DroppableStateSnapshot } from "react-beautiful-dnd";

import { ITask } from "../../types";
import { getTasks } from "../../Data/task";

import TaskList from "./TaskList";
import NextTask from "./NextTask";



// a little function to help us with reordering the result
function reorder(list: ITask[], startIndex: number, endIndex: number): ITask[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("Reorder: ", result);
  return result;
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: 250,
  border: "1px solid lightgray",
  padding: 8,
});

const SidePanelContent: React.FunctionComponent = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const tasks = await getTasks();
      setTasks(tasks);
      setLoading(false);
    })();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newTaskOrder = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(newTaskOrder);
  }

  return (
    <div>
      <NextTask />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided, snapshot: DroppableStateSnapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <TaskList tasks={tasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const SidePanel = () => {
  return (
    <SidePanelContent />
  );
};

export default SidePanel
