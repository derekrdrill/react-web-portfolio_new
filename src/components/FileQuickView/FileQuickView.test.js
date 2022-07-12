/*** @jest-environment jsdom */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FileQuickView } from './FileQuickView';

const renderer = new ShallowRenderer();

describe('File Quick View tests', () => {
  it('renders correctly', () => {
    renderer.render(<FileQuickView open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
