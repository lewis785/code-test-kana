.PHONE: setup test build

setup:
	docker build . -t kana

build:
	docker run -v ${PWD}/build:/var/app/build -v ${PWD}/src:/var/app/src kana yarn build

test:
	docker run -v ${PWD}/src:/var/app/src kana yarn test