import { el, Router, View } from "@commonmodule/app";
import { KaiaWalletSessionManager } from "kaia-wallet-module";
import { NFTDisplay } from "matedevdao-common";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
import Layout from "./Layout.js";

export default class NFTView extends View {
  public changeData(data: { collection: string; id: string } | NFTData): void {
    if (!KaiaWalletSessionManager.isConnected()) {
      Router.goWithoutHistory("/connect-required");
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
    console.log("Fetching NFT data...", collection, id);
    //TODO:
  }
}
