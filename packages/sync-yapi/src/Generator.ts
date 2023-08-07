import type {
  IPrivateProjects,
  IServerConfig,
  IYApiBase,
  IYApiExportInterface,
  IYApiProjectInfo,
  IYApiCategoryMenu,
} from "./type";

export default class Generator {
  private readonly _projects: IPrivateProjects = {};

  constructor(
    private readonly _config: IServerConfig,
    private readonly _options: { cwd: string }
  ) {}

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

  public async generate(): Promise<string> {
    console.log(this._projects);
    return "TODO";
  }

  public async write(_: string) {
    //
  }
}
