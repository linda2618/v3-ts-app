export interface QueryInt {
  id: number;
  authority: string;
}

export class InitData {
  id: number;
  authorityIds: number[];
  constructor(id: number, authority: string) {
    (this.id = id), (this.authorityIds = authority.split(",").map((v) => +v));
  }
}
