import { el, Router, View } from "@commonmodule/app";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { HoldingNFTList } from "matedevdao-common";
import Layout from "./Layout.js";

export default class HomeView extends View {
  constructor() {
    super();
    if (!KaiaWalletLoginManager.isLoggedIn()) {
      Router.goWithoutHistory("/login-required");
    } else {
      const nftList = new HoldingNFTList(
        KaiaWalletLoginManager.getLoggedInAddress()!,
      );
      nftList.on(
        "selectNFT",
        (nftData) => Router.go(`/${nftData.collection}/${nftData.id}`, nftData),
      );
      Layout.setContent(this.container = el(".home-view", nftList));
    }
  }
}
