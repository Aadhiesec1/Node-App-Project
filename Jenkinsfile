pipeline {
    agent any

    environment {
        APP_USER = "ubuntu"
        APP_DIR  = "/home/ubuntu/Node-App-Project"
        REPO_URL = "https://github.com/Aadhiesec1/Node-App-Project.git"
    }

    stages {

        stage('Deploy to App EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} '
                        set -e

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

                        echo "Restarting application (without PM2)..."
                        pkill -f "node index.js" || true
                        nohup node index.js > app.log 2>&1 &
                    '
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
