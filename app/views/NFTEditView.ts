import { el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { getNFTEditForm } from "matedevdao-common";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
import Layout from "./Layout.js";

export default class NFTEditView extends View {
  public changeData(data: { collection: string; id: string } | NFTData): void {
    if (!KaiaWalletSessionManager.isConnected()) {
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
    this.container.append(form);
  }

  private async fetchNFTData(collection: string, id: number) {
    console.log("Fetching NFT data...", collection, id);
    //TODO:
  }
}
