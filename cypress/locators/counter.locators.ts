export const counterLocators = () => {
    return {
        counterValue: '[id="counter"]',
        incrementButton: '[id="increment-btn"]',
        decrementButton: '[id="decrement-btn"]'      
    };
}
export type CounterLocators = ReturnType<typeof counterLocators>;