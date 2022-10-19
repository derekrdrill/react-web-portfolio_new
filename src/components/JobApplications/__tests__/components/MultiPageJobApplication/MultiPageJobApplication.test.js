import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {
  MultiPageJobApplication,
  goBackward,
  goForward,
  setPageByBreadcrumb,
  toggleEditMode,
} from '../../../components/MultiPageJobApplication/MultiPageJobApplication';

const renderer = new ShallowRenderer();

describe('Multi Page Job Applications Page tests', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it('renders correctly', () => {
    useContextMock.mockReturnValue({ darkMode: true });
    renderer.render(<MultiPageJobApplication />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('runs goForward correctly', () => {
    expect(goForward(3, 1, jest.fn(), jest.fn())).toEqual([2, 66.66666666666666]);
    expect(goForward(3, 4, jest.fn(), jest.fn())).toEqual(4);
  });

  it('runs goBackward correctly', () => {
    expect(goBackward(3, 2, jest.fn(), jest.fn())).toEqual([1, 33.33333333333333]);
  });

  it('runs setPageByBreadcrumb correctly', () => {
    const e = { target: { id: 1 } };
    expect(setPageByBreadcrumb(e, 3, jest.fn(), jest.fn())).toEqual([1, 33.33333333333333]);
  });

  it('runs toggleEditMode correctly', () => {
    expect(toggleEditMode(true, jest.fn())).toEqual(false);
    expect(toggleEditMode(false, jest.fn())).toEqual(true);
  });
});
