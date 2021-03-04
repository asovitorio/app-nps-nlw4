export = {
    type:"sqlite",
   database: "./src/database/db-nlw.sqlite",
    synchronize: false,
   logging: true,
  entities: [
      "src/database/entity/**/*.ts"
   ],
   migrations: [
      "src/database/migration/**/*.ts"
   ],
   subscribers: [
      "src/database/subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "src/database/entity",
      migrationsDir: "src/database/migration",
      subscribersDir: "src/database/subscriber"
   }
  
   
}