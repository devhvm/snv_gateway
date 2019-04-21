import { IMenuItem } from 'app/shared/model/phanquyenchucnang/menu-item.model';

export interface IScreen {
  id?: number;
  screenCode?: string;
  name?: string;
  menus?: IMenuItem[];
}

export const defaultValue: Readonly<IScreen> = {};
