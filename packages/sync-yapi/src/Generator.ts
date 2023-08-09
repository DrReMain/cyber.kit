import { resolve } from "node:path";
import { Project, type SourceFile } from "ts-morph";

import type {
  IPrivateProjects,
  IServerConfig,
  IYApiBase,
  IYApiExportInterface,
  IYApiProjectInfo,
  IYApiCategoryMenu,
} from "./type";

export default class Generator {
  private readonly sourceFile: SourceFile;

  private readonly _projects: IPrivateProjects = {};

  constructor(
    private readonly _config: IServerConfig,
    private readonly _options: { cwd: string }
  ) {
    const project = new Project();
    this.sourceFile = project.createSourceFile(
      resolve(_options.cwd, _config.output),
      "",
      {
        overwrite: true,
      }
    );
  }

  public async prepare() {
    try {
      this._config.server = this._config.server.replace(/\/+$/, "");
      this._config.projects.forEach((projectConf, projectIdx) => {
        const { projects: __, ...rest } = this._config;
        this._projects[projectConf.uniqName] = {
          origin: { ...rest, ...projectConf },
        };
      });

      await Promise.all(
        Object.entries(this._projects).map(async ([projectKey, { origin }]) => {
          // 获取项目基本信息
          const {
            data: { _id, name, basepath },
          } = (await (
            await fetch(
              `${origin.server}/api/project/get?token=${origin.token}`
            )
          ).json()) as IYApiBase<IYApiProjectInfo>;
          this._projects[projectKey].info = {
            _id,
            name,
            basepath,
            _url: `${origin.server}/project/${_id}/interface/api`,
          };

          // 获取项目分类列表
          const { data } = (await (
            await fetch(
              `${origin.server}/api/interface/getCatMenu?token=${origin.token}&project_id=${_id}`
            )
          ).json()) as IYApiBase<IYApiCategoryMenu[]>;
          this._projects[projectKey].categories = data.map((_) => ({
            _id: _._id,
            name: _.name,
            project_id: _.project_id,
          }));

          // 获取项目导出的JSON接口数据
          const resExportJSON = await fetch(
            `${origin.server}/api/plugin/export?type=json&status=all&isWiki=false&token=${origin.token}`
          );
          const dataJSON = (await resExportJSON.json()) as Array<{
            index: number;
            name: string;
            desc: string;
            list: IYApiExportInterface[];
          }>;
          this._projects[projectKey].interfaces = dataJSON.reduce<
            IYApiExportInterface[]
          >((list, next) => list.concat(...next.list), []);
        })
      );
    } catch (e) {
      throw new Error("拉取 YApi 数据失败，请检查配置文件的 server 字段");
    }
  }

  public async generate() {
    Object.values(this._projects).forEach(({ interfaces }) => {
      interfaces?.forEach((_) => {
        const requestInterface = this.sourceFile.addInterface({
          name: `Req${_.path.replace(/[^0-9A-z]/g, "")}`,
          isExported: true,
        });
        requestInterface.addProperty({
          name: "name",
          type: "string",
        });

        const responseInterface = this.sourceFile.addInterface({
          name: `Res${_.path.replace(/[^0-9A-z]/g, "")}`,
          isExported: true,
        });
        responseInterface.addProperty({
          name: "result",
          type: "{ name: string; data: { id: string; skills: string[] } }",
        });
      });
    });
  }

  public async write() {
    this.sourceFile.formatText();
    this.sourceFile.saveSync();
  }
}
