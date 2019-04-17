import { IAcessDeny } from 'app/shared/model/phanquyenchucnang/acess-deny.model';
import { IMenuRole } from 'app/shared/model/phanquyenchucnang/menu-role.model';

export interface IMenuItem {
  id?: number;
  menuItemCode?: string;
  name?: string;
  icon?: string;
  acessdenies?: IAcessDeny[];
  menuroles?: IMenuRole[];
  screenScreenCode?: string;
  screenId?: number;
  menuMenuCode?: string;
  menuId?: number;
}

export const defaultValue: Readonly<IMenuItem> = {};
