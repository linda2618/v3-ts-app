export interface QueryInt {
  id: number;
  authority: string;
}
interface listInt {
  name: string;
  roleId: number;
  viewRole?: string;
  roleList?: listInt[];
}

export class InitData {
  id: number;
  authorityIds: number[];
  list: listInt[] = [];
  treeRef: any;
  constructor(id: number, authority: string) {
    (this.id = id), (this.authorityIds = authority.split(",").map((v) => +v));
  }
}
