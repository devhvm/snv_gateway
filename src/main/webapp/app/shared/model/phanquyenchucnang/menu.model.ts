import { IMenuItem } from 'app/shared/model/phanquyenchucnang/menu-item.model';

export interface IMenu {
  id?: number;
  menuCode?: string;
  name?: string;
  icon?: string;
  menuItems?: IMenuItem[];
}

export const defaultValue: Readonly<IMenu> = {};
