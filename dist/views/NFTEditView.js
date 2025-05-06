import { el, Router, View } from "@commonmodule/app";
import { AppCompConfig } from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { getNFTEditForm } from "matedevdao-common";
import Layout from "./Layout.js";
export default class NFTEditView extends View {
    changeData(data) {
        if (!KaiaWalletLoginManager.isLoggedIn()) {
            Router.goWithoutHistory("/loign-required");
        }
        else {
            Layout.setContent(this.container = el(".nft-edit-view"));
            "name" in data
                ? this.renderNFTEditForm(data)
                : this.fetchNFTData(data.collection, parseInt(data.id));
        }
    }
    async renderNFTEditForm(nftData) {
        const form = getNFTEditForm(nftData);
        this.container.append(form);
    }
    async fetchNFTData(collection, id) {
        const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this.container);
        const response = await fetch(`https://api.matedevdao.workers.dev/nft/${collection}/${id}`);
        const data = await response.json();
        this.renderNFTEditForm(data);
        loadingSpinner.remove();
    }
}
//# sourceMappingURL=NFTEditView.js.map