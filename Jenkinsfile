pipeline {
    agent {
	    node {
	        label 'DOCKER_AGENT'
	    }
    }

    stages {
        stage('Clean') {
            steps {
                sh 'ls -al'
                sh 'rm -rf * && ls -al'
            }
        }
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/*']], extensions: [[$class: 'CheckoutOption', timeout: 3]], userRemoteConfigs: [[name: 'origin', refspec: '+refs/*:refs/changes/*', url: 'http://51.37.232.174:80/Lekanswanson/WebProject']]])
                sh 'ls -al'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Image') {
            steps {
                sh 'docker build -t lekanswanson/webapp:1.01 .'
            }
        }
    }
}
