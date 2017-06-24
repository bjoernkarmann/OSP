# OSP - Objectifier with Spacial Programming

This is a guide to install and run a screen-based demo of the [Objectifier](https://http://bjoernkarmann.dk/objectifier).



## Run

*Part 1 - Objectifer*

Open terminal on Mac

```
ssh pi@osp.local
```
Pasword: **koding6000**

Run this command:

```
npm start
```

*Part 2 - ml4a*

Run the **ConvnetClassifier** app

*Part 3 - server*

Open the terminal on Mac and cd to the path of the **osp** folder:

```
cd PATH-TO-FOLDER
```

Start the server:

```
npm start
```
*Part 4 - phone*

Open a browser on a phone and insert this url:

```
http://localhost:3000
```


## Setup
<br>
![alt text](diagram.jpg)

## Getting Started

This guide will explain how to setup the OSP both on the hardware and software side.



### Hardwhere:
- Phone (controller will run here)
- Mac computer (code will run here)
- The objectifier
- A device of choice (230V)
- 2x Powerplug

### Softwhere:

*Part 1 - ml4a*

- Install the latest version of [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)
- Install the latest version of [openFrameworks](http://openframeworks.cc/download/)<br>*Uses this [guide](http://openframeworks.cc/setup/xcode/) to for installing openFrameworks in Xcode*
- Download the [ml4a-ofx](https://github.com/ml4a/ml4a-ofx/) application
- Drag the **ml4a-ofx** folder into the **apps** folder of openFrameworks
- Open the **ConvnetClassifier.xcodeproj** file in Xcode
- Run the **ConvnetClassifier**
- Find and open the finished app under the folder **ConvnetClassifier/bin**

*Part 2 - server*

- Download this git-repostory and unzip.
- In terminal cd to the **osp** folder: ```cd PATH-TO-FOLDER``` 
- install the dependancies: ```npm install```
- test the installation by running the server: ```npm start```

### RaspberryPi:
This step is only required if a backup of the raspberry pi is needed

*Part 1 - Setup*

- Enable: camera, ssh, vnc, and remote gpio
- Create hostname: **osp**
- Change the password to: **koding6000**
- connect to raspberry **ssh pi@osp.local** (user is pi)

*Part 2 - Update*

The first command updates firmware and may require reboot.

```
sudo rpi-update
sudo apt-get update
sudo apt-get upgrade
```

Install node

```
sudo apt-get install nodejs npm
```

*Part 3 - *

Download osc-relay

```
git clone https://github.com/.git
```

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
