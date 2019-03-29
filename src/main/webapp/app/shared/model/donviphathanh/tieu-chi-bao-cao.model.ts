import { Moment } from 'moment';

export const enum ReportStatus {
  NEW = 'NEW',
  ACTIVED = 'ACTIVED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  SIGNED = 'SIGNED',
  COMPLETED = 'COMPLETED'
}

export interface ITieuChiBaoCao {
  id?: number;
  tieuChiBaoCaoCode?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: ReportStatus;
  program?: string;
  tieuchiId?: number;
}

export const defaultValue: Readonly<ITieuChiBaoCao> = {};
