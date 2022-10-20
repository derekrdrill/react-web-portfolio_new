import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { CustomHookExample1 } from '../components/CustomHookExample1';

const renderer = new ShallowRenderer();

describe('Custom Hook Example 1 tests', () => {
  it('renders correctly', () => {
    renderer.render(<CustomHookExample1 />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  // it('renders conditional return', () => {
  //   const tests = [
  //     { loading: true, result: 'loading' },
  //     { loading: false, result: 'list', data: [{ id: 1, title: 'Title' }] },
  //   ];

  //   tests.forEach(({ loading, data, result }) => {
  //     renderer.render(<CustomHookExample1Return loading={loading} data={data} />);
  //     const render = renderer.getRenderOutput();
  //     const className = render.props.className;

  //     expect(className).toEqual(result);
  //   });
  // });
});
