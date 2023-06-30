import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  JobApplicationSection,
  JobAppSectionHeader,
} from '../../../components/Common/JobApplicationSections';

import { ADVANCED_JOB_APP_INPUTS } from '../../../constants/ADVANCED_JOB_APP_INPUTS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Job Application Section tests', () => {
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
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[0]} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders dynamic list if prop is present', () => {
    useContextMock.mockReturnValue({ darkMode: true });
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[3]} />);
    const result = renderer.getRenderOutput();
    const resultProps = result.props.children[2].props;

    expect(resultProps).toHaveProperty('children');
    expect(resultProps).not.toHaveProperty('inputs');
  });

  it('does not render dynamic list if prop is not present', () => {
    useContextMock.mockReturnValue({ darkMode: true });
    renderer.render(<JobApplicationSection section={ADVANCED_JOB_APP_INPUTS[0]} />);
    const result = renderer.getRenderOutput();
    const resultProps = result.props.children[2].props;

    expect(resultProps).not.toHaveProperty('children');
    expect(resultProps).toHaveProperty('inputs');
  });

  it('renders JobAppSectionHeader styled component correctly', () => {
    const jobAppSectionHeader = shallow(<JobAppSectionHeader />);
    const jobAppSectionHeaderDark = shallow(<JobAppSectionHeader darkMode />);

    expect(jobAppSectionHeader.props().className).toEqual('sc-imWYAI dPjEts');
    expect(jobAppSectionHeaderDark.props().className).toEqual('sc-imWYAI jkwNFZ');
  });
});
