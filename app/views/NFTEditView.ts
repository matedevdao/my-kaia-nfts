import { el, Router, View } from "@commonmodule/app";
import {
  AppCompConfig,
  Button,
  ConfirmDialog,
} from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { getNFTEditForm } from "matedevdao-common";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
import Layout from "./Layout.js";

export default class NFTEditView extends View {
  public changeData(data: { collection: string; id: string } | NFTData): void {
    if (!KaiaWalletLoginManager.isLoggedIn()) {
      Router.goWithoutHistory("/loign-required");
    } else {
      Layout.setContent(this.container = el(".nft-edit-view"));
      "name" in data
        ? this.renderNFTEditForm(data as NFTData)
        : this.fetchNFTData(
          (data as any).collection,
          parseInt((data as any).id),
        );
    }
  }

  private async renderNFTEditForm(nftData: NFTData) {
    const form = getNFTEditForm(nftData);
    this.container.append(
      form,
      new Button({
        title: "저장하기",
        onClick: async () => {
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
    //TODO: Implement saveChanges logic
  }
}
