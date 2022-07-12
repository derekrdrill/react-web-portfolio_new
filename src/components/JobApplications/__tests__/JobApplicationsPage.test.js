import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { JobApplicationsPage, JobApplicationType } from '../components/JobApplicationsPage';

const renderer = new ShallowRenderer();

describe('Job Applications Page tests', () => {
  it('renders correctly', () => {
    renderer.render(<JobApplicationsPage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders type of job app type correctly', () => {
    const jobAppTypeTests = [
      { appType: 'basic', result: 'BasicJobApplication()' },
      { appType: 'advanced', result: 'AdvancedJobApplication()' },
      { appType: 'multi', result: 'MultiPageJobApplication()' },
    ];

    jobAppTypeTests.forEach(({ appType, result }) => {
      renderer.render(<JobApplicationType appType={appType} />);
      const render = renderer.getRenderOutput();
      const renderedAppType = render.type.toString();

      expect(renderedAppType).toContain(result);
    });
  });
});
