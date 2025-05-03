import { Router, SPAInitializer } from "@commonmodule/app";
import { MDDModuleConfig } from "matedevdao-common";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import LoginRequiredView from "./views/LoginRequiredView.js";
import NFTView from "./views/NFTView.js";

SPAInitializer.init();

if (location.pathname.includes("/my-kaia-nfts")) {
  Router.prefix = "/my-kaia-nfts";
}

MDDModuleConfig.init({ appName: "My Kaia NFTs" });

Router
  .add("/*", Layout, "/loign-required")
  .add("/", HomeView)
  .add("/:collection/:id", NFTView)
  .add("/loign-required", LoginRequiredView);
