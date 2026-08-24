# ── Stage 1: Build ứng dụng Java 21 bằng Maven ──
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# 1. Copy pom.xml và tải dependencies trước để tận dụng Docker Cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy toàn bộ mã nguồn và tiến hành build JAR
COPY src ./src
RUN mvn clean package -DskipTests

# ── Stage 2: Runtime với JRE 21 Alpine (Tối ưu RAM cho Render Free Tier 512MB) ──
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy file jar đã build từ Stage 1
COPY --from=build /app/target/*.jar app.jar

# Port ứng dụng (server.port=8085)
EXPOSE 8085

# Cấu hình giới hạn Memory (-Xmx384m) để tránh vượt quá 512MB RAM trên Render Free
ENTRYPOINT ["java", "-Xmx384m", "-XX:+UseG1GC", "-jar", "app.jar"]
