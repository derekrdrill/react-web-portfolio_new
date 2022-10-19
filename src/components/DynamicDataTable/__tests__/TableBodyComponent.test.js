import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  TableBodyComponent,
  EditRecordIcon,
  RemoveRecordIcon,
  TableBodyCellInput,
  TableBodyRow,
  TableBodyStyled,
} from '../components/TableBodyComponent';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

const dataRows = [
  {
    email: 'derekrdrill@gmail.com',
    firstName: 'Derek',
    lastName: 'Drill',
    phone: '3014817288',
    _id: '62339b5780ab1b2c776e5e6f',
  },
  {
    email: 'woof@bark.com',
    firstName: 'George',
    lastName: 'Drill',
    phone: '8388387474',
    _id: '62339b6c80ab1b2c776e5e70',
  },
];

describe('TableBodyComponent tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <TableBodyComponent
        checkOneColor='red'
        checkedRows={['62339b6c80ab1b2c776e5e70']}
        darkMode
        dataRows={dataRows}
        editingID='62339b5780ab1b2c776e5e6f'
        filterColumn='firstName'
        filterValue='George'
        handleCheckOneRow={jest.fn()}
        handleEditRow={jest.fn()}
        handleRowInputChange={jest.fn()}
        handleSaveEdits={jest.fn()}
        handleSetDeleteRow={jest.fn()}
        selectedRowColor='blue'
        selectedRowFontColor='gainsboro'
        tableBodyColor='white'
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders EditRecordIcon styled component correctly', () => {
    const editRecordIcon = shallow(<EditRecordIcon />);
    const editRecordIconDark = shallow(<EditRecordIcon darkMode />);

    expect(editRecordIcon.props().className).toEqual('sc-bcXHqe culgdI');
    expect(editRecordIconDark.props().className).toEqual('sc-bcXHqe dWoSxR');
  });

  it('renders RemoveRecordIcon styled component correctly', () => {
    const removeRecordIcon = shallow(<RemoveRecordIcon />);
    const removeRecordIconDark = shallow(<RemoveRecordIcon darkMode />);

    expect(removeRecordIcon.props().className).toEqual('sc-gswNZR fFRNRd');
    expect(removeRecordIconDark.props().className).toEqual('sc-gswNZR gbcbLW');
  });

  it('renders TableBodyRow styled component correctly', () => {
    const tableBodyRow = shallow(<TableBodyRow />);
    const tableBodyRowDark = shallow(<TableBodyRow darkMode />);
    const tableBodyRowFontColor = shallow(<TableBodyRow selectedfontcolor='red' />);
    const tableBodyRowColor = shallow(<TableBodyRow selectedcolor='black' />);
    const tableBodyRowTableColor = shallow(<TableBodyRow tablebodycolor='beige' />);

    expect(tableBodyRow.props().className).toEqual('sc-hLBbgP kSsfzW');
    expect(tableBodyRowDark.props().className).toEqual('sc-hLBbgP fHMFcl');
    expect(tableBodyRowFontColor.props().className).toEqual('sc-hLBbgP lhvPnN');
    expect(tableBodyRowColor.props().className).toEqual('sc-hLBbgP bUhKhO');
    expect(tableBodyRowTableColor.props().className).toEqual('sc-hLBbgP fJjpoF');
  });

  it('renders TableBodyStyled styled component correctly', () => {
    const tableBodyStyled = shallow(<TableBodyStyled />);
    const tableBodyStyledDark = shallow(<TableBodyStyled darkMode />);

    expect(tableBodyStyled.props().className).toEqual('sc-jSUZER bMCuVv');
    expect(tableBodyStyledDark.props().className).toEqual('sc-jSUZER hziwbF');
  });

  it('renders TableBodyCellInput styled component correctly', () => {
    const tableBodyCellInput = shallow(<TableBodyCellInput />);
    const tableBodyCellInputDark = shallow(<TableBodyCellInput darkMode />);
    const tableBodyCellInputEdit = shallow(<TableBodyCellInput isediting />);

    expect(tableBodyCellInput.props().className).toEqual('sc-eDvSVe fKCprM');
    expect(tableBodyCellInputDark.props().className).toEqual('sc-eDvSVe dZnVUG');
    expect(tableBodyCellInputEdit.props().className).toEqual('sc-eDvSVe dksfxq');
  });
});
