import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AlertComponent as Alert } from '../components/AlertComponent';
import { AlertProvider } from '../context/AlertContext';

const renderer = new ShallowRenderer();

describe('Alert tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <AlertProvider>
        <Alert>Title</Alert>
      </AlertProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
