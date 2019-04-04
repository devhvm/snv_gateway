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
  status?: ReportStatus;
  tieuchiId?: number;
}

export const defaultValue: Readonly<ITieuChiBaoCao> = {};
