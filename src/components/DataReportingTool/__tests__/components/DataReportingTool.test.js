import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DataReportingTool from '../../components/DataReportingTool';

const renderer = new ShallowRenderer();

describe('DataReportingTool with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DataReportingTool />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
