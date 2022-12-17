import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TaskTabs from './TaskTabs';
import { useParams } from 'react-router-dom';
import { getTasksForProject } from '../api/task';
import TaskListItem from './TaskListItem';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import { SET_TASKS, OPEN_ADD_TASK } from '../reducer/data_reducer';
import TaskBoard from './TaskBoard';

import './TaskList.css';
import { getUsers } from '../api/user';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
  const dispatch = useApplicationDispatch();
  const { id } = useParams(); //Current Project ID(from URL)
  const [modalTask, setModalTask] = useState({
    name: '',
    status: '',
    assigned_user_id: '',
    deadline: '',
    description: '',
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // getting users
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getTasksForProject(id).then((data) => {
      dispatch({
        type: SET_TASKS,
        tasks: data,
      });
    });
  }, [id]);

  const navigate = useNavigate();
  const redirectToChat = () => {
    navigate(`/chat`);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskListItem task={modalTask} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="task-list__dashboard">
        <h1>
          Task Dashboard
          {/* New Task Button */}
          <span id="tasklist__buttons">
            <Button
              variant="primary"
              className="add-new-task__button"
              onClick={() =>
                dispatch({
                  type: OPEN_ADD_TASK,
                })
              }
            >
              <i className="fa-solid fa-plus"></i> New Task{' '}
            </Button>
            {/* Chat Now Button */}
            <Button
              variant="primary"
              className="chat__button"
              onClick={redirectToChat}
            >
              Chat Now! <i className="fa-solid fa-message"></i>
            </Button>
          </span>
        </h1>
      </div>
      <section className="dashboard_info">
        <TaskTabs />
      </section>
      <TaskBoard setModalTask={setModalTask} handleShow={handleShow} />
    </>
  );
}
