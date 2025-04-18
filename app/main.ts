import { MDDModuleConfig } from "matedevdao-common";
import { Router } from "@commonmodule/app";
import HomeView from "./views/HomeView.js";
import ConnectRequiredView from "./views/ConnectRequiredView.js";

MDDModuleConfig.init({
  appName: "My Kaia NFTs",
});

Router
  .add("/", HomeView)
  .add("/connect-required", ConnectRequiredView);
