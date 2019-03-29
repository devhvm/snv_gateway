import { Moment } from 'moment';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface IPhamVi {
  id?: number;
  begin?: string;
  end?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  donviId?: number;
}

export const defaultValue: Readonly<IPhamVi> = {};
