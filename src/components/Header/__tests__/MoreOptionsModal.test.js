/*** @jest-environment jsdom */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MoreOptionsModal, ResumeOptionButtons } from '../components/MoreOptionsModal';

const renderer = new ShallowRenderer();

describe('More Options Modal tests', () => {
  it('renders correctly', () => {
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
});
