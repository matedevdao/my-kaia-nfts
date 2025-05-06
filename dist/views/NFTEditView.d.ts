import { View } from "@commonmodule/app";
import NFTData from "matedevdao-common/lib/nft/NFTData.js";
export default class NFTEditView extends View {
    changeData(data: {
        collection: string;
        id: string;
    } | NFTData): void;
    private renderNFTEditForm;
    private fetchNFTData;
    saveChanges(): Promise<void>;
}
//# sourceMappingURL=NFTEditView.d.ts.map