import { darkLightModeReducer } from '../context/DarkLightModeReducer';

describe('darkLightModeReducer tests', () => {
  it('handles darkLightModeReducer', () => {
    expect(darkLightModeReducer({}, { type: '' })).toEqual({});

    expect(darkLightModeReducer({}, { type: 'SET_DARK_MODE', darkMode: true })).toEqual({
      darkMode: true,
    });
  });
});
