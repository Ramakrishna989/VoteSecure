# Step 1: Use Official Node.js Image
FROM node:20

# Step 2: Set Working Directory
WORKDIR /app

# Step 3: Copy Package Files First (for Caching)
COPY package*.json ./

# Step 4: Install Dependencies
RUN npm install

# Step 5: Copy All Files to Container
COPY . .

# Step 6: Expose Port 3000
EXPOSE 3000

# Step 7: Command to Start Application
CMD ["node", "server.js"]
