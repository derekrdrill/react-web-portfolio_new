import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { JobApplicationSection } from '../components/JobApplicationSections';

import { ADVANCED_JOB_APP_INPUTS } from '../constants/ADVANCED_JOB_APP_INPUTS';

const renderer = new ShallowRenderer();

describe('Job Application Section tests', () => {
  it('renders correctly', () => {
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[0]} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders dynamic list if prop is present', () => {
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[3]} />);
    const result = renderer.getRenderOutput();
    const resultProps = result.props.children[2].props;

    expect(resultProps).toHaveProperty('children');
    expect(resultProps).not.toHaveProperty('inputs');
  });

  it('does not render dynamic list if prop is not present', () => {
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[0]} />);
    const result = renderer.getRenderOutput();
    const resultProps = result.props.children[2].props;

    expect(resultProps).not.toHaveProperty('children');
    expect(resultProps).toHaveProperty('inputs');
  });
});
