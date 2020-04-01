@echo off

echo #############################################
echo #           Building Docker Image           #
echo #############################################

docker-compose -f ..\src\docker-compose.yml build

