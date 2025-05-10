import { View } from "@commonmodule/app";
import { NFTDataWithMeta } from "matedevdao-common";
export default class NFTView extends View {
    changeData(data: {
        collection: string;
        id: string;
    } | NFTDataWithMeta): void;
    private renderNFTDisplay;
    private fetchNFTData;
}
//# sourceMappingURL=NFTView.d.ts.map