import { el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { HoldingNFTList } from "matedevdao-common";
import Layout from "./Layout.js";

export default class HomeView extends View {
  constructor() {
    super();
    if (!KaiaWalletSessionManager.isConnected()) {
      Router.goWithoutHistory("/connect-required");
    } else {
      const nftList = new HoldingNFTList(
        KaiaWalletSessionManager.getConnectedAddress()!,
      );
      nftList.on(
        "selectNFT",
        (nftData) => Router.go(`/${nftData.collection}/${nftData.id}`, nftData),
      );
      Layout.setContent(this.container = el(".home-view", nftList));
    }
  }
}
