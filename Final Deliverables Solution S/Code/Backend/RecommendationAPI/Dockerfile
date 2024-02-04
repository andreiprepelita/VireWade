# Use Ubuntu as the base image
FROM ubuntu:latest AS build

# Install JDK and Maven
RUN apt-get update \
    && apt-get install -y openjdk-17-jdk maven

# Copy your source code into the image
COPY . .

# Build the project using Maven
# Assuming your project has a typical Maven structure
RUN mvn clean package -DskipTests

# Use the slim JDK image for the final image
FROM openjdk:17-jdk-slim

# Expose the port your app runs on
EXPOSE 8081

# Copy the built jar file from the build stage
# Adjust the path to the jar file if necessary, based on your Maven configuration
COPY --from=build target/RecommendationAPI-1.jar app.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]