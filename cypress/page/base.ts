import { CounterLocators, counterLocators } from '../locators/index';
import data from '../fixtures/data.json';

export class BasePage {

    readonly counterLocator: CounterLocators;
    readonly data = data;

    constructor() {
        this.counterLocator = counterLocators();
        this.data = data;
    }

    navigateTo(url : string) {
        cy.visit(url);        
    }

    getElement(locator: string) {
        return cy.get(locator);
    }
    clickElement(locator: string) {
        this.getElement(locator).click();
    }
}