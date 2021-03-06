#!/bin/bash -e

REGISTRY="registry.gitlab.com"

get_latest_commit(){
    echo $(git log -n 1 --pretty=format:""%H)
}

build_image(){
    docker build  --no-cache -t ${CI_REGISTRY_IMAGE}/apilicense:latest -t ${CI_REGISTRY_IMAGE}/apilicense:${CI_COMMIT_TAG} -f ./api-license/Dockerfile.build ./api-license
    docker push ${CI_REGISTRY_IMAGE}/apilicense:${CI_COMMIT_TAG}
    docker push ${CI_REGISTRY_IMAGE}/apilicense:latest
}

build_image