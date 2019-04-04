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
  status?: Status;
  noidungs?: INoiDung[];
}

export const defaultValue: Readonly<INhomNoiDung> = {};
