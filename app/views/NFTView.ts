import { el, Router, View } from "@commonmodule/app";
import { AppCompConfig, Button } from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import {
  MDDModuleConfig,
  NFTDataWithMeta,
  NFTDisplay,
} from "matedevdao-common";
import Layout from "./Layout.js";

export default class NFTView extends View {
  public changeData(
    data: { collection: string; id: string } | NFTDataWithMeta,
  ): void {
    if (!KaiaWalletLoginManager.isLoggedIn()) {
      Router.goWithoutHistory("/login-required");
    } else {
      Layout.setContent(this.container = el(".nft-view"));
      "name" in data
        ? this.renderNFTDisplay(data)
        : this.fetchNFTData(data.collection, parseInt(data.id));
    }
  }

  private async renderNFTDisplay(nftData: NFTDataWithMeta) {
    this.container.append(
      el(
        "header",
        nftData.holder === KaiaWalletLoginManager.getLoggedInAddress() &&
          MDDModuleConfig.isEditableNFTCollection(nftData.collection)
          ? new Button({
            title: "Edit",
            onClick: () =>
              Router.go(`/${nftData.collection}/${nftData.id}/edit`, nftData),
          })
          : undefined,
      ),
      new NFTDisplay(nftData),
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
    this.renderNFTDisplay(data);
    loadingSpinner.remove();
  }
}
