import { useCurrencyBalance } from "@nice-xrpl/react-xrpl";

export function CurrencyBalance() {
    const currencies = useCurrencyBalance();

    return (
        <div>
            {currencies.map((currency) => {
                return (
                    <div key={`${currency.issuer}-${currency.currency}`}>
                        {currency.value} {currency.currency} (issuer:
                        {currency.issuer})
                    </div>
                );
            })}
        </div>
    );
}
