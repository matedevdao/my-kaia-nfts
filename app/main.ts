import { MDDModuleConfig } from "matedevdao-common";
import { Router } from "@commonmodule/app";
import HomeView from "./views/HomeView.js";
import ConnectRequiredView from "./views/ConnectRequiredView.js";
import Layout from "./views/Layout.js";

MDDModuleConfig.init({
  appName: "My Kaia NFTs",
});

Router
  .add("/*", Layout, "/connect-required")
  .add("/", HomeView)
  .add("/connect-required", ConnectRequiredView);
