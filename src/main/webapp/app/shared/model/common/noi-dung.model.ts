import { Moment } from 'moment';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INoiDung {
  id?: number;
  noiDungCode?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  nhomnoidungId?: number;
}

export const defaultValue: Readonly<INoiDung> = {};
