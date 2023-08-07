export default `import { defineConfig } from "@cyberdancer/sync-yapi";

export default defineConfig({
  server: "http://yapi.example.com/",
  output: "src/services/params.d.ts",
  dataKey: "data",
  projects: [
    {
      uniqName: "admin", // 项目唯一名称，必须唯一
      token: "this_is_YAPI_project_token",
      defineReqDataTypeName(interfaceInfo, changeCase) {
        return "Req";
      },
      defineResDataTypeName(interfaceInfo, changeCase) {
        return "Res";
      },
    },
  ],
});

`;
