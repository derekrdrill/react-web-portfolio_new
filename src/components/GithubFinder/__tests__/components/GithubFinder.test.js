import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GithubFinder from '../../components/GithubFinder';

const renderer = new ShallowRenderer();

describe('Github Finder tests', () => {
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
    renderer.render(<GithubFinder />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
