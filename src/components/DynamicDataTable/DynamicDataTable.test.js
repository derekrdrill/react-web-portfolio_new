import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { DynamicDataTable } from './DynamicDataTable';

import { headers } from '../LeadInputForm/components/LeadInputDataTable';

const renderer = new ShallowRenderer();

describe('Dynamic data table with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DynamicDataTable headers={headers} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
