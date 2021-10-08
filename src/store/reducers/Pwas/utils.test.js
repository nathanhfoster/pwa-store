import { handleFilterItems } from './utils';

export const applePwa = {
  id: 1,
  name: 'Apples',
  url: 'apples.com',
  slug: 'apples',
  description: 'Apples is great',
  views: 100,
  launches: 100,
  ratings: [],
  organization: { name: 'Apple', description: 'Apple' },
  tags: [],
  manifest_json: {
    name: '',
    short_name: '',
    description: '',
    author: 1,
    keywords: [],
    categories: []
  },
  updated_at: ''
};
export const googlePwa = {
  id: 2,
  name: 'Google',
  url: 'google.com',
  slug: 'google',
  description: 'Google is great',
  views: 100,
  launches: 100,
  ratings: [],
  organization: { name: 'Google', description: 'Google' },
  tags: [],
  manifest_json: {
    name: '',
    short_name: '',
    description: '',
    author: 1,
    keywords: [],
    categories: []
  },
  updated_at: ''
};

describe('store/reducers/Pwas/utils', () => {
  describe('handleFilterItems', () => {
    let items;
    let filterItems;
    let search;

    beforeEach(() => {
      items = [applePwa];
      filterItems = [googlePwa];
    });

    it('should filterItems correctly', () => {
      search = 'google';

      const result = handleFilterItems(items.concat(filterItems), search);

      expect(result).toMatchObject({ items: [googlePwa], filteredItems: [applePwa] });
    });
  });
});
