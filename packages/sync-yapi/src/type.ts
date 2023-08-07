export interface ISharedConfig {
  dataKey: string;
  defineReqDataTypeName?(interfaceInfo: unknown, changeCase: unknown): string;
  defineResDataTypeName?(interfaceInfo: unknown, changeCase: unknown): string;
}
export interface IProjectConfig extends Partial<ISharedConfig> {
  uniqName: string;
  token: string;
}
export interface IServerConfig extends ISharedConfig {
  server: string;
  output: string;
  projects: IProjectConfig[];
}
export type TSyntheticallyConfig = Partial<IServerConfig & IProjectConfig>;

export interface IYApiBase<T> {
  errcode: number;
  errmsg: string;
  data: T;
}
export interface IYApiProjectInfo {
  _id: number;
  name: string;
  basepath: string;
  _url: string;
}
export interface IYApiCategoryMenu {
  _id: number;
  name: string;
  project_id: number;
}
export interface IYApiExportInterface {
  _id: number;
  title: string;
  mehtod: string;
  path: string;
  project_id: number;
}

export interface IPrivateProjects {
  [name: string]: {
    origin: TSyntheticallyConfig;
    info?: IYApiProjectInfo;
    categories?: IYApiCategoryMenu[];
    interfaces?: IYApiExportInterface[];
  };
}
