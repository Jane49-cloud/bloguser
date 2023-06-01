FROM node 

 WORKDIR /app

 ENV PATH /app/node_modules/.bin:$PATH
 

 COPY package*.json ./

 Run npm install --silent

 COPY  . ./

 CMD ["npm", "run" , "dev"]