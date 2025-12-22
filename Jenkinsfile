pipeline {
    agent any

    environment {
        APP_USER = "ubuntu"
        APP_DIR  = "/home/ubuntu/Node-App-Project"
        REPO_URL = "https://github.com/Aadhiesec1/Node-App-Project.git"
    }

    stages {

        stage('Load EC2 Host') {
            steps {
                withCredentials([string(
                    credentialsId: 'APP_EC2_HOST',
                    variable: 'HOST_FROM_CRED'
                )]) {
                    script {
                        // Promote credential to global env
                        env.APP_HOST = HOST_FROM_CRED
                    }
                }
            }
        }

        stage('Validate Configuration') {
            steps {
                sh '''
                  if [ -z "$APP_HOST" ]; then
                    echo "ERROR: APP_HOST is empty"
                    exit 1
                  fi
                '''
            }
        }

        stage('Deploy to App EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} << 'EOF'
set -e

echo "Connected to EC2: \$(hostname)"

if [ -d "${APP_DIR}" ]; then
    echo "Project exists. Pulling latest code..."
    cd ${APP_DIR}
    git pull origin main
else
    echo "Project not found. Cloning repository..."
    cd /home/ubuntu
    git clone ${REPO_URL}
    cd Node-App-Project
fi

echo "Installing dependencies..."
npm install

echo "Restarting application..."
pkill -f "node index.js" >/dev/null 2>&1 || true
nohup node index.js > app.log 2>&1 &

echo "Deployment finished on EC2"
EOF
"""
                }
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully 🚀"
        }
        failure {
            echo "Deployment failed ❌"
        }
    }
}
