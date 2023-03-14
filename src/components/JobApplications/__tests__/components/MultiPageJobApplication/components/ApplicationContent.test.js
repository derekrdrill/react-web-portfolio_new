import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {
  ApplicationContent,
  AdvancedAppInputsContainer,
  ApplicationContentGrid,
  JobApplicationSectionContainer,
} from '../../../../components/MultiPageJobApplication/components/ApplicationContent';

import { ADVANCED_JOB_APP_INPUTS } from '../../../../constants/ADVANCED_JOB_APP_INPUTS';

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
      { page: 0, maxPage: 1, result: 'sc-irTswW giQUAL' },
      { page: 1, maxPage: 2, result: 'sc-irTswW lhrGNt' },
      { page: 2, maxPage: 2, result: 'sc-irTswW gIUHz' },
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
      { page: 1, maxPage: 1, editing: true, result: 'sc-csCMJt fgyFjz', darkMode: false },
      { page: 1, maxPage: 1, editing: false, result: 'sc-csCMJt gBpmXx', darkMode: false },
      { page: 1, maxPage: 2, editing: false, result: 'sc-csCMJt', darkMode: false },
      { page: 1, maxPage: 1, editing: true, result: 'sc-csCMJt HrpCO', darkMode: true },
      { page: 1, maxPage: 1, editing: false, result: 'sc-csCMJt cLrHxT', darkMode: true },
    ];

    advAppInputsContainerTests.forEach(({ darkMode, page, maxPage, editing, result }) => {
      renderer.render(
        <AdvancedAppInputsContainer
          $editing={editing}
          darkMode={darkMode}
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
      { $isOnPage: true, $isOnLastPage: true, result: 'sc-fbJfA aGEMq' },
      { $isOnPage: true, $isOnLastPage: false, result: 'sc-fbJfA aGEMq' },
      { $isOnPage: false, $isOnLastPage: true, result: 'sc-fbJfA aGEMq' },
      { $isOnPage: false, $isOnLastPage: false, result: 'sc-fbJfA jiDrCp' },
    ];

    jobAppSectionContainerTests.forEach(({ $isOnPage, $isOnLastPage, result }) => {
      renderer.render(
        <JobApplicationSectionContainer $isOnLastPage={$isOnLastPage} $isOnPage={$isOnPage} />,
      );
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });
});
