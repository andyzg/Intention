import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DroppableStateSnapshot } from "react-beautiful-dnd";
import useAuth from "Hooks/useAuth";
import classes from "./sidepanel.module.css";

import { initApp } from "store/actions";
import { getTasks } from "../../Data/task";
import { setTasks } from "store/reducer/task";
import { useDispatch, useSelector } from "react-redux";

import TaskList from "./TaskList";
import NextTask from "./NextTask";
import GoogleAuth from "../Auth/Google";

import { ITask, IAppState } from "../../types";


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
});

const SidePanelContent: React.FunctionComponent = () => {
  const tasks = useSelector((state: IAppState ) => state.task.tasks || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
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

    console.log("ON DRAG END: ", newTaskOrder);
    dispatch(setTasks(newTaskOrder));
  }

  return (
    <div>
      <GoogleAuth />
      <NextTask />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided, snapshot: DroppableStateSnapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className={classes.listContainer}
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
  useAuth();

  return (
    <SidePanelContent />
  );
};

export default SidePanel
