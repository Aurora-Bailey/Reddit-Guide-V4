# Reddit-Guide-V4

## Instructions for creating a new database

### Create a new ec2 instance

```
Ubuntu 20.04
M3.meduim
50gb ssd
set key pair
```

```
Security group:
Allow ssh from my ip.
Allow port 27017 from all.
```

```
SSH into machine with key pair
```

### Install mongodb

https://wiki.crowncloud.net/How_To_Install_Duf_On_Ubuntu_22_04?How_to_Install_Latest_MongoDB_on_Ubuntu_22_04

#### Install the dependencies

```
apt update

apt install dirmngr gnupg apt-transport-https ca-certificates software-properties-common
```

#### Add MongoDB GPG Key

```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

#### Create a list for MongoDB

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

```
apt-get update
```

```
apt-get install -y mongodb-org
```

```
systemctl start mongod
systemctl enable mongod
```

#### Create mongodb user & make public

https://medium.com/founding-ithaka/setting-up-and-connecting-to-a-remote-mongodb-database-5df754a4da89

Create user

```
mongo
use admin
db.createUser({ user: "mongoadmin" , pwd: "42", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})
```

Test user

```
mongo -u mongoadmin -p --authenticationDatabase admin
```

Open the config file and replace these lines

```
sudo vi /etc/mongod.conf
bindIp: 0.0.0.0 #127.0.0.1 defalt
security:
authorization: enabled
```
