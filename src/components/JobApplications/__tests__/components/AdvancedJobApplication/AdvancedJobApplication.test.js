import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  AdvancedJobApplication,
  JobAppContainer,
  JobAppHeaderContainer,
} from '../../../components/AdvancedJobApplication/AdvancedJobApplication';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Advanced Job Application tests', () => {
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
    renderer.render(<AdvancedJobApplication />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders JobAppContainer styled component correctly', () => {
    const jobAppContainer = shallow(<JobAppContainer />);
    const jobAppContainerDark = shallow(<JobAppContainer darkMode />);

    expect(jobAppContainer.props().className).toEqual('sc-pyfCe cYgTxY');
    expect(jobAppContainerDark.props().className).toEqual('sc-pyfCe cXnDiB');
  });

  it('renders JobAppHeaderContainer styled component correctly', () => {
    const jobAppHeaderContainer = shallow(<JobAppHeaderContainer />);
    const jobAppHeaderContainerDark = shallow(<JobAppHeaderContainer darkMode />);

    expect(jobAppHeaderContainer.props().className).toEqual('sc-kDvujY cNOVKB');
    expect(jobAppHeaderContainerDark.props().className).toEqual('sc-kDvujY kbQfsu');
  });
});
