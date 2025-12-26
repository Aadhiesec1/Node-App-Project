pipeline {
    agent any

    parameters {
        string(
            name: 'APP_HOST',
            defaultValue: '',
            description: 'EC2 public IP or DNS (without username)'
        )
    }

    environment {
        APP_USER = "ubuntu"
        APP_DIR  = "/home/ubuntu/Node-App-Project"
        REPO_URL = "https://github.com/Aadhiesec1/Node-App-Project.git"
    }

    stages {

        stage('Validate Parameters') {
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
