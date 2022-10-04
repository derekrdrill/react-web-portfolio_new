import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { DarkLightModeProvider } from '../context/DarkLightModeContext';

const renderer = new ShallowRenderer();

describe('DarkLightModeProvider with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DarkLightModeProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
