# ---------------------------
# Stage 1: Build the application
# ---------------------------
FROM amazoncorretto:17 AS build
WORKDIR /app

# Copy the project files
COPY . .

# Install Maven 3.9.4 manually
RUN curl -sSL https://archive.apache.org/dist/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.tar.gz \
    | tar xz -C /usr/local && \
    ln -s /usr/local/apache-maven-3.9.4/bin/mvn /usr/local/bin/mvn

# Build the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# ---------------------------
# Stage 2: Run the application
# ---------------------------
FROM amazoncorretto:17-alpine
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
