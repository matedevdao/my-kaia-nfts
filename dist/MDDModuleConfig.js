import { KaiaWalletModuleConfig } from "kaia-wallet-module";
class MDDModuleConfig {
    init(options) {
        KaiaWalletModuleConfig.init({
            ...options,
            walletConnectProjectId: "647df3b69553d6f1261ea1482bd90d4a",
        });
    }
}
export default new MDDModuleConfig();
//# sourceMappingURL=MDDModuleConfig.js.map