import { BodyNode, el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";

export default class HomeView extends View {
  constructor() {
    super();
    this.container = el(".home-view").appendTo(BodyNode);

    if (!KaiaWalletSessionManager.isConnected()) {
      Router.goWithoutHistory("/connect-required");
    }
  }
}
