pipeline {
  agent any
  stages {
    stage('echo') {
      steps {
        sh 'echo "hello"'
      }
    }

    stage('check_pwd') {
      steps {
        sh 'npm run serve'
      }
    }

  }
}