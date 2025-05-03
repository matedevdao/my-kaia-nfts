import { BodyNode, el, Router, View } from "@commonmodule/app";
import { LoggedInUserAvatarButton } from "@commonmodule/social-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
export default class Layout extends View {
    static _current;
    static setContent(content) {
        Layout._current.contentContainer.append(content);
    }
    contentContainer;
    constructor() {
        super();
        Layout._current = this;
        this.container = el(".layout", el("header", el("h1", el("a", "My Kaia NFTs", { onclick: () => Router.go("/") })), el(".button-container", new LoggedInUserAvatarButton(KaiaWalletLoginManager))), this.contentContainer = el("main")).appendTo(BodyNode);
    }
}
//# sourceMappingURL=Layout.js.map