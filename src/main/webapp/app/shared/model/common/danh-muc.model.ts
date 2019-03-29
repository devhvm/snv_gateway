import { Moment } from 'moment';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IDanhMuc {
  id?: number;
  danhMucCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
}

export const defaultValue: Readonly<IDanhMuc> = {};
