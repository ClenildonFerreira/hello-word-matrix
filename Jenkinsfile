pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        DOCKER_IMAGE = 'matrix-hello-world'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    tools {
        nodejs "${NODE_VERSION}"
    }
    
    stages {
        stage('Build') {
            steps {
                echo 'Building Angular application...'
                checkout scm
                bat 'npm ci'
                bat 'npm run build -- --configuration=production'
                
                echo 'Building Docker image...'
                script {
                    def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    bat '''
                        docker stop matrix-hello-world || true
                        docker rm matrix-hello-world || true
                        docker run -d --name matrix-hello-world -p 4200:80 %DOCKER_IMAGE%:%DOCKER_TAG%
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Good news! The build ${env.BUILD_URL} completed successfully.",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Bad news! The build ${env.BUILD_URL} failed. Please check the logs.",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}