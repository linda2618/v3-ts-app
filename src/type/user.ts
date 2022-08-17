interface roleInt {
  role: number;
  roleName: string;
}
export interface ListInt {
  id: number;
  nikeName: string;
  userName: string;
  role: roleInt[];
}

export interface ActiveInt {
  id: number;
  nikeName: string;
  userName: string;
  role: number[];
}

interface SelectDataInt {
  nikeName: string;
  role: number;
}
interface RoleListInt {
  roleName: string;
  roleId: number;
  suthorty: number[];
}

export class InitDta {
  selectData: SelectDataInt = {
    nikeName: "",
    role: 0,
  };
  list: [ListInt][] = [];

  listData: [ListInt][] = [];
  roleList: RoleListInt[] = [];
  active: ActiveInt = {
    id: 0,
    nikeName: "",
    userName: "",
    role: [],
  };
  isShow: boolean = false;
}
