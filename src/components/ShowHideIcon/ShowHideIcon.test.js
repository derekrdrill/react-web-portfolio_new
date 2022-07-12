import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ShowHideIcon, EyeIcon } from './ShowHideIcon';

const renderer = new ShallowRenderer();

describe('Show Hide Icon tests', () => {
  it('renders correctly', () => {
    renderer.render(<ShowHideIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders eye icon', () => {
    const eyeIconTests = [
      { locked: true, result: 'eye' },
      { locked: false, result: 'eye-slash' },
    ];

    eyeIconTests.forEach(({ locked, result }) => {
      renderer.render(<EyeIcon locked={locked} />);
      const render = renderer.getRenderOutput();
      const iconName = render.props.icon.iconName;

      expect(iconName).toEqual(result);
    });
  });
});
