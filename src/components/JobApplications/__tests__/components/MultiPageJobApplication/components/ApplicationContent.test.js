import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  ApplicationContent,
  AdvancedAppInputsContainer,
  ApplicationContentGrid,
  JobApplicationSectionContainer,
} from '../../../../components/MultiPageJobApplication/components/ApplicationContent';

import { ADVANCED_JOB_APP_INPUTS } from '../../../../constants/ADVANCED_JOB_APP_INPUTS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('ApplicationContent tests', () => {
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
    renderer.render(<ApplicationContent inputs={ADVANCED_JOB_APP_INPUTS} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ApplicationContent correctly', () => {
    const appContainerTests = [
      { page: 0, result: 'landing-page' },
      { page: 1, result: 'app-inputs' },
    ];

    appContainerTests.forEach(({ page, result }) => {
      useContextMock.mockReturnValue({ darkMode: true });
      renderer.render(<ApplicationContent page={page} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();
      const renderedClass = render.props.children.props.className;

      expect(renderedClass).toEqual(result);
    });
  });

  it('renders ApplicationContentContainer styled component correctly', () => {
    const appContainerTests = [
      { page: 0, maxPage: 1, result: 'sc-kDDrLX bEnZOa' },
      { page: 1, maxPage: 2, result: 'sc-kDDrLX bjMNrg' },
      { page: 2, maxPage: 2, result: 'sc-kDDrLX ccnaTh' },
    ];

    appContainerTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ApplicationContentGrid page={page} maxpage={maxPage} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('renders AdvancedAppInputsContainerstyled component correctly', () => {
    const advAppInputsContainerTests = [
      { page: 1, maxPage: 1, editing: true, result: 'sc-iqcoie eNrFmP', darkMode: false },
      { page: 1, maxPage: 1, editing: false, result: 'sc-iqcoie hiyGJd', darkMode: false },
      { page: 1, maxPage: 2, editing: false, result: 'sc-iqcoie', darkMode: false },
      { page: 1, maxPage: 1, editing: true, result: 'sc-iqcoie kwQBeC', darkMode: true },
      { page: 1, maxPage: 1, editing: false, result: 'sc-iqcoie fiyYGD', darkMode: true },
    ];

    advAppInputsContainerTests.forEach(({ darkMode, page, maxPage, editing, result }) => {
      renderer.render(
        <AdvancedAppInputsContainer
          darkMode={darkMode}
          editing={editing}
          maxpage={maxPage}
          page={page}
        />,
      );
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('renders JobAppSectionContainer styled component correctly', () => {
    const jobAppSectionContainerTests = [
      { page: 1, maxPage: 3, sectionid: 2, result: 'sc-crXcEl dohSJT' },
      { page: 3, maxPage: 3, sectionid: 3, result: 'sc-crXcEl eTNHSj' },
      { page: 1, maxPage: 3, sectionid: 1, result: 'sc-crXcEl gvbbmF' },
    ];

    jobAppSectionContainerTests.forEach(({ page, maxPage, sectionid, result }) => {
      renderer.render(
        <JobApplicationSectionContainer page={page} maxpage={maxPage} sectionid={sectionid} />,
      );
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });
});
