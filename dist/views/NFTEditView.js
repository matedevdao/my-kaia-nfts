import { el, Router, View } from "@commonmodule/app";
import { AppCompConfig, Button, ConfirmDialog, } from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { getNFTEditForm, } from "matedevdao-common";
import Layout from "./Layout.js";
export default class NFTEditView extends View {
    currentData;
    form;
    changeData(data) {
        this.currentData = data;
        if (!KaiaWalletLoginManager.isLoggedIn()) {
            Router.goWithoutHistory("/login-required");
        }
        else {
            Layout.setContent(this.container = el(".nft-edit-view"));
            "name" in data
                ? this.renderNFTEditForm(data)
                : this.fetchNFTData(data.collection, parseInt(data.id));
        }
    }
    async renderNFTEditForm(nftData) {
        this.form = getNFTEditForm(nftData);
        this.container.append(this.form, new Button({
            title: "저장하기",
            onClick: async () => {
                await new ConfirmDialog({
                    title: "저장하기",
                    message: "변경사항을 저장하시겠습니까?",
                    onConfirm: () => this.saveChanges(),
                }).waitForConfirmation();
            },
        }));
    }
    async fetchNFTData(collection, id) {
        const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this.container);
        const response = await fetch(`https://api.matedevdao.workers.dev/nft/${collection}/${id}`);
        const data = await response.json();
        this.renderNFTEditForm(data);
        loadingSpinner.remove();
    }
    async saveChanges() {
        if (this.form) {
            const data = this.form.getData();
            try {
                await fetch("https://api.matedevdao.workers.dev/save-metadata", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${KaiaWalletLoginManager.token}`,
                    },
                    body: JSON.stringify({
                        collection: this.currentData?.collection,
                        id: this.currentData?.id,
                        traits: data.traits,
                        parts: data.parts,
                    }),
                });
            }
            catch (error) {
                console.error("Error saving changes:", error);
                new ConfirmDialog({
                    title: "Error",
                    message: "Failed to save changes. Would you like to try again?",
                    confirmButtonTitle: "Retry",
                    onConfirm: () => this.saveChanges(),
                });
                return;
            }
        }
    }
}
//# sourceMappingURL=NFTEditView.js.map