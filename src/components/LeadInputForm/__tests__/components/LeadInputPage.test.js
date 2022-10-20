import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import LeadInputPage from '../../components/LeadInputPage';

const renderer = new ShallowRenderer();

describe('Lead Input Page tests', () => {
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
    useContextMock.mockReturnValue({
      darkMode: true,
      leadInputDispatch: jest.fn(),
      page: 1,
      tooltipOpen: false,
    });

    renderer.render(<LeadInputPage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
