import { IMauPhatHanhTieuChi } from 'app/shared/model/donviphathanh/mau-phat-hanh-tieu-chi.model';

export const enum ReportStatus {
  NEW = 'NEW',
  ACTIVED = 'ACTIVED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  SIGNED = 'SIGNED',
  COMPLETED = 'COMPLETED'
}

export interface IMauPhatHanh {
  id?: number;
  mauPhatHanhCode?: string;
  name?: string;
  status?: ReportStatus;
  phamviId?: number;
  mauphathanhtieuchis?: IMauPhatHanhTieuChi[];
}

export const defaultValue: Readonly<IMauPhatHanh> = {};
