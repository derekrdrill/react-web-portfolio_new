import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import AboutMe, {
  AboutMeBitmojiContainer,
  AboutMeContainer,
  AboutMeListItem,
  AboutMeTitle,
  AboutMeText,
  AboutMeTextContainer,
} from '../components/AboutMe';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('About Me tests', () => {
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
    renderer.render(<AboutMe />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders AboutMeBitmojiContainer styled component correctly', () => {
    const aboutMeBitmojiContainer = shallow(<AboutMeBitmojiContainer />);
    const aboutMeBitmojiContainerDark = shallow(<AboutMeBitmojiContainer darkMode />);

    expect(aboutMeBitmojiContainer.props().className).toEqual('sc-eDvSVe ibVxtZ');
    expect(aboutMeBitmojiContainerDark.props().className).toEqual('sc-eDvSVe ibVxtZ');
  });

  it('renders AboutMeContainer styled component correctly', () => {
    const aboutMeContainer = shallow(<AboutMeContainer />);
    const aboutMeContainerDark = shallow(<AboutMeContainer darkMode />);

    expect(aboutMeContainer.props().className).toEqual('sc-bcXHqe PdTyt');
    expect(aboutMeContainerDark.props().className).toEqual('sc-bcXHqe eRILmO');
  });

  it('renders AboutMeListItem styled component correctly', () => {
    const aboutMeListItem = shallow(<AboutMeListItem />);
    const aboutMeListItemDark = shallow(<AboutMeListItem darkMode />);

    expect(aboutMeListItem.props().className).toEqual('sc-iBYQkv fvPPYm');
    expect(aboutMeListItemDark.props().className).toEqual('sc-iBYQkv bNSbTr');
  });

  it('renders AboutMeTitle styled component correctly', () => {
    const aboutMeTitle = shallow(<AboutMeTitle />);
    const aboutMeTitleDark = shallow(<AboutMeTitle darkMode />);

    expect(aboutMeTitle.props().className).toEqual('sc-gswNZR iabZiM');
    expect(aboutMeTitleDark.props().className).toEqual('sc-gswNZR cVFUgK');
  });

  it('renders AboutMeText styled component correctly', () => {
    const aboutMeText = shallow(<AboutMeText />);
    const aboutMeTextDark = shallow(<AboutMeText darkMode />);

    expect(aboutMeText.props().className).toEqual('sc-jSUZER bMNhDw');
    expect(aboutMeTextDark.props().className).toEqual('sc-jSUZER cAEQEZ');
  });

  it('renders AboutMeTextContainer styled component correctly', () => {
    const aboutMeTextContainer = shallow(<AboutMeTextContainer />);
    const aboutMeTextContainerDark = shallow(<AboutMeTextContainer darkMode />);

    expect(aboutMeTextContainer.props().className).toEqual('sc-dkrFOg czqLrk');
    expect(aboutMeTextContainerDark.props().className).toEqual('sc-dkrFOg hBAVrl');
  });
});
