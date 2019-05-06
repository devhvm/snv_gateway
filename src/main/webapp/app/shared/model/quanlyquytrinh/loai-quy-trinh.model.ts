import { IQuyTrinh } from 'app/shared/model/quanlyquytrinh/quy-trinh.model';

export interface ILoaiQuyTrinh {
  id?: number;
  loaiQuyTrinhCode?: string;
  methodName?: string;
  entityName?: string;
  serviceName?: string;
  quyTrinhs?: IQuyTrinh[];
}

export const defaultValue: Readonly<ILoaiQuyTrinh> = {};
