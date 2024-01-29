export type IOpeningTimes = {
  mon: IOpeningDay;
  tue: IOpeningDay;
  wed: IOpeningDay;
  thu: IOpeningDay;
  fri: IOpeningDay;
  sat: IOpeningDay;
  sun: IOpeningDay;
};

export interface IOpeningDay {
  is_open: boolean;
  open: string;
  close: string;
}
