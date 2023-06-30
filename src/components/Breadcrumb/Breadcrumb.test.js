import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Breadcrumb, BreadcrumbText } from './Breadcrumb';
import { ADVANCED_JOB_APP_INPUTS } from '../../components/JobApplications/constants/ADVANCED_JOB_APP_INPUTS';

const renderer = new ShallowRenderer();

describe('Breadcrumb tests', () => {
  it('renders correctly', () => {
    renderer.render(<Breadcrumb breadcrumbs={ADVANCED_JOB_APP_INPUTS} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders BreadcrumbText styled component', () => {
    const breadcrumbTextTests = [
      { id: 1, page: 2, endcrumb: true, className: 'sc-aXZVg eRrFP' },
      { id: 2, page: 2, endcrumb: true, className: 'sc-aXZVg lahCzb' },
      { id: 2, page: 1, endcrumb: true, className: 'sc-aXZVg hbowhV' },
    ];

    breadcrumbTextTests.forEach(test => {
      renderer.render(<BreadcrumbText id={test.id} page={test.page} endcrumb={test.endcrumb} />);
      const result = renderer.getRenderOutput();
      expect(result.props.className).toEqual(test.className);
    });
  });
});
