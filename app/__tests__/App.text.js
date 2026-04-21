import { API_BASE_URL, getBaseRequestHTTP } from "../services/api";

const token = ''

export const fetchUser = async (userId) => {
    const url = `${API_BASE_URL}/users/profile/${userId}`;
    const fetchReq = getBaseRequestHTTP('GET', token);
    const response = await fetch(url, fetchReq);

    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return await response.json();
};


describe('Create degree', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Success', async () => {
    const mockData = {};

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchUser(0);

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/user');
  });

  it('Failure', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    await expect(fetchUser(0)).rejects.toThrow('Failed to fetch');
  });

});