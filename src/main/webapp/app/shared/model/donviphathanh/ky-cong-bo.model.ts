import { ITieuChi } from 'app/shared/model/donviphathanh/tieu-chi.model';

export const enum ReportStatus {
  NEW = 'NEW',
  ACTIVED = 'ACTIVED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  SIGNED = 'SIGNED',
  COMPLETED = 'COMPLETED'
}

export interface IKyCongBo {
  id?: number;
  kyCongBoCode?: string;
  name?: string;
  status?: ReportStatus;
  tieuchis?: ITieuChi[];
}

export const defaultValue: Readonly<IKyCongBo> = {};
