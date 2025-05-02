import { el, Router, View } from "@commonmodule/app";
import { AppCompConfig } from "@commonmodule/app-components";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { NFTDisplay } from "matedevdao-common";
import Layout from "./Layout.js";
export default class NFTView extends View {
    changeData(data) {
        if (!KaiaWalletSessionManager.isConnected()) {
            Router.goWithoutHistory("/loign-required");
        }
        else {
            Layout.setContent(this.container = el(".nft-view"));
            "name" in data
                ? this.renderNFTDisplay(data)
                : this.fetchNFTData(data.collection, parseInt(data.id));
        }
    }
    async renderNFTDisplay(nftData) {
        this.container.append(new NFTDisplay(nftData));
    }
    async fetchNFTData(collection, id) {
        const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this.container);
        const response = await fetch(`https://api.matedevdao.workers.dev/nft/${collection}/${id}`);
        const data = await response.json();
        this.renderNFTDisplay(data);
        loadingSpinner.remove();
    }
}
//# sourceMappingURL=NFTView.js.map