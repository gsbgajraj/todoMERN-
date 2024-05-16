import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './EditTaskForm.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditTaskForm() {
  const [task, setTask] = useState({
    taskname: '',
    deadline: '',
  });

  const {id} = useParams();
  const navigate = useNavigate();

  const getTask = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/tasks/${id}`);
      setTask(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {getTask();}, [id]);

  const updateTaskInfo = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(task);
  };

  const updateTaskdb = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/tasks/${id}`, task); 
      toast.success('task updated successfully');
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
      <Link className={classes.backBtn} to="/">
        <BsArrowLeftShort />
        Home
      </Link>
        <h1>Edit Your Task</h1>
        <form className={classes.editForm} onSubmit={updateTaskdb}>
          <label htmlFor="name">
            Name of the Task:
            <input
              name="taskname"
              type="text"
              placeholder="Full Name"
              required
              value={task.taskname}
              onChange={updateTaskInfo} 
              autoComplete='off'
            />
          </label>
          <label htmlFor="date">
            Date of the Completion:
            <input
              name="deadline"
              type="date"
              required
              value={task.deadline}
              onChange={updateTaskInfo} 
              autoComplete='off'
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditTaskForm;