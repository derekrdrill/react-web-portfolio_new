import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ApplicationBreadcrumb } from '../../../../components/MultiPageJobApplication/components/ApplicationBreadcrumb';

const renderer = new ShallowRenderer();

describe('ApplicationBreadcrumb tests', () => {
  it('renders correctly', () => {
    renderer.render(<ApplicationBreadcrumb />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ApplicationBreadcrumb correctly', () => {
    const breadcrumbTests = [
      { page: 3, maxPage: 2, progress: 100, result: undefined },
      { page: 1, maxPage: 2, progress: 50, result: '[object Object]' },
      { page: 2, maxPage: 2, progress: 100, result: '[object Object]' },
    ];

    breadcrumbTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ApplicationBreadcrumb page={page} maxPage={maxPage} />);
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.toString()).toEqual(result);
      } else {
        expect(renderType).toEqual(result);
      }
    });
  });
});
