import { alertReducer } from '../context/AlertReducer';

describe('alertReducer tests', () => {
  it('handles alertReducer', () => {
    expect(alertReducer({}, { type: '' })).toEqual({});

    expect(alertReducer({}, { type: 'SET_ALERT', fadeOut: true, payload: 'Test' })).toEqual({
      alert: 'Test',
      fadeOut: true,
    });

    expect(alertReducer({}, { type: 'REMOVE_ALERT' })).toEqual({
      alert: null,
      fadeOut: false,
    });

    expect(alertReducer({}, { type: 'FADE_ALERT', fadeOut: true })).toEqual({
      fadeOut: true,
    });
  });
});
