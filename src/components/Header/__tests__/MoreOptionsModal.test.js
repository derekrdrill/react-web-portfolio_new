import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MoreOptionsModal, ResumeOptionButtons, StyledBox } from '../components/MoreOptionsModal';

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

  it('renders Resume Option Buttons correctly', () => {
    const resumeOptionTests = [
      { cancelbutton: false, result: 'sc-gsnTZi brqFLd' },
      { cancelbutton: true, result: 'sc-gsnTZi AIRpM' },
    ];

    resumeOptionTests.forEach(({ cancelbutton, result }) => {
      renderer.render(<ResumeOptionButtons cancelbutton={cancelbutton} />);
      const render = renderer.getRenderOutput();
      expect(render.props.className).toEqual(result);
    });
  });

  it('renders StyledBox correctly', () => {
    const styledBoxTests = [
      { darkMode: false, result: 'sc-bczRLJ hugivE' },
      { darkMode: true, result: 'sc-bczRLJ lhwdHl' },
    ];

    styledBoxTests.forEach(({ darkMode, result }) => {
      renderer.render(<StyledBox darkMode={darkMode} />);
      const render = renderer.getRenderOutput();
      expect(render.props.className).toEqual(result);
    });
  });
});
