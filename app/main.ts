import { Router } from "@commonmodule/app";
import { MDDModuleConfig } from "matedevdao-common";
import ConnectRequiredView from "./views/ConnectRequiredView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import NFTView from "./views/NFTView.js";

MDDModuleConfig.init({
  appName: "My Kaia NFTs",
});

Router
  .add("/*", Layout, "/connect-required")
  .add("/", HomeView)
  .add("/:collection/:id", NFTView)
  .add("/connect-required", ConnectRequiredView);
