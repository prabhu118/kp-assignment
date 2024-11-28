## CSV TO JSON CONVERTER API

STEPS TO START THE APPLICATION:

1. Customize the environment file to align with your system's configuration.
2. Install dependencies by executing command `npm i`
3. If database is not present then execute command `npx sequelize-cli db:create`
4. To create users table run command `npx sequelize-cli db:migrate` 
5. Run `node start` to start the application

Use below CURL request to upload file.

```bash
curl --location 'http://localhost:3000/upload' \
--form 'file=@"/path/to/file"'
```