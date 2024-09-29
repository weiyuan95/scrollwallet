## Website
This project is deployed on [scrollwallet.vercel.app](https://scrollwallet.vercel.app/)

## Dependencies

This app was developed with:

- `node v20.17.0`
- `pnpm v9.9.0`

As well as the other dependencies specified in the `package.json` file.

## Getting Started

Run the development server:

```bash
corepack enable
pnpm i
pnpm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) on your browser.

## Design decisions / Caveats
- This application assumes that the user has Metamask installed, and is only using 1 account instead of switching between
multiple accounts. It would be better to consider a more robust solution such as [Wagmi](https://wagmi.sh/)
for handling (multiple) browser wallets, instead of rolling our own solution in `MetamaskWalletProvider.tsx`
- A component library, [Mantine](https://github.com/mantinedev/mantine), was used heavily in this project.
This was to speed up development and ensure a consistent design language across the app. In an actual working environment,
it would be better to use a CSS utility library like Tailwind to ensure a design that fits to the company's design language
- The app works well from a mobile viewport, however, for components like the transaction history, it might be better to consider an
alternative design for mobile viewports since tables do not fit well on mobile screens
- There are no tests the assessment did not ask for it, however, it would be good to use a library like [Playwright](https://playwright.dev/)
to test user flows