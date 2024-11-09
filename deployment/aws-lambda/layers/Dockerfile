FROM node:20.18

#################
##### SETUP #####
#################

RUN apt update && apt install -y zip

# stores node_modules
RUN mkdir -p /layer/nodejs/

###################################
##### NODE_MODULES GENERATION #####
###################################

# uses an intermediary folder to generates the files
WORKDIR /home/node/app/

COPY package*.json ./

RUN npm ci --omit=dev --no-audit

RUN mv node_modules /layer/nodejs/

#################################
##### CREATE LAYER ZIP FILE #####
#################################

RUN cd /layer && zip -r /home/aws-lambda-layer.zip .
