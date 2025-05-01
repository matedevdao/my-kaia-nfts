import { BodyNode, el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { HoldingNFTList } from "matedevdao-common";

export default class HomeView extends View {
  constructor() {
    super();
    this.container = el(".home-view").appendTo(BodyNode);

    if (!KaiaWalletSessionManager.isConnected()) {
      Router.goWithoutHistory("/connect-required");
    } else {
      //TODO: Add your home view content here
      this.container.append(
        new HoldingNFTList("0x8033cEB86c71EbBF575fF7015FcB8F1689d90aC1"),
      );
    }
  }
}
