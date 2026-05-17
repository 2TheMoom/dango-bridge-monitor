export const DANGO_CHAIN_ID = 1399904803;
export const DANGO_DOMAIN_ID = 1399904803;

// Ethereum Hyperlane Mailbox (canonical, from hyperlane-registry)
export const ETH_MAILBOX = "0xc005dc82818d67AF737725bD4bf75435d065D239";

// USDC on Ethereum mainnet (Circle official)
export const ETH_USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// The only active route right now: ETH → Dango (USDC deposits)
export const ACTIVE_ROUTES = [
  {
    from: { chainId: 1, name: "Ethereum", short: "ETH", color: "#627EEA" },
    to:   { chainId: DANGO_CHAIN_ID, name: "Dango", short: "DNG", color: "#ff6b35" },
    asset: "USDC",
    direction: "deposit",
    note: "USDC locked on Ethereum, synthetic minted on Dango",
  },
];

// Chains relevant to Dango only
export const DANGO_CHAINS = [
  { id: 1, name: "Ethereum", short: "ETH", color: "#627EEA" },
  { id: DANGO_CHAIN_ID, name: "Dango", short: "DNG", color: "#ff6b35" },
];

export const RISK_THRESHOLDS = {
  stuckMessageMs: 15 * 60 * 1000,
  failureRateWarning: 2,
  failureRateCritical: 5,
  latencyWarning: 30,
  latencyCritical: 60,
  minValidators: 3,
};

export const ISM_VALIDATORS: Record<number, { count: number; threshold: number }> = {
  1: { count: 5, threshold: 3 },
};

// Filter helper: is this message relevant to Dango?
export function isDangoMessage(originChainId: number, destinationChainId: number): boolean {
  return originChainId === DANGO_CHAIN_ID ||
         destinationChainId === DANGO_CHAIN_ID ||
         (originChainId === 1 && destinationChainId === DANGO_CHAIN_ID);
}