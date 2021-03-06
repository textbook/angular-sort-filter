import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  personCount() {
    return element.all(by.css('li.person')).count();
  }

  getNames() {
    return element.all(by.css('li.person .name')).map(el => el.getText());
  }

  getHeader() {
    return element(by.css('h1')).getText();
  }

  refreshPeople() {
    return element(by.buttonText('Refresh')).click();
  }

  sortPeople() {
    return element(by.buttonText('Sort')).click();
  }

  filterPeopleByNationality(nationality: string) {
    return element(by.buttonText(`Filter ${nationality}`)).click();
  }
}
