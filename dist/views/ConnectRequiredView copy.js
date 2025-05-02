import { BodyNode, el, Router, View } from "@commonmodule/app";
import { Button, ButtonType } from "@commonmodule/app-components";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
export default class ConnectRequiredView extends View {
    constructor() {
        super();
        this.container = el(".connect-required-view", el("h1", "지갑 연결 필요"), el("p", "내 NFT를 확인하려면 지갑을 연결해야 합니다."), new Button({
            type: ButtonType.Contained,
            title: "지갑 연결",
            onClick: async () => {
                await KaiaWalletSessionManager.connect();
                Router.go("/");
            },
        })).appendTo(BodyNode);
        if (KaiaWalletSessionManager.isConnected())
            Router.goWithoutHistory("/");
    }
}
//# sourceMappingURL=ConnectRequiredView%20copy.js.map