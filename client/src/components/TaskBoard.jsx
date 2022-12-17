import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { deleteTask, getTasksForProject, updateTask } from '../api/task';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import DeleteConfirmation from './DeleteConfirmation';
import { OPEN_EDIT_TASK, SET_TASKS } from '../reducer/data_reducer';
import EditTaskForm from './EditTaskForm';
import TaskForm from './TaskForm';

export default function TaskBoard(props) {
  const [state, setState] = useState();
  const [itemId, setItemId] = useState();
  const { tasks, taskToEdit, taskToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [status, setStatus] = useState('');
  const { id } = useParams(); //Current Project ID(from URL)

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    //creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    const draggedTask = tasks.find((task) => task.id == itemId);
    draggedTask.status = destination.droppableId;

    //for changing the number of completed tasks
    if (source.droppableId === 'COMPLETED') {
      draggedTask.taskStatusChange = -1;
    } else if (destination.droppableId === 'COMPLETED') {
      draggedTask.taskStatusChange = 1;
    } else draggedTask.taskStatusChange = 0;

    updateTask(dispatch, draggedTask);

    setState((prev) => {
      prev = { ...prev };
      //remove from prev item array
      prev[source.droppableId].items.splice(source.index, 1);
      // adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  // Filters to reassign status of the draggable item in DB for DnD
  useEffect(() => {
    const toDo = tasks
      .filter((task) => {
        return task.status === 'TO-DO';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    const inProgress = tasks
      .filter((task) => {
        return task.status === 'IN-PROGRESS';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    const completed = tasks
      .filter((task) => {
        return task.status === 'COMPLETED';
      })
      .map(({ id, ...task }) => {
        return { id: String(id), ...task };
      });
    setState({
      'TO-DO': {
        title: 'To-Do',
        items: toDo,
      },
      'IN-PROGRESS': {
        title: 'In-Progress',
        items: inProgress,
      },
      COMPLETED: {
        title: 'Complete',
        items: completed,
      },
    });
  }, [tasks]);

  const doneEdit = () => {
    getTasksForProject(id).then((data) => {
      dispatch({
        type: SET_TASKS,
        tasks: data,
      });
    });
  };

  return (
    <>
      <div className="dnd-wrapper-container">
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={(e) => setItemId(e.draggableId)}
        >
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={'dnd-column'}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={'droppable-col'}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`draggable-item ${
                                      snapshot.isDragging && 'dragging'
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => {
                                      props.setModalTask(el);
                                      props.handleShow();
                                    }}
                                  >
                                    <div className="draggable-item__inside">
                                      <img
                                        className="draggable-item__task-avatar"
                                        src={
                                          el.avatar
                                            ? el.avatar
                                            : 'https://cdn.dribbble.com/users/5592443/screenshots/12434328/drbl_mario_q-block_4x.png'
                                        }
                                        key={el.name}
                                        alt={el.name}
                                      />
                                      {/* Task name goes here */}
                                      <div className="draggable-item__text">
                                        {el.name}
                                      </div>
                                      <div className="draggable-item__icons">
                                        {/* Edit Button */}
                                        <i
                                          className="fa-solid fa-pen-to-square"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({
                                              type: OPEN_EDIT_TASK,
                                              task: el,
                                            });
                                          }}
                                        ></i>
                                        {/* Delete Button */}
                                        <i
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setStatus(el.status);
                                            setTaskId(el.id);
                                            setShowDelete(true);
                                          }}
                                          className="fa-solid fa-trash-can"
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {showDelete && (
                          <DeleteConfirmation
                            showDelete={showDelete}
                            setShowDelete={setShowDelete}
                            handleDelete={() => {
                              deleteTask(dispatch, taskId, status);
                              setShowDelete(false);
                            }}
                          />
                        )}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      {/* Logic for modal pop ups */}
      {taskToEdit && <EditTaskForm taskToEdit={taskToEdit} />}
      {taskToAdd && <TaskForm taskToAdd={taskToAdd} doneEdit={doneEdit} />}
    </>
  );
}
