# This is a simple clone for the Uniswap crypto trading web app

Stack :-

- React
- Next js
- Tailwind

- Sanity.io
- Solidity

_client ==> Next App (front-end)_
_smart_contract ==> Solidity_
_studio ==> Sanity (database)_

1. Create client next-app with tailwind

2. Create 3 folders : client, smart_contract, studio

3. Install sanity cli dependencies in studio.

4. To create schema for user ids and their respective details
   for the structure :-

   schemas folder in studio -> create file transactionSchema.js & userSchema.js

5. Page for each transaction details in transactionSchema.js

6. Page for each user details in userSchema.js

*To run Sanity from studio run "sanity start"*

7. Start front-end in client folder : index file.

8. In components folder add Header.js file to create component.

9. Install react-icons package.

10. Add icons and implement header page in Header.js

11. Create buttons and place icons.


# Add form like Uniswap

12. Create header and swap input components Main.js in components folder.

13. Create actual form components in Main.js


# Creating wallet connection with MetaMask

14. Create "context" folder in client using context API to store components and props. Create TransactionContext.js in folder.

15. Implement connectWallet metamask function in TransactionContext and call function in header.js


# Solidity smart contract and Hard Hat

16. Install hardhat dependencies and create new hardhat project inside smart_contracts: npx hardhat.

17. Change greetings.sol to Transactions.sol and create smart contract function.

18. In scripts folder, create deploy.js to get transaction from factory.

19. After deploy code in deploy.js, npx hardhat compile

20. Go to hardhat.config.js, Create Alchemy.io account, create app, go to dashboard and "View Key"

21. Copy HTTP key and paste in hardhat.config.js url:

22. Run "npx hardhat run scripts/deploy.js --network rinkeby" based on script and network name.

23. get signer address from terminal after running previous command and paste in constants.js as variable contractAddress

# Processing crypto transfers / Sending funds using Ethers.js

...*50 something to 1 hour mark please re-watch and update here...*

   contractAddress: Gets contact address in terminal after running npx hardhat deploy command,
   contractABI: is like an API like the contract interface on how the contract works,
   signer: Pulls signer info when the three dots icon is clicked; once signed it gives read or write access

23. Create folder named "lib" in client, go to "smart_contract/artifact/transactions.json" 

24. copy that json file and paste in lib folder.

25. Create new file in lib called constants.js in "lib" folder.

26. import contractABI and transactionAddress in transactionContext.

27. Run "yarn add ethers" in client.

# Store transaction history in Sanity.io database


28. Create sanityClient.js in "lib" folder.

29. Go to sanity.io/manage, go to [project name]/API, Add CORS origin "https://localhost"
*NOTE: Always check localhost endpoint in CORS origins properly, even http:// or https:// might cause CORS error*

30. "Add API Token" in Settings/Tokens, Editor permission, copy Token and Project ID.

31. Import sanityClient in sanityClient.js, yarn add @sanity/client. Add code block to set up sanity.

32. Import client variable in transaction context and create saveTransaction function in transactionContext to save transaction
    info to sanity studio.

33. Add useffect for creating user profiles for non existing accounts in transactionContext.js. 

# Making transaction history display

34. Create new component transactionHistory.js.

35. useffect and write the query to get past transaction, save in an array and return when needed.

36. Add TransactionHistory component into index.js, create required divs for components.

# Adding loadiong Modal for good UX

37. Implement loading modal trigger in transactionContext.js with useRouter.

38. yarn add react modal in client and import modal in main.js

39. Create file transactionLoader.js, import Moon Loader from react-spinners.

40. Add styling.

