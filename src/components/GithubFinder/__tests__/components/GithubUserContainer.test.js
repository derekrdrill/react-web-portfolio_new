import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUsersContainer } from '../../components/GithubUsersContainer';

const renderer = new ShallowRenderer();

describe('Github Users Container tests', () => {
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
    useContextMock.mockReturnValue({ loading: false, user: {}, users: [] });
    renderer.render(<GithubUsersContainer />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
