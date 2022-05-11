import React, { useCallback, useState } from 'react';
import { Button, Typography } from '@mui/material';

export const UseCallbackExample = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback(() => {
    setTasks(previousState => [...previousState, 'Some task']);
  }, [setTasks]);

  return (
    <>
      <AddTaskButton addTask={addTask} />
      {tasks.map((task, index) => (
        <Typography key={index} paragraph>
          {task}
        </Typography>
      ))}
    </>
  );
};

const AddTaskButton = React.memo(({ addTask }) => {
  console.log('button rendered');

  return (
    <Button variant='contained' onClick={addTask}>
      Add
    </Button>
  );
});
