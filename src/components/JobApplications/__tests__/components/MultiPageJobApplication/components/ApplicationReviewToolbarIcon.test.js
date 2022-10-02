import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ApplicationReviewToolbarIcon } from '../../../../components/MultiPageJobApplication/components/ApplicationReviewToolbarIcon';

const renderer = new ShallowRenderer();

describe('ApplicationReviewToolbarIcon tests', () => {
  it('renders correctly', () => {
    renderer.render(<ApplicationReviewToolbarIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders review job app toolbar icon', () => {
    const reviewJobAppToolbarIconTests = [
      { editMode: true, result: 'lock' },
      { editMode: false, result: 'pen-square' },
    ];

    reviewJobAppToolbarIconTests.forEach(({ editMode, result }) => {
      renderer.render(<ApplicationReviewToolbarIcon editMode={editMode} />);
      const render = renderer.getRenderOutput();
      const iconName = render.props.icon.iconName;

      expect(iconName).toEqual(result);
    });
  });
});
