# ── Stage 1: Build ứng dụng Java 21 bằng Maven ──
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy mã nguồn và file settings.xml cấu hình Mirror
COPY . .
RUN mvn clean package -s settings.xml -DskipTests

# ── Stage 2: Runtime với JRE 21 Alpine (Tối ưu RAM cho Render Free Tier 512MB) ──
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy file jar đã build từ Stage 1
COPY --from=build /app/target/*.jar app.jar

# Port ứng dụng (server.port=8085)
EXPOSE 8085

# Cấu hình giới hạn Memory (-Xmx384m) để tránh vượt quá 512MB RAM trên Render Free
ENTRYPOINT ["java", "-Xmx384m", "-XX:+UseG1GC", "-jar", "app.jar"]
