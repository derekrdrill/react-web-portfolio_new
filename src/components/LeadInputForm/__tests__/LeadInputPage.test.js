import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LeadInputPage } from '../components/LeadInputPage';
import { LeadInputProvider } from '../context/LeadInputContext';

const renderer = new ShallowRenderer();

describe('Lead Input Page tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <LeadInputProvider>
        <LeadInputPage />
      </LeadInputProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
