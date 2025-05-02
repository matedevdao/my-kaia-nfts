import { Router, SPAInitializer } from "@commonmodule/app";
import { KaiaWalletLoginConfig } from "kaia-wallet-login-module";
import { MDDModuleConfig } from "matedevdao-common";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import LoginRequiredView from "./views/LoginRequiredView.js";
import NFTView from "./views/NFTView.js";

SPAInitializer.init();

if (location.pathname.includes("/my-kaia-nfts")) {
  Router.prefix = "/my-kaia-nfts";
}

MDDModuleConfig.init();

KaiaWalletLoginConfig.init({
  appName: "My Kaia NFTs",
  apiBaseURL: "https://api.matedevdao.workers.dev",
  walletConnectProjectId: "647df3b69553d6f1261ea1482bd90d4a",
});

Router
  .add("/*", Layout, "/loign-required")
  .add("/", HomeView)
  .add("/:collection/:id", NFTView)
  .add("/loign-required", LoginRequiredView);
