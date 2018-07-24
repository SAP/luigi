def label = "luigi-${UUID.randomUUID().toString()}"

properties([
    buildDiscarder(logRotator(numToKeepStr: '30')),
])

podTemplate(label: label) {
    node(label) {
        try {
          timestamps {

            timeout(time:20, unit:"MINUTES") {

              ansiColor('xterm') {
                stage("checkout luigi") {
                    checkout scm
                }

                stage("install lerna") {
                  execute("npm install")
                }

                stage("bootstrap lerna") {
                  execute("./node_modules/.bin/lerna bootstrap")
                }

                stage("build bundles via lerna") {
                    execute("./node_modules/.bin/lerna run bundle")
                }

                stage("run cypress") {
                  execute("cd core && ./examples/luigi-sample-angular/node_modules/.bin/cypress install && ./examples/luigi-sample-angular/node_modules/.bin/cypress run")
                }
                stage("archive videos") {
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'core/cypress/videos/*.mp4'
                }
              }
            }
          }
        } catch (ex) {
            echo "Got exception: ${ex}"
            currentBuild.result = "FAILURE"
            def body = """${currentBuild.currentResult} ${env.JOB_NAME}${env.BUILD_DISPLAY_NAME}: on branch: ${env.BRANCH_NAME}. See details: ${env.BUILD_URL}"""
            emailext body: body, recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: "SF: ${currentBuild.currentResult}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
        }
    }
}

def execute(command) {
    def repositoryName = 'luigi'
    def buildpack = 'node-buildpack:0.0.8'
    workDir = pwd()
    // sh "docker run --rm -v $workDir:/$repositoryName -w /$repositoryName ${env.DOCKER_REGISTRY}$buildpack /bin/bash -c '$command'"
    sh "docker run --rm -v $workDir:/$repositoryName -w /$repositoryName cypress/base /bin/bash -c '$command'"
}