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
//[key:string] Indice que puede ser cualquier cadena de texto. Se puede acceder a propiedades adicionales en el objeto "Config" utilizando claves de cadena que no están definidas explícitamente en la interfaz.
export interface Config {
  [key: string]: ConfigOptions;
}
