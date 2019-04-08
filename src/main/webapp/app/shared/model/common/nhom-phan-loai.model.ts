import { IDoiTuong } from 'app/shared/model/common/doi-tuong.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INhomPhanLoai {
  id?: number;
  nhomPhanLoaiCode?: string;
  name?: string;
  status?: Status;
  doituongs?: IDoiTuong[];
  donvitinhDonViTinhCode?: string;
  donvitinhId?: number;
}

export const defaultValue: Readonly<INhomPhanLoai> = {};
