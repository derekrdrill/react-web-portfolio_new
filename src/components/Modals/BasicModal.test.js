import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BasicModal, CancelButton, ModalContainer } from './BasicModal';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Basic Modal tests', () => {
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

    renderer.render(<BasicModal open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ModalContainer styled component correctly', () => {
    const modalContainer = shallow(<ModalContainer />);
    const modalContainerDark = shallow(<ModalContainer darkMode />);

    expect(modalContainer.props().className).toEqual('sc-jSUZER YDiyj');
    expect(modalContainerDark.props().className).toEqual('sc-jSUZER bjkrFG');
  });

  it('renders CancelButton styled component correctly', () => {
    const cancelButton = shallow(<CancelButton />);
    const cancelButtonOutlined = shallow(<CancelButton variant='outlined' />);

    expect(cancelButton.props().className).toEqual('sc-dkrFOg bVFKSk');
    expect(cancelButtonOutlined.props().className).toEqual('sc-dkrFOg ggdilL');
  });
});
