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
        sh 'pwd'
      }
    }

    stage('build') {
      steps {
        sh 'cd front-end_main && npm run serve'
      }
    }

  }
}