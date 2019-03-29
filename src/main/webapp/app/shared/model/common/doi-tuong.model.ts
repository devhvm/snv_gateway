import { Moment } from 'moment';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDoiTuong {
  id?: number;
  doiTuongCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  nhomphanloaiId?: number;
}

export const defaultValue: Readonly<IDoiTuong> = {};
