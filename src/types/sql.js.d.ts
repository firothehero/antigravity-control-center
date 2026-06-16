declare module 'sql.js' {
  interface Database {
    exec(sql: string): { columns: string[]; values: any[][] }[];
    close(): void;
  }

  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number>) => Database;
  }

  function initSqlJs(config?: { locateFile?: (file: string) => string }): Promise<SqlJsStatic>;
  export default initSqlJs;
  export type { Database, SqlJsStatic };
}
