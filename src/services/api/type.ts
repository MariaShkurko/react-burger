export type TCreateOrderRequest = {
  ingredients: string[];
};
export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};
export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type TTokenRequest = {
  token: string;
};
export type TTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutRequest = {
  token: string;
};
export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TResetPasswordRequest = {
  email: string;
};
export type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type TSetPasswordRequest = {
  password: string;
  token: string;
};
export type TSetPasswordResponse = {
  success: boolean;
  message: string;
};

export type TUserUpdateRequest = {
  email: string;
  password: string;
  name: string;
};

export type TUserInfo = {
  email: string;
  name: string;
};
