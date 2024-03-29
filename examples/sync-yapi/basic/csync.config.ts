import { defineConfig } from "@cyberdancer/sync-yapi";

export default defineConfig({
  server: "http://yapi.cyber-dancer.tech/",
  output: "src/services/params.d.ts",
  dataKey: "result",
  projects: [
    {
      uniqName: "cyber-h5",
      token: "08d67d712c84ea538556a6f4644b4d29fe99b70f150c761819a7f0175eb93d2c",
      defineReqDataTypeName(interfaceInfo, changeCase) {
        return "Req";
      },
      defineResDataTypeName(interfaceInfo, changeCase) {
        return "Res";
      },
    },
  ],
});
