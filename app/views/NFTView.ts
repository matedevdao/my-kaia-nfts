import { el, Router, View } from "@commonmodule/app";
import {
  AppCompConfig,
  Button,
  PromptDialog,
} from "@commonmodule/app-components";
import { KaiaWalletLoginManager } from "kaia-wallet-login-module";
import {
  MDDModuleConfig,
  NFTDataWithMeta,
  NFTDisplay,
} from "matedevdao-common";
import Layout from "./Layout.js";

const collectionAddresses: Record<string, `0x${string}`> = {
  "dogesoundclub-mates": "0xE47E90C58F8336A2f24Bcd9bCB530e2e02E1E8ae",
  "dogesoundclub-e-mates": "0x2B303fd0082E4B51e5A6C602F45545204bbbB4DC",
  "dogesoundclub-biased-mates": "0xDeDd727ab86bce5D416F9163B2448860BbDE86d4",
  "sigor-sparrows": "0x7340a44AbD05280591377345d21792Cdc916A388",
  "sigor-housedeeds": "0x455Ee7dD1fc5722A7882aD6B7B8c075655B8005B",
  "kingcrowndao-kongz": "0xF967431fb8F5B4767567854dE5448D2EdC21a482",
  "kingcrowndao-pixel-kongz": "0x81b5C41Bac33ea696D9684D9aFdB6cd9f6Ee5CFF",
  "babyping": "0x595b299Db9d83279d20aC37A85D36489987d7660",
};

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
        nftData.holder === KaiaWalletLoginManager.getLoggedInAddress()
          ? new Button({
            title: "전송하기",
            onPress: async () => {
              await new PromptDialog({
                title: "전송하기",
                message: "전송할 주소를 입력하세요",
                placeholder: "0x...",
                confirmButtonTitle: "전송하기",
                cancelButtonTitle: "취소",
                onConfirm: async (address) => {
                  await KaiaWalletLoginManager.writeContract({
                    address: collectionAddresses[nftData.collection],
                    chainId: 8_217,
                    functionName: "transferFrom",
                    args: [
                      KaiaWalletLoginManager.getLoggedInAddress(),
                      address,
                      nftData.id,
                    ],
                    abi: [
                      {
                        name: "transferFrom",
                        type: "function",
                        inputs: [
                          { name: "from", type: "address" },
                          { name: "to", type: "address" },
                          { name: "tokenId", type: "uint256" },
                        ],
                      },
                    ],
                  });
                },
              }).waitForConfirmation();
            },
          })
          : undefined,
        nftData.holder === KaiaWalletLoginManager.getLoggedInAddress() &&
          MDDModuleConfig.isEditableNFTCollection(nftData.collection)
          ? new Button({
            title: "정보 수정",
            onPress: () =>
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
