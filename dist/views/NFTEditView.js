import { el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { getNFTEditForm } from "matedevdao-common";
import Layout from "./Layout.js";
export default class NFTEditView extends View {
    changeData(data) {
        if (!KaiaWalletSessionManager.isConnected()) {
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
        console.log("Fetching NFT data...", collection, id);
    }
}
//# sourceMappingURL=NFTEditView.js.map