import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ModalTypography, MoreOptionsModal, StyledBox } from '../components/MoreOptionsModal';

const renderer = new ShallowRenderer();

describe('More Options Modal tests', () => {
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

    renderer.render(<MoreOptionsModal open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ModalTypography correctly', () => {
    const modalTypographyTests = [
      { darkMode: false, result: 'sc-hLQRIN' },
      { darkMode: true, result: 'sc-hLQRIN iOgMeo' },
    ];

    modalTypographyTests.forEach(({ darkMode, result }) => {
      renderer.render(<ModalTypography darkMode={darkMode} />);
      const render = renderer.getRenderOutput();
      expect(render.props.className).toEqual(result);
    });
  });

  it('renders StyledBox correctly', () => {
    const styledBoxTests = [
      { darkMode: false, result: 'sc-beySbM bszYVR' },
      { darkMode: true, result: 'sc-beySbM jeLhhw' },
    ];

    styledBoxTests.forEach(({ darkMode, result }) => {
      renderer.render(<StyledBox darkMode={darkMode} />);
      const render = renderer.getRenderOutput();
      expect(render.props.className).toEqual(result);
    });
  });
});
