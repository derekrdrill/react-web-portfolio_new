import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ApplicationComplete from '../../../components/Common/ApplicationComplete';

const renderer = new ShallowRenderer();

describe('Application Complete tests', () => {
  it('renders correctly', () => {
    renderer.render(<ApplicationComplete />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
