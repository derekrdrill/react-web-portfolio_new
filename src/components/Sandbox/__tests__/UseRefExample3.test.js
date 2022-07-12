import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UseRefExample3 } from '../components/UseRefExample3';

const renderer = new ShallowRenderer();

describe('Use Memo Example tests', () => {
  it('renders correctly', () => {
    renderer.render(<UseRefExample3 />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
