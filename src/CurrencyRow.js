import React from 'react'

export default function CurrencyRow(props) {
    const { currencyOption, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;
    return (
        <div>
            <input className="input" type="number" value={amount} onChange={onChangeAmount}></input>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOption.map((d) => {
                    return <option key={d} value={d}>{d}</option>
                })}

            </select>
        </div>
    )
}
