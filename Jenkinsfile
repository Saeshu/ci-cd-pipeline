pipeline {
    agent any
    
    tools {
        maven 'Maven_Local'  // or whatever you named your Maven in Jenkins
    }

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = 'my-maven-app'
        IMAGE_TAG = "latest"
        ACCOUNT_ID = '841765042147'  // your AWS account ID
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"

    }

    stages {
       

        stage('Build Docker Image') {
    steps {
        sh '''
            docker build -t $ECR_REPO:$IMAGE_TAG .
        '''
    }
}


        stage('Login to AWS ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Tag & Push to ECR') {
            steps {
                sh '''
                    docker tag $ECR_REPO:$IMAGE_TAG $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
                    docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }
       
    }

    post {
        success {
            echo '🚀 CI/CD pipeline completed successfully!'
        }
        failure {
            echo '💀 Pipeline failed, check logs.'
        }
    }
}
