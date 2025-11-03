{\rtf1\ansi\ansicpg1252\cocoartf2759
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 pipeline \{\
    agent any\
\
    environment \{\
        AWS_REGION = 'us-east-1'\
        ECR_REPO = 'my-maven-app'\
        IMAGE_TAG = "$\{env.BUILD_NUMBER\}"\
        ACCOUNT_ID = '841765042147' // replace with your AWS account ID\
    \}\
\
    stages \{\
        stage('Checkout') \{\
            steps \{\
                checkout scm\
            \}\
        \}\
\
        stage('Build Maven App') \{\
            steps \{\
                sh 'mvn clean package -DskipTests'\
            \}\
        \}\
\
        stage('Build Docker Image') \{\
            steps \{\
                script \{\
                    dockerImage = docker.build("$\{ECR_REPO\}:$\{IMAGE_TAG\}")\
                \}\
            \}\
        \}\
\
        stage('Login to AWS ECR') \{\
            steps \{\
                withCredentials([\
                    usernamePassword(\
                        credentialsId: 'aws-jenkins',\
                        usernameVariable: 'AWS_ACCESS_KEY_ID',\
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'\
                    )\
                ]) \{\
                    sh '''\
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com\
                    '''\
                \}\
            \}\
        \}\
\
        stage('Tag and Push Image to ECR') \{\
            steps \{\
                script \{\
                    sh '''\
                        docker tag $\{ECR_REPO\}:$\{IMAGE_TAG\} $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$\{ECR_REPO\}:$\{IMAGE_TAG\}\
                        docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$\{ECR_REPO\}:$\{IMAGE_TAG\}\
                    '''\
                \}\
            \}\
        \}\
    \}\
\
    post \{\
        success \{\
            echo " Build & Push succeeded! Image: $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$\{ECR_REPO\}:$\{IMAGE_TAG\}"\
        \}\
        failure \{\
            echo "Build failed! Check logs above."\
        \}\
    \}\
\}\
}