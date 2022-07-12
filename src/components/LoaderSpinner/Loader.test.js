import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LoaderSpinner } from './LoaderSpinner';

const renderer = new ShallowRenderer();

describe('Loader Spinner tests', () => {
  it('renders correctly', () => {
    renderer.render(<LoaderSpinner open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
