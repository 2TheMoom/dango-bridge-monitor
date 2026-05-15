// Dango chain configuration for Hyperlane PI chain queries
export const DANGO_CHAIN_ID = 1399904803;

export const dangoChainConfig = {
  chainId: DANGO_CHAIN_ID,
  name: "dango",
  protocol: "cosmos",
  rpcUrls: [{ http: "https://rpc.dango.exchange" }],
  blockExplorers: [],
  contracts: {},
};

// All chains connected to Dango via Hyperlane
export const CONNECTED_CHAINS = [
  { id: 1,     name: "Ethereum",  short: "ETH",  color: "#627EEA" },
  { id: 42161, name: "Arbitrum",  short: "ARB",  color: "#28A0F0" },
  { id: 8453,  name: "Base",      short: "BASE", color: "#0052FF" },
  { id: 10,    name: "Optimism",  short: "OP",   color: "#FF0420" },
  { id: 137,   name: "Polygon",   short: "POLY", color: "#8247E5" },
];

// Risk thresholds
export const RISK_THRESHOLDS = {
  // Messages pending longer than this are flagged (ms)
  stuckMessageMs: 15 * 60 * 1000,

  // Failure rate above this triggers a warning (percentage)
  failureRateWarning: 2,
  failureRateCritical: 5,

  // Latency above this triggers a warning (seconds)
  latencyWarning: 30,
  latencyCritical: 60,

  // Minimum recommended ISM validators
  minValidators: 3,
};

// ISM validator mock config — replace with live contract reads once mainnet matures
export const ISM_VALIDATORS: Record<number, { count: number; threshold: number }> = {
  1:     { count: 5, threshold: 3 },
  42161: { count: 5, threshold: 3 },
  8453:  { count: 3, threshold: 2 },
  10:    { count: 3, threshold: 2 },
  137:   { count: 3, threshold: 2 },
};