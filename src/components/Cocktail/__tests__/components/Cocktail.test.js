import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Cocktail from '../../components/Cocktail';

const renderer = new ShallowRenderer();

describe('Cocktail tests', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it('renders correctly', () => {
    useContextMock.mockReturnValue({ darkMode: true });
    renderer.render(<Cocktail />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
