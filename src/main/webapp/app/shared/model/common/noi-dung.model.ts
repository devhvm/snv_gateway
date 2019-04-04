export const enum Status {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  DELETED = 'DELETED'
}

export interface INoiDung {
  id?: number;
  noiDungCode?: string;
  status?: Status;
  nhomnoidungId?: number;
}

export const defaultValue: Readonly<INoiDung> = {};
