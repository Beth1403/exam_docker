#!/bin/sh

until nc -z -v -w30 mariadb 3306
do
  echo "Waiting for MariaDB to be ready..."
  sleep 1
done


echo "MariaDB is ready. Starting the backend..."
exec "$@"