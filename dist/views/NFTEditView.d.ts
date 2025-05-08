import { View } from "@commonmodule/app";
import { NFTDataWithMeta } from "matedevdao-common";
export default class NFTEditView extends View {
    private currentData?;
    private form?;
    changeData(data: {
        collection: string;
        id: string;
    } | NFTDataWithMeta): void;
    private renderNFTEditForm;
    private fetchNFTData;
    saveChanges(): Promise<void>;
}
//# sourceMappingURL=NFTEditView.d.ts.map