import { BodyNode, el, Router, View } from "@commonmodule/app";
import { Button } from "@commonmodule/app-components";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
export default class Layout extends View {
    static _current;
    static setContent(content) {
        Layout._current.contentContainer.append(content);
    }
    contentContainer;
    constructor() {
        super();
        Layout._current = this;
        this.container = el(".layout", el("header", el(".button-container", new Button({
            title: "Disconnect Wallet",
            onClick: () => {
                KaiaWalletSessionManager.disconnect();
                Router.go("/connect-required");
            },
        }))), this.contentContainer = el("main")).appendTo(BodyNode);
    }
}
//# sourceMappingURL=Layout.js.map