# DeFi Staking dApp

A production-ready decentralized staking platform built with **Next.js 15**, **Wagmi v2**, and **Viem**. Users can connect their wallet, approve ERC-20 tokens, stake, withdraw, and view real-time transaction history — all with financial-grade UX.

🔗 **Live Demo**: [https://staking-dapp-smoky-psi.vercel.app](https://staking-dapp-smoky-psi.vercel.app)  
📦 **Smart Contracts**: Solidity 0.8.20 (Hardhat), located in `/contract`

---

## 🚀 Features

- ✅ **Wallet Connection** – MetaMask, Rabby, or any injected provider.
- ✅ **ERC-20 Approve & Stake** – Two-step flow with granular transaction state machine (`idle → approving → staking → confirming → success/error`).
- ✅ **Withdraw** – Unstake tokens with balance validation and over-withdrawal prevention.
- ✅ **Real-Time Event Streaming** – `Staked` events streamed live via `watchContractEvent`.
- ✅ **Transaction History Dashboard** – Built with **TanStack Table**: global search, sortable columns, pagination (5/10 rows per page), color-coded action badges.
- ✅ **SSR-Safe** – Custom `useIsMounted` hook using `useSyncExternalStore` eliminates hydration mismatches.
- ✅ **Fully Typed** – TypeScript strict mode + `as const` ABIs for compile-time safety.

---

## 🖼️ Screenshots

![Dashboard](./screenShot.png)

---

## 🛠 Tech Stack

| Layer                  | Technology                                       |
| :--------------------- | :----------------------------------------------- |
| **Frontend Framework** | Next.js 15 (App Router)                          |
| **Language**           | TypeScript                                       |
| **Web3 SDK**           | Wagmi v2 + Viem                                  |
| **Styling**            | Tailwind CSS                                     |
| **State Management**   | TanStack Query (React Query)                     |
| **Data Table**         | TanStack Table                                   |
| **Icons**              | Lucide React                                     |
| **Smart Contracts**    | Solidity 0.8.20 (Hardhat)                        |
| **Deployment**         | Vercel (Frontend) + Hardhat Ignition (Contracts) |

---

## 📁 Project Structure
```
staking-dapp/
├── contract/ # Hardhat project (Smart Contracts)
│ ├── contracts/ # MockToken.sol, Staking.sol
│ ├── ignition/ # Deployment modules
│ └── ...
└── frontend/ # Next.js application
├── src/
│ ├── app/ # App Router pages & layout
│ ├── components/ # StakeButton, StakingHistoryTable, EventList...
│ ├── hooks/ # useAllowance, useStake, useStakeEvents...
│ ├── lib/ # wagmi config & contract ABIs
│ └── utils/ # toBigIntSafe, formatAmount, formatAddress
├── public/ # Static assets
├── screenshots/ # Project screenshots
└── package.json
```

## 🧩 Key Engineering Highlights

### 1. 7-State Transaction Machine

Instead of a simple `loading` boolean, the stake/unstake flow uses a precise state machine:  
`idle → approving → staking → confirming → success/error`  
This gives users real-time, granular feedback at every step — essential for financial applications.

### 2. SSR Hydration Solved

Next.js App Router hydration mismatches are eliminated with a custom `useIsMounted` hook built on `useSyncExternalStore`. Zero flicker, zero errors.

### 3. Real-Time Event Streaming

`useStakeEvents` subscribes to the contract's `Staked` event via Viem's `watchContractEvent`. New events are prepended to the list instantly — no polling required.

### 4. Production-Grade Data Table

Built with **TanStack Table**, the `StakingHistoryTable` component features:

- Global text search across all columns
- Sortable columns (Amount, Time)
- Pagination (5 rows per page, first/prev/next/last controls)
- Color-coded badges (Stake = green, Withdraw = red)
- Transaction hash links to Etherscan
- **SSR-safe** — static mock data ensures zero hydration errors

---

## 🔧 Local Development

### Prerequisites

- Node.js 18+
- MetaMask or Rabby wallet
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/gloria238/staking-dapp.git
cd staking-dapp
```

### 2. Start Local Blockchain (Hardhat Node)

```bash
cd contract
npm install
npx hardhat node
```

Keep this terminal running — it starts a local Ethereum node on `http://127.0.0.1:8545`.

### 3. Deploy Contracts Locally

Open a new terminal:

```bash
cd contract
npx hardhat ignition deploy ./ignition/modules/Staking.ts --network localhost
```

### 4. Run the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Connect Wallet

- Add Hardhat local network to MetaMask:
  - **Network Name**: Hardhat Local
  - **RPC URL**: `http://127.0.0.1:8545`
  - **Chain ID**: `31337`
  - **Currency Symbol**: ETH
- Import a test account using one of the private keys displayed in the Hardhat node terminal.

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd frontend
npx vercel --prod
```

### Contracts (Testnet / Mainnet)

1. Update `hardhat.config.ts` with your target network RPC URL and deployer private key.

2. Deploy:

   ```bash
   npx hardhat ignition deploy ./ignition/modules/Staking.ts --network sepolia
   ```

3. Update the contract address in `frontend/src/lib/contract.ts`.

---

## 📝 License

MIT

---

## 👤 Author

**Danni Han (Gloria)**  
Web3 Frontend Developer  
📧 gloria_2384619@proton.me  
💬 Discord: gloria01744  
🔗 GitHub: [github.com/gloria238](https://github.com/gloria238)
