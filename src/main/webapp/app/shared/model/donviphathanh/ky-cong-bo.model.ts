import { Moment } from 'moment';
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
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: ReportStatus;
  program?: string;
  tieuchis?: ITieuChi[];
}

export const defaultValue: Readonly<IKyCongBo> = {};
