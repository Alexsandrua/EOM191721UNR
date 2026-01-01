npx babel --presets=@babel/preset-env,@babel/preset-react js/source -d js/build
npx browserify js/build/app.js -o bundle.js -t [ babelify --presents [ es2015 react]]
