import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  BasicJobApplication,
  JobAppContainer,
  JobAppTitleText,
  FileUploadContainer,
  FileUploadScrollContainer,
  FileUpload,
} from '../../../components/BasicJobApplication/BasicJobApplication';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Basic Job Application tests', () => {
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
    renderer.render(<BasicJobApplication />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders JobAppContainer styled component correctly', () => {
    const jobAppContainer = shallow(<JobAppContainer />);
    const jobAppContainerDark = shallow(<JobAppContainer darkMode />);

    expect(jobAppContainer.props().className).toEqual('sc-iAEyYk eEdOBx');
    expect(jobAppContainerDark.props().className).toEqual('sc-iAEyYk kFsyZi');
  });

  it('renders JobAppTitleText styled component correctly', () => {
    const jobAppTitleText = shallow(<JobAppTitleText />);
    const jobAppTitleTextDark = shallow(<JobAppTitleText darkMode />);

    expect(jobAppTitleText.props().className).toEqual('sc-jsMahE gWYTBk');
    expect(jobAppTitleTextDark.props().className).toEqual('sc-jsMahE lcxlMx');
  });

  it('renders FileUploadContainer styled component correctly', () => {
    const fileUploadContainer = shallow(<FileUploadContainer />);
    const fileUploadContainerDark = shallow(<FileUploadContainer darkMode />);

    expect(fileUploadContainer.props().className).toEqual('sc-irTswW cCshjj');
    expect(fileUploadContainerDark.props().className).toEqual('sc-irTswW ceGkel');
  });

  it('renders FileUploadScrollContainer styled component correctly', () => {
    const fileUploadScrollContainer = shallow(<FileUploadScrollContainer />);
    const fileUploadScrollContainerDark = shallow(<FileUploadScrollContainer darkMode />);

    expect(fileUploadScrollContainer.props().className).toEqual('sc-csCMJt nXEPx');
    expect(fileUploadScrollContainerDark.props().className).toEqual('sc-csCMJt kZAZh');
  });

  it('renders FileUpload styled component correctly', () => {
    const fileUpload = shallow(<FileUpload />);
    const fileUploadDark = shallow(<FileUpload darkMode />);

    expect(fileUpload.props().className).toEqual('sc-fbJfA byBINW');
    expect(fileUploadDark.props().className).toEqual('sc-fbJfA bObXd');
  });
});
