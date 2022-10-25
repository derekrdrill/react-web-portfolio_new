import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import JobApplicationsPage, {
  JobApplicationSelectLabelText,
  JobApplicationsSelectRow,
} from '../../../components/JobApplicationPage/JobApplicationsPage';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Job Applications Page tests', () => {
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
    renderer.render(<JobApplicationsPage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders JobApplicationSelectLabelText styled component correctly', () => {
    const jobApplicationSelectLabelText = shallow(<JobApplicationSelectLabelText />);
    const jobApplicationSelectLabelTextDark = shallow(<JobApplicationSelectLabelText darkMode />);

    expect(jobApplicationSelectLabelText.props().className).toEqual('sc-jcMfQk gMmlBr');
    expect(jobApplicationSelectLabelTextDark.props().className).toEqual('sc-jcMfQk fpnAOW');
  });

  it('renders JobApplicationsSelectRow styled component correctly', () => {
    const jobApplicationsSelectRow = shallow(<JobApplicationsSelectRow />);
    const jobApplicationsSelectRowDark = shallow(<JobApplicationsSelectRow darkMode />);

    expect(jobApplicationsSelectRow.props().className).toEqual('sc-cCjUiG dZtwsk');
    expect(jobApplicationsSelectRowDark.props().className).toEqual('sc-cCjUiG ffrwsg');
  });
});
