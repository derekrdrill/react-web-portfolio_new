import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { EyeIcon } from '../../components/EyeIcon';

const renderer = new ShallowRenderer();

describe('EyeIcon tests', () => {
  it('renders correctly', () => {
    renderer.render(<EyeIcon />);
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
