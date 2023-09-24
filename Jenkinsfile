pipeline {
  agent none
  stages {
    stage('echo') {
      steps {
        sh 'echo "hello"'
      }
    }

    stage('check_pwd') {
      steps {
        sh 'node --version'
      }
    }

  }
}