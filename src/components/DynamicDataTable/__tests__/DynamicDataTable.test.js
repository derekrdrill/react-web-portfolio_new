import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  DynamicDataTable,
  ResetButton,
  SearchButton,
  TableHeadCell,
  TableToolsCell,
} from '../components/DynamicDataTable';

import { getFiltersLabel, getSelectRowsLabel } from '../components/DynamicDataTable';

import { headers } from '../../LeadInputForm/components/LeadInputDataTable';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Dynamic data table tests', () => {
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
    renderer.render(<DynamicDataTable headers={headers} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders TableHeadCell styled component correctly', () => {
    const tableHeadCell = shallow(<TableHeadCell />);
    const tableHeadCellDark = shallow(<TableHeadCell darkMode />);

    expect(tableHeadCell.props().className).toEqual('sc-eDWCr kweytw');
    expect(tableHeadCellDark.props().className).toEqual('sc-eDWCr iPedVC');
  });

  it('renders TableToolsCell styled component correctly', () => {
    const tableToolsCell = shallow(<TableToolsCell />);
    const tableToolsCellDark = shallow(<TableToolsCell darkMode />);

    expect(tableToolsCell.props().className).toEqual('sc-bqWxrE kjeUoJ');
    expect(tableToolsCellDark.props().className).toEqual('sc-bqWxrE eirfnK');
  });

  it('renders SearchButton styled component correctly', () => {
    const searchButton = shallow(<SearchButton />);
    const searchButtonDark = shallow(<SearchButton darkMode />);

    expect(searchButton.props().className).toEqual('sc-fEXmlR hNDa-dI');
    expect(searchButtonDark.props().className).toEqual('sc-fEXmlR bhDuDU');
  });

  it('renders ResetButton styled component correctly', () => {
    const resetButton = shallow(<ResetButton />);
    const resetButtonDark = shallow(<ResetButton darkMode />);

    expect(resetButton.props().className).toEqual('sc-bjfHbI brHydv');
    expect(resetButtonDark.props().className).toEqual('sc-bjfHbI nKeeT');
  });

  it('runs getSelectRowsLabel correctly', () => {
    expect(getSelectRowsLabel(true)).toEqual('Deselect all');
    expect(getSelectRowsLabel(false)).toEqual('Select all');
  });

  it('runs getFiltersLabel correctly', () => {
    expect(getFiltersLabel(true)).toEqual('Hide filters');
    expect(getFiltersLabel(false)).toEqual('Show filters');
  });
});
