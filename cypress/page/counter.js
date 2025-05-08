import { BasePage } from "./base";
export class CounterPage extends BasePage {
    constructor() {
        super();
    }
    userNavigatesTo() {
        this.navigateTo('/index.html');
    }
    userIncrementCounter() {
        this.clickElement(this.counterLocator.incrementButton);
    }
    userDecrementCounter() {
        this.clickElement(this.counterLocator.decrementButton);
    }
    assertCounterValue(value) {
        this.getElement(this.counterLocator.counterValue).should('have.text', value);
    }
    assertCounterValueNotDisplay(value) {
        this.getElement(this.counterLocator.counterValue).should('not.have.value', value);
    }
    assertIncrementButton() {
        this.getElement(this.counterLocator.incrementButton).should('be.visible');
    }
    assertDecrementButton() {
        this.getElement(this.counterLocator.decrementButton).should('be.visible');
    }
}
