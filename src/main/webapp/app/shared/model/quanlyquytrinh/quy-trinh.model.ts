import { ITienTrinh } from 'app/shared/model/quanlyquytrinh/tien-trinh.model';

export interface IQuyTrinh {
  id?: number;
  quyTrinhCode?: string;
  name?: string;
  tienTrinhs?: ITienTrinh[];
}

export const defaultValue: Readonly<IQuyTrinh> = {};
