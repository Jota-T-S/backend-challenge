export interface AppConfig {
  PORT: string | number;
}
export interface DbConfig {
  URI?: string;
}
export interface CloudinaryConfig {
  cloud_name?: string;
  api_key?: string;
  api_secret?: string;
}

export interface JwtConfig {
  private_key?: string | Buffer | undefined | null | any;
}

export interface ConfigOptions {
  app: AppConfig;
  db: DbConfig;
  cloudinary: CloudinaryConfig;
  jwt: JwtConfig;
}

export interface Config {
  [key: string]: ConfigOptions;
}
