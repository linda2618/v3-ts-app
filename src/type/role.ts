export interface ListInt {
  roleName: string;
  roleId: number;
  authority: number[];
}

interface SelectDataInt {
  roleName: string;
  roleId: number;
}

export class InitDta {
  selectData: SelectDataInt = {
    roleName: "",
    roleId: 0,
  };
  list: ListInt[] = [];
  // listData: [ListInt][] = [];
  isAdd: boolean = false;
}
