import { CounterPage } from "../page/counter";
describe('Counter edge cases', () => {
    const counterPage = new CounterPage();
    beforeEach(() => {
        counterPage.userNavigatesTo();
    });
    it("Counter not display float value", () => {
        counterPage.userIncrementCounter();
        counterPage.userIncrementCounter();
        counterPage.assertCounterValueNotDisplay(counterPage.data.floatValue);
    });
    it("Counter not display empty value", () => {
        counterPage.userIncrementCounter();
        counterPage.assertCounterValueNotDisplay(counterPage.data.emptyValue);
    });
    it("Counter not display text value", () => {
        counterPage.userDecrementCounter();
        counterPage.assertCounterValueNotDisplay(counterPage.data.textValue);
    });
    it("Counter not display boolean value", () => {
        counterPage.userDecrementCounter();
        counterPage.assertCounterValueNotDisplay(counterPage.data.booleanValue);
    });
});
