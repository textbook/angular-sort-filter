import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getNames() {
    return element.all(by.css('li.person .name')).map(el => el.getText());
  }

  getHeader() {
    return element(by.css('h1')).getText();
  }
}
