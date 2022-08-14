interface roleInt {
  role: number;
  roleName: string;
}
export interface ListInt {
  id: number;
  nickName: string;
  userName: string;
  role: roleInt[];
}

interface SelectDataInt {
  nickName: string;
  role: number;
}
interface RoleListInt {
  roleName: string;
  roleId: number;
  suthorty: number[];
}

export class InitDta {
  selectData: SelectDataInt = {
    nickName: "",
    role: 0,
  };
  list: [ListInt][] = [];
  roleList: RoleListInt[] = [];
}
