import { BodyNode, el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { HoldingNFTList } from "matedevdao-common";
import Layout from "./Layout.js";

export default class HomeView extends View {
  constructor() {
    super();
    if (!KaiaWalletSessionManager.isConnected()) {
      Router.goWithoutHistory("/connect-required");
    } else {
      Layout.setContent(
        this.container = el(
          ".home-view",
          new HoldingNFTList(KaiaWalletSessionManager.getConnectedAddress()!),
        ),
      );
    }
  }
}
