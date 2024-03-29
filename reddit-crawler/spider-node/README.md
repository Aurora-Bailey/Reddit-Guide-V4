# Reddit-Guide-V4

## Instructions for creating a new database

### Create a new ec2 instance

```
Ubuntu 20.04
t2.micro
set key pair
security group (mongodb + my ip)
30GB ssd
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
sudo apt update

sudo apt install -y dirmngr gnupg apt-transport-https ca-certificates software-properties-common
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
sudo apt update
```

```
sudo apt install -y mongodb-org
```

```
sudo systemctl start mongod
sudo systemctl enable mongod
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
sudo vim /etc/mongod.conf
bindIp: 0.0.0.0 #127.0.0.1 defalt
security:
  authorization: 'enabled'

net:
  port: 27017
  bindIp: 0.0.0.0   #default value is 127.0.0.1
```

```
sudo service mongod restart
```

### Run spider node

Create spot instance

```
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/Aurora-Bailey/Reddit-Guide-V4.git

sudo vim ~/Reddit-Guide-V4/reddit-crawler/spider-node/app/tools/config.json
```

```
{
  "ip": "",
  "username": "",
  "password": ""
}
```

```
sudo npm install pm2 -g
pm2 startup
pm2 save
pm2 start ~/Reddit-Guide-V4/reddit-crawler/spider-node/app/index.js
pm2 save
```
