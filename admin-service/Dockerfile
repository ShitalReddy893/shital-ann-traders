# Stage 1: Build the application
FROM public.ecr.aws/sam/build-maven:3.9.4-amazoncorretto-17 AS build
WORKDIR /app

# Copy the project files into the container
COPY . .

# Build the application (skip tests)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
