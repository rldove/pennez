FROM node:9.3

# Create app directory
# RUN mkdir -p /usr/src/apps/pennez
# WORKDIR /usr/src/apps/pennez

VOLUME ["/usr/src/apps/pennez"]

# use nodemon for development
RUN npm install -g forever

# Install app dependencies
# COPY package.json /usr/src/apps/pennez/
# RUN npm install

EXPOSE 8881

# Bundle app source
COPY . /usr/src/apps/pennez

# COPY dev-init.sh /usr/src/apps/pennez/

ADD dev-init.sh /dev-init.sh
RUN chmod 755 /dev-init.sh
CMD ["/dev-init.sh"]


# CMD [ "npm", "start" ]
# CMD ["forever", "-w", "index.js"]
