import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UseRefExample1 } from '../components/UseRefExample1';

const renderer = new ShallowRenderer();

describe('Use Memo Example tests', () => {
  it('renders correctly', () => {
    renderer.render(<UseRefExample1 />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
