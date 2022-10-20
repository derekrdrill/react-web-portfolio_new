import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ListingsProvider from '../../context/ListingsContext';

const renderer = new ShallowRenderer();

describe('ListingsProvider with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<ListingsProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
