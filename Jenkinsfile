pipeline {
  agent {
    docker {
      image '48d111aa476c'
    }

  }
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