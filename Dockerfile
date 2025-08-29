FROM node:16
WORKDIR /app

# Expose the ports
EXPOSE ${GQL_PORT}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install sqd globally
RUN npm install -g @subsquid/cli

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/bin/sh", "-c", "/app/start.sh"]
