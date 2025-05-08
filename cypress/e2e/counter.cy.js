import { CounterPage } from "../page/counter";
describe('Counter scenarios', () => {
    const counterPage = new CounterPage();
    beforeEach(() => {
        counterPage.userNavigatesTo();
    });
    it("T01 - User should be navigate to the counter page, display increment and decrement button and counter display with default value 0", () => {
        counterPage.assertCounterValue(counterPage.data.defaultValue);
        counterPage.assertIncrementButton();
        counterPage.assertDecrementButton();
    });
    it("T02 - User should be able to increment the counter", () => {
        counterPage.userIncrementCounter();
        counterPage.assertCounterValue(counterPage.data.positiveValue);
    });
    it("T03 - User should be able to decrement the counter", () => {
        counterPage.userDecrementCounter();
        counterPage.assertCounterValue(counterPage.data.negativeValue);
    });
    it("T04 - User should be able decrement and increment the counter", () => {
        counterPage.userDecrementCounter();
        counterPage.userIncrementCounter();
        counterPage.assertCounterValue(counterPage.data.defaultValue);
    });
    it("T05 - User should be able increment and decrement the counter", () => {
        counterPage.userIncrementCounter();
        counterPage.userDecrementCounter();
        counterPage.assertCounterValue(counterPage.data.defaultValue);
    });
});
