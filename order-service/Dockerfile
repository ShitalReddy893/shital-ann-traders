# Stage 1: Build the application
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17 AS build
WORKDIR /app
COPY . .
RUN curl -sSL https://archive.apache.org/dist/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.tar.gz | tar xz -C /usr/local && \
    ln -s /usr/local/apache-maven-3.9.4/bin/mvn /usr/local/bin/mvn && \
    mvn clean package -DskipTests

# Stage 2: Run the application
FROM public.ecr.aws/amazoncorretto/amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
