import { TransactionLogEntry, useTransactionLog } from '@nice-xrpl/react-xrpl';

function processEntry(entry: TransactionLogEntry) {
  if (entry.type === 'PaymentReceived') {
    return (
      <div key={`${entry.account}-${entry.hash}`}>
        {entry.type}: Recieved {entry.payload.amount} from {entry.from}
      </div>
    );
  }

  if (entry.type === 'PaymentSent') {
    return (
      <div key={`${entry.account}-${entry.hash}`}>
        {entry.type}: Sent {entry.payload.amount} to {entry.to}
      </div>
    );
  }

  if (entry.type === 'CurrencySent') {
    return (
      <div key={`${entry.account}-${entry.hash}`}>
        {entry.type}: Sent {entry.payload.amount.currency} {entry.payload.amount.value} to {entry.to}
      </div>
    );
  }

  if (entry.type === 'CurrencyReceived') {
    return (
      <div key={`${entry.account}-${entry.hash}`}>
        {entry.type}: Recieved {entry.payload.amount.currency} {entry.payload.amount.value} from {entry.from}
      </div>
    );
  }

  if (entry.type === 'CreateSellOffer') {
    return (
      <div key={`${entry.payload.offerId}-${entry.hash}`}>
        {entry.type}: Created sell offer for {entry.payload.token}
      </div>
    );
  }

  if (entry.type === 'AcceptSellOffer') {
    return (
      <div key={`${entry.payload.offerId}-${entry.hash}`}>
        {entry.type}: Accepted sell offer for {entry.payload.token}
      </div>
    );
  }

  if (entry.type === 'TokenMint') {
    return (
      <div key={`${entry.payload.token}-${entry.hash}`}>
        {entry.type}: Minted {entry.payload.token}
      </div>
    );
  }

  if (entry.type === 'TokenBurn') {
    return (
      <div key={`${entry.payload.token}-${entry.hash}`}>
        {entry.type}: Burned {entry.payload.token}
      </div>
    );
  }

  return <div>Unprocessed entry: {JSON.stringify(entry)}</div>;
}

export function TransactionLog({ className, account }: { account?: string | string[] }) {
  const log = useTransactionLog(account);

  return (
    <div className={className}>
      {log.map((entry) => {
        return processEntry(entry);
      })}
    </div>
  );
}
