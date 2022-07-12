/*** @jest-environment jsdom */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { CustomHookExample2 } from '../components/CustomHookExample2';

const renderer = new ShallowRenderer();

describe('Custom Hook Example 2 tests', () => {
  it('renders correctly', () => {
    renderer.render(<CustomHookExample2 />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
