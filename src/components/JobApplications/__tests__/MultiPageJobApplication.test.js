import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {
  MultiPageJobApplication,
  Breadcrumb,
  ProgressBar,
  BackToButtonTitle,
  ForwardButtonTitle,
  ForwardOrSubmitButton,
  ReviewJobAppToolbar,
  ReviewJobAppToolbarIcon,
  ApplicationContainerGrid,
  AdvancedAppInputsContainer,
  JobApplicationSectionContainer,
  ApplicationContainer,
} from '../components/MultiPageJobApplication';

import { ADVANCED_JOB_APP_INPUTS } from '../constants/ADVANCED_JOB_APP_INPUTS';

const renderer = new ShallowRenderer();

describe('Multi Page Job Applications Page tests', () => {
  it('renders correctly', () => {
    renderer.render(<MultiPageJobApplication></MultiPageJobApplication>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders progress bar', () => {
    const progressBarTests = [
      { page: 3, maxPage: 2, progress: 100, result: undefined },
      { page: 1, maxPage: 2, progress: 50, result: 'function ProgressBar' },
      { page: 2, maxPage: 2, progress: 100, result: 'function ProgressBar' },
    ];

    progressBarTests.forEach(({ page, maxPage, progress, result }) => {
      renderer.render(<ProgressBar page={page} maxPage={maxPage} progress={progress} />);
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.toString()).toContain(result);
      } else {
        expect(renderType).toEqual(result);
      }
    });
  });

  it('renders breadcrumb', () => {
    const breadcrumbTests = [
      { page: 3, maxPage: 2, progress: 100, result: undefined },
      { page: 1, maxPage: 2, progress: 50, result: 'div' },
      { page: 2, maxPage: 2, progress: 100, result: 'div' },
    ];

    breadcrumbTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<Breadcrumb page={page} maxPage={maxPage} />);
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.toString()).toEqual(result);
      } else {
        expect(renderType).toEqual(result);
      }
    });
  });

  it('renders application container', () => {
    const appContainerTests = [
      { page: 0, result: 'landing-page' },
      { page: 1, result: 'app-inputs' },
    ];

    appContainerTests.forEach(({ page, result }) => {
      renderer.render(<ApplicationContainer page={page} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();
      const renderedClass = render.props.children.props.className;

      expect(renderedClass).toEqual(result);
    });
  });

  it('renders back to button title', () => {
    const backButtonTests = [
      { page: 1, result: `\u00A0\u00A0BACK TO LANDING PAGE` },
      { page: 2, result: `\u00A0\u00A0BACK TO ${ADVANCED_JOB_APP_INPUTS[0].title}` },
    ];

    backButtonTests.forEach(({ page, result }) => {
      renderer.render(<BackToButtonTitle page={page} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();

      expect(render).toEqual(result);
    });
  });

  it('renders forward button title', () => {
    const forwardButtonTests = [
      { page: 1, maxPage: 3, result: `GO TO ${ADVANCED_JOB_APP_INPUTS[1].title}\u00A0\u00A0` },
      { page: 9, maxPage: 10, result: `GO TO REVIEW\u00A0\u00A0` },
    ];

    forwardButtonTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ForwardButtonTitle page={page} maxPage={maxPage} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();
      expect(render).toEqual(result);
    });
  });

  it('renders forward or submit button', () => {
    const forwardOrSubmitButtonTests = [
      { page: 1, maxPage: 2, result: 'sc-bjUoiL' },
      { page: 2, maxPage: 2, result: 'sc-idiyUo' },
    ];

    forwardOrSubmitButtonTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ForwardOrSubmitButton page={page} maxPage={maxPage} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();
      const className = render.type.componentStyle.componentId;

      expect(className).toEqual(result);
    });
  });

  it('renders review job app toolbar', () => {
    const reviewJobAppToolbarTests = [
      { page: 1, maxPage: 2, result: false },
      { page: 2, maxPage: 2, result: 'sc-fnykZs' },
    ];

    reviewJobAppToolbarTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ReviewJobAppToolbar page={page} maxPage={maxPage} inputs={ADVANCED_JOB_APP_INPUTS} />);
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.componentStyle.componentId).toEqual(result);
      } else {
        expect(render).toEqual(result);
      }
    });
  });

  it('renders review job app toolbar icon', () => {
    const reviewJobAppToolbarIconTests = [
      { editMode: true, result: 'lock' },
      { editMode: false, result: 'pen-square' },
    ];

    reviewJobAppToolbarIconTests.forEach(({ editMode, result }) => {
      renderer.render(<ReviewJobAppToolbarIcon editMode={editMode} />);
      const render = renderer.getRenderOutput();
      const iconName = render.props.icon.iconName;

      expect(iconName).toEqual(result);
    });
  });

  it('renders application container styled component', () => {
    const appContainerTests = [
      { page: 0, maxPage: 1, result: 'sc-evZas cDdPmM' },
      { page: 1, maxPage: 2, result: 'sc-evZas gElZlW' },
      { page: 2, maxPage: 2, result: 'sc-evZas cMfGwL' },
    ];

    appContainerTests.forEach(({ page, maxPage, result }) => {
      renderer.render(<ApplicationContainerGrid page={page} maxpage={maxPage} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('renders adv app inputs container styled component', () => {
    const advAppInputsContainerTests = [
      { page: 1, maxPage: 1, editing: true, result: 'sc-ksZaOG gCmIsg' },
      { page: 1, maxPage: 1, editing: false, result: 'sc-ksZaOG lbjxxC' },
      { page: 1, maxPage: 2, editing: false, result: 'sc-ksZaOG' },
    ];

    advAppInputsContainerTests.forEach(({ page, maxPage, editing, result }) => {
      renderer.render(<AdvancedAppInputsContainer page={page} maxpage={maxPage} editing={editing} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('renders job app section container styled component', () => {
    const jobAppSectionContainerTests = [
      { page: 1, maxPage: 3, sectionid: 2, result: 'sc-hAZoDl tOnpc' },
      { page: 3, maxPage: 3, sectionid: 3, result: 'sc-hAZoDl' },
      { page: 1, maxPage: 3, sectionid: 1, result: 'sc-hAZoDl' },
    ];

    jobAppSectionContainerTests.forEach(({ page, maxPage, sectionid, result }) => {
      renderer.render(<JobApplicationSectionContainer page={page} maxpage={maxPage} sectionid={sectionid} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });
});
