import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ShowHideIcon } from '../ShowHideIcon';

const renderer = new ShallowRenderer();

describe('Show Hide Icon tests', () => {
  it('renders correctly', () => {
    renderer.render(<ShowHideIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
