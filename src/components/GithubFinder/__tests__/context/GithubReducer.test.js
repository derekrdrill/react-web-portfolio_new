import { githubReducer } from '../../context/GithubReducer';

describe('githubReducer tests', () => {
  it('handles githubReducer', () => {
    expect(githubReducer({}, { type: '' })).toEqual({});

    expect(githubReducer({}, { type: 'SET_LOADING' })).toEqual({ loading: true });

    expect(githubReducer({}, { type: 'CLEAR_USERS' })).toEqual({
      user: null,
      users: [],
    });

    expect(githubReducer({}, { type: 'CLEAR_USER' })).toEqual({
      user: null,
      loading: false,
    });

    expect(
      githubReducer({}, { type: 'GET_USERS', payload: ['test', 'array', 'for', 'testing'] }),
    ).toEqual({
      users: ['test', 'array', 'for', 'testing'],
      user: null,
      loading: false,
    });

    expect(
      githubReducer(
        {},
        {
          type: 'GET_USER_AND_REPOS',
          payload: { user: 'Test', repos: ['test', 'array', 'of', 'repos'] },
        },
      ),
    ).toEqual({
      repos: ['test', 'array', 'of', 'repos'],
      user: 'Test',
      loading: false,
    });
  });
});
