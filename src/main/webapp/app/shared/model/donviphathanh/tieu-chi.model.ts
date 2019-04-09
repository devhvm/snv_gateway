import { ITieuChiBaoCao } from 'app/shared/model/donviphathanh/tieu-chi-bao-cao.model';
import { IMauPhatHanhTieuChi } from 'app/shared/model/donviphathanh/mau-phat-hanh-tieu-chi.model';

export const enum ReportStatus {
  NEW = 'NEW',
  ACTIVED = 'ACTIVED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  SIGNED = 'SIGNED',
  COMPLETED = 'COMPLETED'
}

export interface ITieuChi {
  id?: number;
  chiTieuCode?: string;
  name?: string;
  status?: ReportStatus;
  tieuchibaocaos?: ITieuChiBaoCao[];
  mauphathanhtieuchis?: IMauPhatHanhTieuChi[];
  kycongboKyCongBoCode?: string;
  kycongboId?: number;
}

export const defaultValue: Readonly<ITieuChi> = {};
