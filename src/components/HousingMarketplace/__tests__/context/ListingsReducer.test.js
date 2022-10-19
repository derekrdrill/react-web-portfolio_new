import { listingsReducer } from '../../context/listingsReducer';

describe('listingsReducer tests', () => {
  it('handles listingsReducer', () => {
    expect(listingsReducer({}, { type: '' })).toEqual({});

    expect(
      listingsReducer(
        {},
        {
          type: 'SET_IS_CONFIRMING_DELETE',
          isConfirmingDelete: true,
          modalName: 'Modal Name',
          modalLocation: 'Modal Location',
        },
      ),
    ).toEqual({
      isConfirmingDelete: true,
      modalName: 'Modal Name',
      modalLocation: 'Modal Location',
    });

    expect(
      listingsReducer(
        {},
        {
          type: 'SET_IS_DELETING',
          isDeleting: true,
          deleteComplete: true,
        },
      ),
    ).toEqual({
      isDeleting: true,
      deleteComplete: true,
    });

    expect(
      listingsReducer(
        {},
        {
          type: 'SET_DELETE_COMPLETE',
          deleteComplete: true,
        },
      ),
    ).toEqual({
      deleteComplete: true,
    });

    expect(
      listingsReducer(
        {},
        {
          type: 'SET_IS_EDITING',
          isEditing: true,
        },
      ),
    ).toEqual({
      isEditing: true,
    });
  });
});
