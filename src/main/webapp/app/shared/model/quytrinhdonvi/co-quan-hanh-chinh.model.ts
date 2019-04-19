import { IQuyTrinhDonVi } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';

export interface ICoQuanHanhChinh {
  id?: number;
  coQuanHanhChinhCode?: string;
  name?: string;
  description?: string;
  maDinhDanhCode?: string;
  level?: string;
  status?: string;
  quyTrinhDonVis?: IQuyTrinhDonVi[];
}

export const defaultValue: Readonly<ICoQuanHanhChinh> = {};
