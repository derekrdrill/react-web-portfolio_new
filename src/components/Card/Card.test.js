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
      { darkMode: true, result: 'sc-beqWaB cpAETw' },
      { darkMode: true, hasSpacing: true, result: 'sc-beqWaB hbfucL' },
      { darkMode: true, hasSpacing: true, hoverable: true, result: 'sc-beqWaB iVBRiT' },
      {
        backgroundColor: 'yellow',
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-beqWaB jQuFCD',
      },
      {
        backgroundColor: 'yellow',
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-beqWaB eqvQdH',
        textColor: 'grey',
      },
      {
        darkMode: false,
        hasSpacing: true,
        hoverable: true,
        result: 'sc-beqWaB gxtnIf',
        textColor: 'grey',
      },
      { darkMode: false, hasSpacing: true, hoverable: true, result: 'sc-beqWaB bBhVov' },
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
