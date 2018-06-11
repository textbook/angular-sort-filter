import { AppPage } from './app.po';

describe('angular-sort-filter application', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display a title', () => {
    expect(page.getHeader()).toEqual('Angular Sorting and Filtering');
  });

  it('should display five people', () => {
    expect(page.getNames().then(result => result.length)).toEqual(5);
  });

  it('should allow user to fetch different people', () => {
    const initialNames = page.getNames();

    page.refreshPeople();

    expect(page.getNames()).not.toEqual(initialNames);
  });

  it('should allow user to sort by name', () => {
    const initialNames = page.getNames();

    page.sortPeople();

    expect(page.getNames()).toEqual(initialNames.then(names => names.sort()));
  });
});
