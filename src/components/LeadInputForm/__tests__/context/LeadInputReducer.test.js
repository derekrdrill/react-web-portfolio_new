import { leadInputReducer } from '../../context/leadInputReducer';

describe('leadInputReducer tests', () => {
  it('handles leadInputReducer', () => {
    expect(leadInputReducer({}, { type: '' })).toEqual({});

    expect(leadInputReducer({}, { type: 'TOGGLE_TOOLTIP', payload: true })).toEqual({
      tooltipOpen: true,
    });

    expect(
      leadInputReducer({}, { type: 'SWITCH_PAGES', payload: { page: 1, tooltipOpen: false } }),
    ).toEqual({
      page: 1,
      tooltipOpen: false,
    });
  });
});
