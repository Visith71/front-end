pipeline {
  agent {
    docker {
      image 'appdynamics/nodejs-agent'
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