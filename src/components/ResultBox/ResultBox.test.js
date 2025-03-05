import ResultBox from "./ResultBox";
import { render, cleanup, screen } from "@testing-library/react";
import '@testing-library/jest-dom'


afterEach(cleanup);

const testsCase = (testCase) => {
    const { from, to, amount, expected } = testCase;
    render(<ResultBox from={from} to={to} amount={amount} />);
    const output = screen.getByTestId('resultDiv');
    expect(output).toHaveTextContent(expected);
};

describe("Component ResultBox", () => {
    it("should render without crashing", () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it("should render proper info about conversion when PLN -> USD”.", () => {
        const testCases = [
            { from: "PLN", to: "USD", amount: 100, expected: "PLN 100.00 = $28.57" },
            { from: "PLN", to: "USD", amount: 15, expected: "PLN 15.00 = $4.29" },
            { from: "PLN", to: "USD", amount: 30, expected: "PLN 30.00 = $8.57" },
        ];

        for (const testCase of testCases) {
            testsCase(testCase);
            cleanup();
        }
    });
    it("should render proper info about conversion when USD -> PLN”.", () => {
        const testCases = [
            { from: "USD", to: "PLN", amount: 100, expected: "$100.00 = PLN 350.00" },
            { from: "USD", to: "PLN", amount: 11, expected: "$11.00 = PLN 38.50" },
            {
                from: "USD", to: "PLN", amount: 101.1, expected: "$101.10 = PLN 353.85",
            },
        ];
        for (const testCase of testCases) {
            testsCase(testCase);
            cleanup();
        }
    });
    it("should render proper info about conversion when PLN -> PLN”.", () => {
        const testCases = [
            { from: "PLN", to: "PLN", amount: 123, expected: "PLN 123.00 = PLN 123.00", },
            { from: "PLN", to: "PLN", amount: 17, expected: "PLN 17.00 = PLN 17.00" },
        ];
        for (const testCase of testCases) {
            testsCase(testCase);
            cleanup();
        }
    });

    it("should render proper info about conversion when usd -> usd”.", () => {
        const testCases = [
            { from: "USD", to: "USD", amount: 123, expected: "$123.00 = $123.00", },
            { from: "USD", to: "USD", amount: 17, expected: "$17.00 = $17.00" },
        ];
        for (const testCase of testCases) {
            testsCase(testCase);
            cleanup();
        }
    });
    it("should render proper info about conversion when USD -> USD”.", () => {
        render(<ResultBox from="USD" to="USD" amount={100} />);
        const output = screen.getByTestId('resultDiv');
        expect(output).toHaveTextContent("$100.00 = $100.00");
    });

    it("should render error message for negative values”.", () => {
        render(<ResultBox from="PLN" to="USD" amount={-100} />);
        const output = screen.getByTestId('resultDiv');
        expect(output).toHaveTextContent("Scheisse Geld");
    });
});