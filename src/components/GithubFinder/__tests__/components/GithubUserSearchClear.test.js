import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { GithubUserSearchClear } from '../../components/GithubUserSearchClear';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('GithubUserSearchClear tests', () => {
  it('renders correctly', () => {
    renderer.render(<GithubUserSearchClear />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders GithubUserSearchClear with text correctly', () => {
    const githubUserSearchClear = shallow(
      <GithubUserSearchClear
        githubDispatch={jest.fn()}
        handleClearUsers={jest.fn()}
        searchInput={null}
        setText={jest.fn()}
        text={'search'}
      />,
    );

    expect(githubUserSearchClear.props().className).toEqual('search');
  });
});
