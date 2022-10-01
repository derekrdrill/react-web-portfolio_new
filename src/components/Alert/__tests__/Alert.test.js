import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { AlertComponent as Alert, StyledAlert } from '../components/AlertComponent';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Alert tests', () => {
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
    useContextMock.mockReturnValue({ darkMode: true, alert: {}, fadeOut: true });
    renderer.render(<Alert>Title</Alert>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders StyledAlert styled component correctly', () => {
    const alert = shallow(<StyledAlert />);
    const alertFadeOut = shallow(<StyledAlert $fadeOut />);

    expect(alert.props().className).toEqual('sc-bczRLJ eeLUan');
    expect(alertFadeOut.props().className).toEqual('sc-bczRLJ jxwIva');
  });
});
