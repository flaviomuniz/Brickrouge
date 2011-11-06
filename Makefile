BRICKROUGE = ./assets/brickrouge
BRICKROUGE_UNCOMPRESSED = ./assets/brickrouge-uncompressed
BRICKROUGE_LESS = ./lib/brickrouge.less
LESS_COMPRESSOR ?= `which lessc`
WATCHR ?= `which watchr`
YUI_JAR=/usr/share/yui-compressor/yui-compressor.jar

build:
	@@if test ! -z ${LESS_COMPRESSOR}; then \
		lessc ${BRICKROUGE_LESS} > ${BRICKROUGE_UNCOMPRESSED}.css; \
		lessc -x ${BRICKROUGE_LESS} > ${BRICKROUGE}.css; \
		lessc -x ./lib/scaffolding.less > ./assets/scaffolding.css; \
		echo "BrickRouge successfully built! - `date`"; \
	else \
		echo "You must have the LESS compiler installed in order to build BrickRouge."; \
		echo "You can install it by running: npm install less -g"; \
	fi
	
	cat ./lib/brickrouge.js ./lib/element/alert-message.js ./lib/widget/searchbox.js > ${BRICKROUGE_UNCOMPRESSED}.js
	java -jar ${YUI_JAR} -v --line-break 80 --preserve-semi -o ${BRICKROUGE}.js ${BRICKROUGE_UNCOMPRESSED}.js

phar:
	@php -d phar.readonly=0 phar.make.php;

watch:
	echo "Watching less files..."
	watchr -e "watch('lib/.*\.less') { system 'make' }"
	watchr -e "watch('lib/element/.*\.less') { system 'make' }"
	watchr -e "watch('lib/widget/.*\.less') { system 'make' }"

.PHONY: build watch
