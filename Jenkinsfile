pipeline {
  agent any
  stages {
    stage('echo') {
      steps {
        sh 'echo "hello"'
      }
    }

    stage('build docker') {
      steps {
        sh 'docker-compose build && docker-compose up -d'
      }
    }

  }
}