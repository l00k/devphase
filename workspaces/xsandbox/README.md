# devPHAse sandbox

### Steps
1. Pull this repository with submodules
```shell
git clone --recursive git@github.com:l00k/devphase-sandbox.git
```
2. Install dependencies
```shell
yarn install
```
3. Build devPHAse (and watch changes)

```shell
cd devphase
yarn compile [--watch]

cd ..
yarn install # required to link compiled binary
```
4. In separate terminal Build Flipper contract
```shell
cd sandbox
yarn devphase compile [flipper]
```
5. Try testing
```shell
cd sandbox
yarn devphase test
```
