# Description
Discord template that makes discord bot development process easier and cleaner.

# Installation & Run
## Install
```
$ git clone
...
$ npm install
```
## Run locally
1. **Setup `.env`**
```env
token="bot-token"
clientId="bot-client-id"
```
2. **Run**
```
$ npm run prod
```
## Run with docker
1. **Build**
```
$ docker build . -t <your-user-name>/<bot-name>
```
2. **Run**
```
$ docker run -e token=<your-bot-token> -e clientId=<your-bot-client-id> <your-user-name>/<bot-name>
```

# Support (what this template is capable of)
- [x] Command Support.
- [x] Sub Command Support.
- [ ] Sub-Sub Command (command group) Support.
- [ ] Button Support.
- [ ] Development Mode (local command registration in dev).
