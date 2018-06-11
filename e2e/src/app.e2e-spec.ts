import { AppPage } from './app.po';

describe('angular-sort-filter application', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a title', () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Angular Sorting and Filtering');
  });

  it('should display five people', () => {
    page.navigateTo();
    expect(page.getNames().then(result => result.length)).toEqual(5);
  });

  it('should allow user to fetch different people', () => {
    page.navigateTo();
    const initialNames = page.getNames();

    page.refreshPeople();

    expect(page.getNames()).not.toEqual(initialNames);
  });
});
