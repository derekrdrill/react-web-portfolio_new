import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UserAuthenticationProvider } from '../../context/UserAuthenticationContext';

const renderer = new ShallowRenderer();

describe('UserAuthenticationProvider with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<UserAuthenticationProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
