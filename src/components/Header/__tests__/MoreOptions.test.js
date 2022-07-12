/*** @jest-environment jsdom */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MoreOptions } from '../components/MoreOptions';
import { MORE_OPTIONS } from '../constants/MORE_OPTIONS';

const renderer = new ShallowRenderer();

describe('More Options tests', () => {
  it('renders correctly', () => {
    renderer.render(<MoreOptions moreOptions={MORE_OPTIONS} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
