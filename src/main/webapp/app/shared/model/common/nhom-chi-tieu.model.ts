import { IChiTieu } from 'app/shared/model/common/chi-tieu.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INhomChiTieu {
  id?: number;
  nhomChiTieuCode?: string;
  name?: string;
  status?: Status;
  chitieus?: IChiTieu[];
}

export const defaultValue: Readonly<INhomChiTieu> = {};
