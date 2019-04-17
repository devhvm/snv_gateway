export interface IMenuRole {
  id?: number;
  menuItemRoleCode?: string;
  role?: string;
  name?: string;
  menuItemMenuItemCode?: string;
  menuItemId?: number;
}

export const defaultValue: Readonly<IMenuRole> = {};
