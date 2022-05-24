FROM openjdk:11-jdk
MAINTAINER Lekan Adams
WORKDIR /webapp
COPY ./target/webapp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 7070
ENTRYPOINT ["java","-jar","app.jar"]
