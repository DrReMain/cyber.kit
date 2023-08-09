import { dirname } from "node:path";
import { pathExistsSync, outputFile } from "fs-extra";
import { consola } from "consola";

import type { IServerConfig } from "./type";
import initTemplate from "./template";
import Generator from "./Generator";

export default class Cmd {
  private readonly cwd: string;
  private readonly exist: boolean;
  private readonly config?: IServerConfig;
  private readonly generator?: Generator;

  constructor(private readonly configPath: string) {
    this.cwd = dirname(configPath);
    this.exist = pathExistsSync(configPath);

    if (this.exist) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
      this.config = require(configPath).default as IServerConfig;
      this.generator = new Generator(this.config, { cwd: this.cwd });
    }
  }

  public async init() {
    if (this.exist) {
      consola.info(`配置文件已存在: ${this.configPath}`);
      const answer = await consola.prompt("是否覆盖配置文件？", {
        type: "confirm",
      });
      if (!answer) return;
    }

    await outputFile(this.configPath, initTemplate);
    consola.success("配置文件写入成功");
  }

  public async sync() {
    if (!this.exist) return consola.error(`配置文件不存在: ${this.configPath}`);
    if (!this.config || !this.generator)
      return consola.error("为成功注入配置文件，终止生成代码");

    consola.info(`使用配置文件: ${this.configPath}`);
    const spinner = (await import("ora")).default(`\r`);

    try {
      spinner.start();

      // 准备开始生成代码
      spinner.text = `正在拉取数据...  \r`;
      await this.generator.prepare();
      consola.success("拉取数据完毕 💯");

      // 生成完毕
      spinner.text = `正在生成代码...  \r`;
      await this.generator.generate();
      consola.success("生成代码完毕 💥");

      // 写入文件
      spinner.text = `正在写入文件...  \r`;
      await this.generator.write();
      consola.success("写入文件完毕 🥳");
    } catch (e) {
      consola.error(e);
    } finally {
      spinner.stop();
    }
  }
}
