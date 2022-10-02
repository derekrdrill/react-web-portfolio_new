import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ApplicationProgressBar } from '../../../../components/MultiPageJobApplication/components/ApplicationProgressBar';

const renderer = new ShallowRenderer();

describe('ApplicationProgressBar tests', () => {
  it('renders correctly', () => {
    renderer.render(<ApplicationProgressBar />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ApplicationProgressBar correctly', () => {
    const progressBarTests = [
      { page: 3, maxPage: 2, progress: 100, result: undefined },
      { page: 1, maxPage: 2, progress: 50, result: 'function ProgressBar' },
      { page: 2, maxPage: 2, progress: 100, result: 'function ProgressBar' },
    ];

    progressBarTests.forEach(({ page, maxPage, progress, result }) => {
      renderer.render(<ApplicationProgressBar page={page} maxPage={maxPage} progress={progress} />);
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.toString()).toContain(result);
      } else {
        expect(renderType).toBe(undefined);
      }
    });
  });
});
