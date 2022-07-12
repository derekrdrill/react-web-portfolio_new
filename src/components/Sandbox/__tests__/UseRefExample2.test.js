import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UseRefExample2 } from '../components/UseRefExample2';

const renderer = new ShallowRenderer();

describe('Use Memo Example tests', () => {
  it('renders correctly', () => {
    renderer.render(<UseRefExample2 />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
