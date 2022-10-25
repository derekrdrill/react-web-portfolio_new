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

  it('renders ApplicationButtons styled component correctly', () => {
    const applicationButtonsTests = [
      { page: 0, result: null },
      { page: 1, result: 'app-buttons-container' },
    ];

    applicationButtonsTests.forEach(({ page, result }) => {
      renderer.render(<ApplicationButtons page={page} />);
      const render = renderer.getRenderOutput();
      const className = render.props ? render.props.className : null;

      expect(className).toEqual(result);
    });
  });
});
