export interface DynamicConfigOptions {
  //
  // This interface describes the options you want to pass to
  // DynamicConfigModule.
  //
  // For example, if you are wrapping a database library like MassiveJS,
  // this interface would probably contain properties like:
  //
  // user: string;
  // password: string;
  // port: number;
  // host: string;
  // database: string;
  cloudId: string;
  username: string;
  password: string;
}
