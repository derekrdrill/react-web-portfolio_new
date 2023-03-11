import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { MessageModal, ModalContainer } from './MessageModal';
import { getCancelButtonColor, getConfirmButtonColor } from './MessageModal';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Message Modal tests', () => {
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
    useContextMock.mockReturnValue({ darkMode: false });
    renderer.render(<MessageModal open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ModalContainer styled component correctly', () => {
    const modalContainer = shallow(<ModalContainer />);
    const modalContainerDark = shallow(<ModalContainer darkMode />);

    expect(modalContainer.props().className).toEqual('sc-beySbM gtkpVX');
    expect(modalContainerDark.props().className).toEqual('sc-beySbM fnAFBm');
  });

  it('runs getCancelButtonColor', () => {
    expect(getCancelButtonColor('#FFF', true)).toEqual('secondary');
    expect(getCancelButtonColor('#FFF', false)).toEqual('#FFF');
    expect(getCancelButtonColor(null, false)).toEqual('error');
  });

  it('runs getConfirmButtonColor', () => {
    expect(getConfirmButtonColor('#FFF', true)).toEqual('primary');
    expect(getConfirmButtonColor('#FFF', false)).toEqual('#FFF');
    expect(getConfirmButtonColor(null, false)).toEqual('success');
  });
});
