import { BodyNode, DomNode, el, Router, View } from "@commonmodule/app";
import { Button } from "@commonmodule/app-components";
import { KaiaWalletSessionManager } from "kaia-wallet-module";

export default class Layout extends View {
  private static _current: Layout;

  public static setContent(content: DomNode) {
    Layout._current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    Layout._current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        el("h1", el("a", "My Kaia NFTs", { onclick: () => Router.go("/") })),
        el(
          ".button-container",
          new Button({
            title: "Disconnect Wallet",
            onClick: () => {
              KaiaWalletSessionManager.disconnect();
              Router.go("/loign-required");
            },
          }),
        ),
      ),
      this.contentContainer = el("main"),
    ).appendTo(BodyNode);
  }
}
