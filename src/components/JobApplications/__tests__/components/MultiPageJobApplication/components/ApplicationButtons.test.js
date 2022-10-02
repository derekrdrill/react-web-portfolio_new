import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ApplicationButtons } from '../../../../components/MultiPageJobApplication/components/ApplicationButtons';

const renderer = new ShallowRenderer();

describe('ApplicationButtons tests', () => {
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
    renderer.render(<ApplicationButtons />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
