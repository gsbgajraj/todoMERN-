import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';
import {Link} from "react-router-dom";
function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
        <p>{task.title}</p>
      </td>
      <td>Created at {moment(task.createdAt).format('MMM Do YYYY,h:mm:ss a')}</td>
      <td>
      {isCompleted ? `Completed at ${moment(task.completedAt).format('MMM Do YYYY, h:mm:ss a')}` : 'Incomplete'}
    </td>
      <td>Deadline: {task.deadline ? moment(task.deadline).format('MMM Do YYYY') : 'N/A'}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}>
          Delete
        </button></td>
      <td>
        <Link to={`/EditTaskForm/`+task._id} className={classes.editBtn}>
        <button
          type="button"
          className={classes.editBtn} >
          Edit
         
          </button>
          </Link>
        </td>
    </tr>
  );
}

export default TaskItem;
