import { Moment } from 'moment';
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
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  chitieus?: IChiTieu[];
}

export const defaultValue: Readonly<INhomChiTieu> = {};
