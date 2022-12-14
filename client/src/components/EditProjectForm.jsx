import { useState } from 'react';
import moment from 'moment';
import './EditProject.css';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CLOSE_UPDATE_PROJECT } from '../reducer/data_reducer';
import { updateProject } from '../api/project';

export default function EditProjectForm() {
  const dispatch = useApplicationDispatch();
  const { projectToEdit } = useApplicationState();
  const [project, setProject] = useState(projectToEdit || null);
  return (
    <Modal show={projectToEdit}>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch({
            type: CLOSE_UPDATE_PROJECT,
          });
        }}
      >
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>

      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          updateProject(dispatch, project);
        }}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Project Name"
              value={project.name}
              onChange={(event) =>
                setProject((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter Project Description"
              value={project.description}
              required
              onChange={(event) =>
                setProject((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={moment(project.start_date).format('YYYY-MM-DD')}
              onChange={(event) => {
                setProject((prev) => ({
                  ...prev,
                  start_date: moment(event.target.value).toISOString(),
                }));
              }}
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Expected Completion Date</Form.Label>
            <Form.Control
              type="date"
              name="expected_end_date"
              placeholder="Expected End Date"
              value={moment(project.expected_end_date).format('YYYY-MM-DD')}
              onChange={(event) => {
                setProject((prev) => ({
                  ...prev,
                  expected_end_date: moment(event.target.value).toISOString(),
                }));
              }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch({
                type: CLOSE_UPDATE_PROJECT,
              });
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={
              !project.name ||
              !project.expected_end_date ||
              !project.start_date ||
              !project.description
            }
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
