cd C:\Users\Kapil\Documents\GitHub\DHTweetAppUI

docker build -t kapilbodhare/tweet-app-ui:version1 .

docker run <image name> -p 80:80


github connection for tweet-app-ui and github:

arn:aws:codestar-connections:us-west-2:681720460232:connection/62da9ee8-db65-4024-8868-4ea2a23abb33


ECR commands to push images for UI :

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 681720460232.dkr.ecr.us-west-2.amazonaws.com
docker build -t tweet-app-ui-kapil .
docker tag tweet-app-ui-kapil:latest 681720460232.dkr.ecr.us-west-2.amazonaws.com/tweet-app-ui-kapil:latest
docker push 681720460232.dkr.ecr.us-west-2.amazonaws.com/tweet-app-ui-kapil:latest

http://100.20.64.147/ => old
http://35.89.14.212/ => latest

Cloud Credentials:

https://iihtedu.cloud.builder.ai/

kapil.bodhare@mml.local
HFtrtVDG

cd C:\Users\Kapil\Documents\GitHub\DHTweetAppAPI

ECR commands to push images to API :

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 681720460232.dkr.ecr.us-west-2.amazonaws.com
docker build -t tweet-app-api-kapil .
docker tag tweet-app-api-kapil:latest 681720460232.dkr.ecr.us-west-2.amazonaws.com/tweet-app-api-kapil:latest
docker push 681720460232.dkr.ecr.us-west-2.amazonaws.com/tweet-app-api-kapil:latest

http://34.222.170.197:8080/tweets/hello/ without ecr repo (using docker hub)
http://54.245.62.11:8080/tweets/hello/ with ecr repo






