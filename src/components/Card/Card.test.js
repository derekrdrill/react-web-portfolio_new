import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Card, StyledDiv } from './Card';

const renderer = new ShallowRenderer();

describe('Card tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <Card>
        <div>Snapshot test</div>
      </Card>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders StyledDiv correctly', () => {
    const styledDivTests = [
      { darkMode: true, result: 'sc-bcXHqe iwypgQ' },
      { darkMode: true, hasSpacing: true, result: 'sc-bcXHqe JXwwT' },
      { darkMode: true, hasSpacing: true, hoverable: true, result: 'sc-bcXHqe jFUMGv' },
      {
        backgroundColor: 'yellow',
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-bcXHqe iFaTdj',
      },
      {
        backgroundColor: 'yellow',
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-bcXHqe idyuSL',
        textColor: 'grey',
      },
      {
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-bcXHqe hePocT',
        textColor: 'grey',
      },
      { darkMode: false, hasSpacing: true, hoverable: true, result: 'sc-bcXHqe eHpWfr' },
    ];

    styledDivTests.forEach(({ backgroundColor, darkMode, hasSpacing, hoverable, result, textColor }) => {
      renderer.render(
        <StyledDiv
          backgroundColor={backgroundColor}
          darkMode={darkMode}
          hasSpacing={hasSpacing}
          hoverable={hoverable}
          textColor={textColor}
        />,
      );
      const render = renderer.getRenderOutput();
      expect(render.props.className).toEqual(result);
    });
  });
});
