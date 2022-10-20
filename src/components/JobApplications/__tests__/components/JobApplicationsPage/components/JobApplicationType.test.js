import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { JobApplicationType } from '../../../../components/JobApplicationPage/components/JobApplicationType';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('JobApplicationType tests', () => {
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
    renderer.render(<JobApplicationType />);
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
