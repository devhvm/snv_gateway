import { ITienTrinhXuLy } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';

export interface ITienTrinh {
  id?: number;
  menuItemCode?: string;
  name?: string;
  icon?: string;
  tienTrinhXuLies?: ITienTrinhXuLy[];
  quyTrinhName?: string;
  quyTrinhId?: number;
}

export const defaultValue: Readonly<ITienTrinh> = {};
