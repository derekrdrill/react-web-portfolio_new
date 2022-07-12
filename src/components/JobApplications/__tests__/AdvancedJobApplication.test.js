import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AdvancedJobApplication } from '../components/AdvancedJobApplication';

const renderer = new ShallowRenderer();

describe('Advanced Job Application tests', () => {
  it('renders correctly', () => {
    renderer.render(<AdvancedJobApplication />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
