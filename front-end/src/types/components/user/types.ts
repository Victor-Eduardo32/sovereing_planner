export type User = {
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  created_at: string,
  update_at: string
}

export type LoginForm = {
  email: string,
  password: string,
}

export type RegisterForm = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}
