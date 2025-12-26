pipeline {
    agent any

    parameters {
        string(
            name: 'APP_HOST',
            description: 'EC2 public IP or DNS'
        )
    }

    environment {
        APP_USER = "ubuntu"
        APP_DIR  = "/home/ubuntu/Node-App-Project"
        REPO_URL = "https://github.com/Aadhiesec1/Node-App-Project.git"
    }

    stages {

        stage('Validate Configuration') {
            steps {
                script {
                    if (!params.APP_HOST?.trim()) {
                        error "APP_HOST parameter is required"
                    }
                }
            }
        }

        stage('Deploy to App EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
ssh -o StrictHostKeyChecking=no ${APP_USER}@${params.APP_HOST} << 'EOF'
set -e

if [ -d "${APP_DIR}" ]; then
    cd ${APP_DIR}
    git pull origin main
else
    cd /home/${APP_USER}
    git clone ${REPO_URL}
    cd Node-App-Project
fi

npm install

pkill -f "node index.js" >/dev/null 2>&1 || true
nohup node index.js > app.log 2>&1 &

EOF
"""
                }
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully"
        }
        failure {
            echo "Deployment failed"
        }
    }
}
