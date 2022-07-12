import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FileUploader } from './FileUploader';

const renderer = new ShallowRenderer();

describe('File Uploader View tests', () => {
  it('renders correctly', () => {
    renderer.render(<FileUploader open={true} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
