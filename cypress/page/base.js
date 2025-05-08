import { counterLocators } from '../locators/index';
import data from '../fixtures/data.json';
export class BasePage {
    constructor() {
        this.data = data;
        this.counterLocator = counterLocators();
        this.data = data;
    }
    navigateTo(url) {
        cy.visit(url);
    }
    getElement(locator) {
        return cy.get(locator);
    }
    clickElement(locator) {
        this.getElement(locator).click();
    }
}
