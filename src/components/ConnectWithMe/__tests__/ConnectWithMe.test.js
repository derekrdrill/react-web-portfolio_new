import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ConnectWithMe, {
  ContactPageContainer,
  DescriptionText,
  StyledLink,
  TitleText,
} from '../components/ConnectWithMe';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Connect with me tests', () => {
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
    useContextMock.mockReturnValue({ darkMode: true, alertDispatch: jest.fn() });
    renderer.render(<ConnectWithMe />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ContactPageContainer styled component correctly', () => {
    const contactPageContainer = shallow(<ContactPageContainer />);
    const contactPageContainerDark = shallow(<ContactPageContainer darkMode />);

    expect(contactPageContainer.props().className).toEqual('sc-gsFSXq ecCgmW');
    expect(contactPageContainerDark.props().className).toEqual('sc-gsFSXq kBHazx');
  });

  it('renders DescriptionText styled component correctly', () => {
    const descriptionText = shallow(<DescriptionText />);
    const descriptionTextDark = shallow(<DescriptionText darkMode />);

    expect(descriptionText.props().className).toEqual('sc-dhKdcB bMbkGm');
    expect(descriptionTextDark.props().className).toEqual('sc-dhKdcB jZCsoj');
  });

  it('renders StyledLink styled component correctly', () => {
    const styledLink = shallow(<StyledLink />);
    const styledLinkDark = shallow(<StyledLink darkMode />);

    expect(styledLink.props().className).toEqual('sc-jlZhew eaBpjq');
    expect(styledLinkDark.props().className).toEqual('sc-jlZhew eaBpjq');
  });

  it('renders TitleText styled component correctly', () => {
    const titleText = shallow(<TitleText />);
    const titleTextDark = shallow(<TitleText darkMode />);

    expect(titleText.props().className).toEqual('sc-jXbUNg loozHE');
    expect(titleTextDark.props().className).toEqual('sc-jXbUNg jXZqhn');
  });
});
