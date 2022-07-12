import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { HeaderMenuOptions } from '../components/HeaderMenuOptions';

const renderer = new ShallowRenderer();

describe('Header Menu Options tests', () => {
  it('renders correctly', () => {
    renderer.render(<HeaderMenuOptions />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders correctly based on header type', () => {
    const headerTests = [
      { headerType: 'main', result: 'sc-bczRLJ' },
      { headerType: 'secondary', result: 'sc-gsnTZi' },
      { headerType: null, result: 'sc-gsnTZi' },
    ];

    headerTests.forEach(({ headerType, result }) => {
      renderer.render(<HeaderMenuOptions headerType={headerType} />);
      const render = renderer.getRenderOutput();
      expect(render.type.componentStyle.componentId).toEqual(result);
    });
  });
});
