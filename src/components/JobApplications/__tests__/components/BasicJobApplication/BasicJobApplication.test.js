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

    expect(jobAppContainer.props().className).toEqual('sc-iBkjds SzBrj');
    expect(jobAppContainerDark.props().className).toEqual('sc-iBkjds kFPvdU');
  });

  it('renders JobAppTitleText styled component correctly', () => {
    const jobAppTitleText = shallow(<JobAppTitleText />);
    const jobAppTitleTextDark = shallow(<JobAppTitleText darkMode />);

    expect(jobAppTitleText.props().className).toEqual('sc-papXJ gFZmeb');
    expect(jobAppTitleTextDark.props().className).toEqual('sc-papXJ gWbQGy');
  });

  it('renders FileUploadContainer styled component correctly', () => {
    const fileUploadContainer = shallow(<FileUploadContainer />);
    const fileUploadContainerDark = shallow(<FileUploadContainer darkMode />);

    expect(fileUploadContainer.props().className).toEqual('sc-kDDrLX ePjEtQ');
    expect(fileUploadContainerDark.props().className).toEqual('sc-kDDrLX bcGSeG');
  });

  it('renders FileUploadScrollContainer styled component correctly', () => {
    const fileUploadScrollContainer = shallow(<FileUploadScrollContainer />);
    const fileUploadScrollContainerDark = shallow(<FileUploadScrollContainer darkMode />);

    expect(fileUploadScrollContainer.props().className).toEqual('sc-iqcoie bjyZvR');
    expect(fileUploadScrollContainerDark.props().className).toEqual('sc-iqcoie iYhDTJ');
  });

  it('renders FileUpload styled component correctly', () => {
    const fileUpload = shallow(<FileUpload />);
    const fileUploadDark = shallow(<FileUpload darkMode />);

    expect(fileUpload.props().className).toEqual('sc-crXcEl gVBqzM');
    expect(fileUploadDark.props().className).toEqual('sc-crXcEl MWJMz');
  });
});
