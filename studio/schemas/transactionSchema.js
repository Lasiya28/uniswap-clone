//(1) Define transaction schema, makes up the sanity localhost:3333 front-end

export const transactionSchema = {
  name: "transactions",
  title: "Transactions",
  type: "document",
  fields: [
    {
      name: "txHash",
      title: "Transaction Hash",
      type: "string",
    },
    {
      name: "fromAddress",
      title: "From (Wallet ID)",
      type: "string",
    },
    {
      name: "amount",
      title: "Amount",
      type: "number",
    },
    {
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
    },
  ],
};
