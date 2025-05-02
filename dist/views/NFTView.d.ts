import { View } from "@commonmodule/app";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
export default class NFTView extends View {
    changeData(data: {
        collection: string;
        id: string;
    } | NFTData): void;
    private renderNFTDisplay;
    private fetchNFTData;
}
//# sourceMappingURL=NFTView.d.ts.map