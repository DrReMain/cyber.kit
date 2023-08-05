import { dirname } from "node:path";
import { pathExistsSync, outputFile } from "fs-extra";
import consola from "consola";
import prompt from "prompts";

const initTemplate = `console.log('config');
    `;

export default class Sync {
  private readonly cwd: string;
  private readonly exist: boolean;

  constructor(private readonly configPath: string) {
    this.cwd = dirname(configPath);
    this.exist = pathExistsSync(configPath);
  }

  public async init() {
    if (this.exist) {
      consola.info(`配置文件已存在: ${this.configPath}`);
      const answer = await prompt({
        message: "是否覆盖配置文件？",
        type: "confirm",
        name: "override",
      });

      if (!answer.override) return;
    }

    await outputFile(this.configPath, initTemplate);
    consola.success("配置文件写入成功");
  }

  public sync() {
    console.log(this.configPath);
    console.log(this.cwd);
    console.log(this.exist);
  }
}
