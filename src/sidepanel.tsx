import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface TaskInterface {
  id: string;
  text: string;
}

// a little function to help us with reordering the result
function reorder(list: TaskInterface[], startIndex: number, endIndex: number): TaskInterface[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("Reorder: ", result);
  return result;
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 2,
  margin: `0 0 2px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 2,
  width: 250
});

const SidePanel = () => {
  console.log("RENDER SIDE PANEL");
  const [tasks, setTasks] = useState([{
    id: generateId(),
    text: "hey"
  }, {
    id: generateId(),
    text: "Lol"
  }]);

  const onDragEnd = (result: any) => {
    console.log("ON DRAG END");
    if (!result.destination) {
      return;
    }

    const newTaskOrder = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    console.log("NEW TASK ORDER: ", newTaskOrder);
    setTasks(newTaskOrder);
  }

  console.log(tasks);
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {task.text}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};


const root = createRoot(document.getElementById("root")!);

root.render(
  <SidePanel />
);
