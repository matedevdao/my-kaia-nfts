import { el, Router, View } from "@commonmodule/app";
import {
  AppCompConfig,
  Button,
  ConfirmDialog,
} from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import {
  getNFTEditForm,
  NFTDataWithMeta,
  NFTEditForm,
} from "matedevdao-common";
import Layout from "./Layout.js";

export default class NFTEditView extends View {
  private currentData?: { collection: string; id: string };
  private form?: NFTEditForm;

  public changeData(
    data: { collection: string; id: string } | NFTDataWithMeta,
  ): void {
    this.currentData = data as { collection: string; id: string };

    if (!KaiaWalletLoginManager.isLoggedIn()) {
      Router.goWithoutHistory("/login-required");
    } else {
      Layout.setContent(this.container = el(".nft-edit-view"));
      "name" in data
        ? this.renderNFTEditForm(data as NFTDataWithMeta)
        : this.fetchNFTData(
          (data as any).collection,
          parseInt((data as any).id),
        );
    }
  }

  private async renderNFTEditForm(nftData: NFTDataWithMeta) {
    this.form = getNFTEditForm(nftData);
    this.container.append(
      this.form,
      new Button({
        title: "저장하기",
        onPress: async () => {
          await new ConfirmDialog({
            title: "저장하기",
            message: "변경사항을 저장하시겠습니까?",
            onConfirm: () => this.saveChanges(),
          }).waitForConfirmation();
        },
      }),
    );
  }

  private async fetchNFTData(collection: string, id: number) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.container,
    );
    const response = await fetch(
      `https://api.matedevdao.workers.dev/nft/${collection}/${id}`,
    );
    const data = await response.json();
    this.renderNFTEditForm(data);
    loadingSpinner.remove();
  }

  public async saveChanges() {
    if (this.form) {
      const data = this.form.getData();

      try {
        await fetch(
          "https://api.matedevdao.workers.dev/save-metadata",
          {
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
          },
        );
      } catch (error) {
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
