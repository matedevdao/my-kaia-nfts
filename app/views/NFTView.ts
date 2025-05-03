import { el, Router, View } from "@commonmodule/app";
import { AppCompConfig } from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import { NFTDisplay } from "matedevdao-common";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
import Layout from "./Layout.js";

export default class NFTView extends View {
  public changeData(data: { collection: string; id: string } | NFTData): void {
    if (!KaiaWalletLoginManager.isLoggedIn()) {
      Router.goWithoutHistory("/loign-required");
    } else {
      Layout.setContent(this.container = el(".nft-view"));
      "name" in data
        ? this.renderNFTDisplay(data as NFTData)
        : this.fetchNFTData(
          (data as any).collection,
          parseInt((data as any).id),
        );
    }
  }

  private async renderNFTDisplay(nftData: NFTData) {
    this.container.append(new NFTDisplay(nftData));
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
