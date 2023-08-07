#!/usr/bin/env node
import { resolve } from "node:path";
import { register } from "ts-node";

import yargs from "yargs/yargs";

import packageJson from "../package.json";

import Cmd from "./Cmd";

register({
  skipProject: true,
  transpileOnly: true,
  compilerOptions: {
    lib: ["es2017"],
    target: "es2017",
    module: "commonjs",
    moduleResolution: "node",
    allowJs: true,
    declaration: false,
    removeComments: false,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    importHelpers: false,
    strict: false,
  },
});

const cmd = {
  sync: "generate sync with target",
  init: "init the config file",
};

if (require.main === module) {
  const { argv } = yargs(process.argv.slice(2))
    .scriptName("csync-yapi")
    .usage("Usage: $0 <cmd> [options]")
    .command("sync", cmd.sync)
    .command("init", cmd.init)
    .options({
      config: {
        alias: "c",
        description: "provide a path to config file",
        string: true,
        demandOption: true,
      },
    })
    .version("version", "display version information", packageJson.version)
    .alias("version", "v");

  const _argv = argv as Awaited<ReturnType<typeof yargs>["argv"]>;

  const _cmd = _argv._[0] as "init" | "sync" | undefined;

  const instance = new Cmd(resolve(process.cwd(), _argv.config as string));

  void instance[_cmd ?? "sync"]();
}
