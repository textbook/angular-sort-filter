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

  it('should display people', () => {
    page.navigateTo();
    expect(page.getNames()).toEqual(['Charlie', 'Angela', 'Barry']);
  });
});
