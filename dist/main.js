import { Router, SPAInitializer } from "@commonmodule/app";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { MDDModuleConfig } from "matedevdao-common";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";
import LoginRequiredView from "./views/LoginRequiredView.js";
import NFTEditView from "./views/NFTEditView.js";
import NFTView from "./views/NFTView.js";
SPAInitializer.init();
if (location.pathname.includes("/my-kaia-nfts")) {
    Router.prefix = "/my-kaia-nfts";
}
await MDDModuleConfig.init({ appName: "My Kaia NFTs" });
Router
    .add("/*", Layout, "/login-required")
    .add("/", HomeView)
    .add("/:collection/:id", NFTView)
    .add("/:collection/:id/edit", NFTEditView)
    .add("/login-required", LoginRequiredView);
KaiaWalletLoginManager.on("loginStatusChanged", (loggedIn) => {
    Router.go(loggedIn ? "/" : "/login-required");
});
//# sourceMappingURL=main.js.map