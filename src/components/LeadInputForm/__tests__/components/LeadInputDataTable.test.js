import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LeadInputDataTable } from '../../components/LeadInputDataTable';

const renderer = new ShallowRenderer();

describe('Lead Input Data Table tests', () => {
  it('renders correctly', () => {
    renderer.render(<LeadInputDataTable />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
