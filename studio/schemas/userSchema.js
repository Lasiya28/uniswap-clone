//(2) Define user schema

export const userSchema = {
    name: "users",
    title: "Users",
    type: "document",
    fields: [
        {
            name: "address",
            title: "Wallet ID",
            type: "string"
        },
        {
            name: "userName",
            title: "User Name",
            type: "string"
        },
        {
            name: "transactions",
            title: "Transactions",
            type: "array", //The field that saves the actual transactions is of type reference so it is an array
            of: [
                {
                    type: "reference",
                    to: [{ type: "transactions" }] //creating a relation between the user and transaction schema
                }
            ]
        },
    ]
}