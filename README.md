# Instructions to setup the app

1. Clone the repository

```
git clone https://github.com/OyeeeAbhi/CRM-Backend.git
```


2. Install the dependencies

```
npm i
```

3. Create a new file with the file name as `.env` in the root directory and add the following environment variables
```
PORT=3000
SALT_ROUNDS=10
JWT_SECRET='crm_app_123'
MAIL_FROM='abc@gmail.com'
SENDGRID_API_KEY='SG.--Yourapikey'
DATABASE_URL="DB_URL"
```

Note: Make sure you change the sendgrid api key and Database url with your own account's api key and url else all the apis of the app might not work but for the sake of the Deployment using CI CD even if you don't change then also you can test the basic ping api which is a GET request to `localhost:3000/ping`

4. Move to the src folder
   
```
cd src/
```

5. Generate prisma models

```
npx prisma init
```

6. Run the server

```
npm run dev
```

Great you have the server running on you local machine, you can now test the app by making a GET request to `localhost:3000/ping`
