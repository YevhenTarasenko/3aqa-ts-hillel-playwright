# Use docker
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set the working directory
WORKDIR /playwright-tests

# Copy all files from the current directory to the working directory
COPY . .

# Install Node dependencies
RUN npm install

# Run the test script
CMD ["npx", "playwright", "test"]