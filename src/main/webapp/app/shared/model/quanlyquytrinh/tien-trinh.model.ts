import { ITienTrinhXuLy } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';

export interface ITienTrinh {
  id?: number;
  tienTrinhCode?: string;
  name?: string;
  screenCode?: string;
  status?: string;
  tienTrinhXuLies?: ITienTrinhXuLy[];
  quyTrinhName?: string;
  quyTrinhId?: number;
}

export const defaultValue: Readonly<ITienTrinh> = {};
