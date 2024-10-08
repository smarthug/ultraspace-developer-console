import { useState } from 'react';
import { Account, Wallet } from "@nice-xrpl/react-xrpl";
import { WalletUI } from './wallet-ui';

export function LoadWalletFromSeed({ seed: inputSeed }: { seed: string }) {
    const [seed, setSeed] = useState(inputSeed);
    const [input, setInput] = useState('');

    return seed ? (
        <Wallet seed={seed}>
            <div>A wallet from a seed</div>
            <Account>
                <WalletUI />
            </Account>
        </Wallet>
    ) : (
        <div>
            Enter a seed:{' '}
            <input
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
            />{' '}
            <button
                onClick={() => {
                    setSeed(input);
                }}
            >
                Load Wallet
            </button>
        </div>
    );
}
