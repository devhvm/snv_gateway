import { Moment } from 'moment';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IChiTieu {
  id?: number;
  chiTieuCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  nhomchitieuId?: number;
}

export const defaultValue: Readonly<IChiTieu> = {};
