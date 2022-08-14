export interface loginFormInt {
  username: string;
  password: string;
}
export class initData {
  loginForm: loginFormInt = {
    username: "admin",
    password: "123456",
  };
}
