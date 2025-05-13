import { AppRoot, el, Router, View } from "@commonmodule/app";
import { Button, ButtonType } from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
export default class LoginRequiredView extends View {
    constructor() {
        super();
        this.container = el(".login-required-view", el("h1", "지갑 로그인 필요"), el("p", "내 NFT를 확인하려면 지갑 로그인이 필요합니다."), new Button({
            type: ButtonType.Contained,
            title: "지갑 로그인",
            onClick: () => KaiaWalletLoginManager.login(),
        })).appendTo(AppRoot);
        if (KaiaWalletLoginManager.isLoggedIn())
            Router.goWithoutHistory("/");
    }
}
//# sourceMappingURL=LoginRequiredView.js.map