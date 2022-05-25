pipeline {
    agent {
	    node {
	        label 'GRIDENGINE'
	    }
    }

    stages {
        stage('Clean') {
            steps {
		echo 'Cleaning old files'
                sh 'rm -rf * && ls -al'
            }
        }
        stage('Init') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/*']], extensions: [[$class: 'CheckoutOption', timeout: 3]], userRemoteConfigs: [[name: 'origin', refspec: '+refs/*:refs/*', url: 'http://51.37.232.174:80/Lekanswanson/WebProject']]])
                sh 'ls'
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
        stage('Run App') {
            steps {
                sh 'docker run -d -it --rm -p7070:7070 --name webapp lekanswanson/webapp:1.01'
		sleep 50
		sh 'docker stop webapp' 
            }
        }	
	stage('Image Cleanup') {
	    steps {
		sh 'docker system prune -af --volumes' 
	    }
	}
    }
}
