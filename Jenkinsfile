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
		echo 'Checking out latest changes'
                checkout([$class: 'GitSCM', branches: [[name: '*/*']], extensions: [[$class: 'CheckoutOption', timeout: 3], [$class: 'BuildChooserSetting', buildChooser: [$class: 'GerritTriggerBuildChooser']]], userRemoteConfigs: [[name: 'origin', refspec: '+refs/changes/*:refs/changes/*', url: 'http://109.76.234.71/Lekanswanson/WebProject']]])
                sh 'ls'
            }
        }
	stage('Test') {
	    steps {
		echo 'Running Junit Tests'
		mvn test
	    }
	}
        stage('Build') {
            steps {
		echo 'Building the application'
                sh 'mvn clean package'
            }
        }
        stage('Image') {
            steps {
		echo 'Building docker image'
                sh 'docker build -t lekanswanson/webapp:1.01 .'
            }
        }
        stage('Run App') {
            steps {
		echo 'Run the application'
                sh 'docker run -d -it --rm -p7070:7070 --name webapp lekanswanson/webapp:1.01'
		sleep 50
		sh 'docker stop webapp' 
            }
        }	
	stage('Publish Image') {
	    steps {
		echo 'Upload image to repository'
	    }
	}
	stage('Image Cleanup') {
	    steps {
		echo 'Clean up docker images from system'
		sh 'docker system prune -af --volumes' 
	    }
	}
    }
}
