import { Moment } from 'moment';
import { INoiDung } from 'app/shared/model/common/noi-dung.model';

export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INhomNoiDung {
  id?: number;
  nhomNoiDungCode?: string;
  name?: string;
  userName?: string;
  createTime?: Moment;
  updateTime?: Moment;
  status?: Status;
  program?: string;
  noiDungs?: INoiDung[];
}

export const defaultValue: Readonly<INhomNoiDung> = {};
