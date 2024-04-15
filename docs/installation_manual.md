# INSTALLATION MANUAL

This manual provides instructions for the cloning of the repository and the installation procedure to get this application running on your own local machine. If you're looking for the general user manual on how to use the [Live Application](https://spotisaver.vercel.app/ "Spotisaver Web Application") running on the dedicated web server, consult [this document](./user_manual.md "User Manual").

**This installation manual describes the process for LINUX systems.** Users of other operating systems might need to consult other documentation to get the application running on their own local machine. However, the installation procedure should look largely similar to the one described here.

## Node.js

Check if you've got **Node.js** and **NPM** installed on your machine by checking the version with

```
node --version
```

and

```
npm --version
```

**If not**, install Node.js along with NPM for your machine by executing the following command

```
sudo snap install node --classic
```

in the terminal. Ensure successful installation by checking the versions again with the commands provided above.

If encountering issues with the installation procedure of Node.js, please visit [their homepage](https://nodejs.org/en "Node.js Homepage").

## Yarn (optional)

_Yarn_ is recommended over NPM as your package manager. Yarn is much faster (provides parallel installation) and has a better track record of handling security issues.

Install Yarn as your package manager with

```
sudo npm install --global yarn
```

Ensure successful installation by checking the version:

```
yarn --version
```

You may also continue to use NPM as your package manager (automatically installed with Node.js as a default).

## Cloning the repository

Clone the repository to your local machine by executing

```
git clone https://github.com/joonarafael/spotisaver.git
```

You may also download the repository as a [ZIP folder](https://github.com/joonarafael/spotisaver/archive/refs/heads/main.zip "Download ZIP").

Enter the repository with

```
cd spotisaver
```

## Install dependencies

Install all required dependencies by executing

```
yarn install
```

or with

```
npm install
```

if you decided to go with NPM. Always replace `yarn` with `npm` if you're using NPM.

Both NPM and Yarn will give you detailed error messages if the installation of associated dependencies fails. In this case, please follow closely the instructions given within the error notices.

## Running the application

After all dependencies have been successfully installed, the application can be started with

```
yarn run dev
```

Now the application can be accessed with the web browser of your choice. Default port for the application is **3000** ([localhost:3000](localhost:3000 "Port 3000 on your localhost")), but you can retrieve the port information also from the terminal logs after launching the application.
