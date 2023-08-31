# FROM node:14  as builder
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx
# EXPOSE 80
# COPY --from=builder /app/build /usr/share/nginx/html


# Stage 1: Build the React app using Node.js
FROM node:14 as builder
WORKDIR /app
COPY package.json .
RUN npm install --no-save --no-audit
COPY . .
RUN npm run build

# Stage 2: Serve the built React app using Node.js (without Nginx)
FROM node:14
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app/build .
CMD ["npx", "http-server", "-p", "3000"]


# ### Docker 

# ## docker file with nginx

# FROM node:14  as builder
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx
# EXPOSE 80
# COPY --from=builder /app/build /usr/share/nginx/html

# Note : above docker file multistage dockerfile
# ## docker image
# docker build -t movie-app .
# ### dcoker container
# docker run -d -p 82:80 --name movie-app-cont movie-app  
# Note : 
# The Dockerfile you provided is a multi-stage build, which first builds your React app using the Node.js image and then copies the built files into an Nginx image. To access the React app running in the Nginx container through a browser



# ### without nginx 
# # Stage 1: Build the React app using Node.js
# FROM node:14 as builder
# WORKDIR /app
# COPY package.json .
# RUN npm install --no-save --no-audit
# COPY . .
# RUN npm run build

# # Stage 2: Serve the built React app using Node.js (without Nginx)
# FROM node:14
# WORKDIR /app
# EXPOSE 3000
# COPY --from=builder /app/build .
# CMD ["npx", "http-server", "-p", "3000"]
