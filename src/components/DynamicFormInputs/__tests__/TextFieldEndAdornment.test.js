import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { TextFieldEndAdornment } from '../components/TextFieldEndAdornment';

import { handleSetPasswordHidden } from '../components/TextFieldEndAdornment';

const renderer = new ShallowRenderer();

describe('TextFieldEndAdornment tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <TextFieldEndAdornment passwordHidden setPasswordHidden={jest.fn()} type='password' />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('runs handleSetPasswordHidden', () => {
    expect(handleSetPasswordHidden(true, jest.fn())).toEqual(false);
    expect(handleSetPasswordHidden(false, jest.fn())).toEqual(true);
  });
});
