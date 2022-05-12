import React from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Button, TextField } from '@mui/material';

export const CustomHookExample2 = () => {
  const [task, setTask] = useLocalStorage('task', '');
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const handleSetTask = e => setTask(e.currentTarget.value);
  const handleSubmit = () => {
    const taskObj = {
      task,
      commpleted: false,
      date: new Date().toLocaleDateString(),
    };

    setTasks([...tasks, taskObj]);
  };

  return (
    <>
      <div>
        <TextField label='Task' onChange={handleSetTask} value={task} />
      </div>
      <Button color='info' onClick={handleSubmit} variant='contained'>
        Submit
      </Button>
    </>
  );
};
