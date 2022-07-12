import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ToDo, ToDoTitle } from '../components/ToDo';

const renderer = new ShallowRenderer();

describe('To Do tests', () => {
  it('renders correctly', () => {
    renderer.render(<ToDo />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders to do title', () => {
    const tests = [
      { loading: true, result: 'Loading...' },
      { loading: false, toDo: { title: 'Title' }, result: 'Title' },
    ];

    tests.forEach(({ loading, toDo, result }) => {
      renderer.render(<ToDoTitle loading={loading} toDo={toDo} />);
      const render = renderer.getRenderOutput();

      expect(render).toEqual(result);
    });
  });
});
