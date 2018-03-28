var	gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	stylus      = require('gulp-stylus'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	jeet        = require('jeet'),
	rupture     = require('rupture'),
	koutoSwiss  = require('kouto-swiss'),
	prefixer    = require('autoprefixer-stylus'),
	cp          = require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'})
		.on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

/**
 * Stylus task
 */
gulp.task('stylus', function(){
		gulp.src(['src/styl/home.styl', 'src/styl/posts.styl', 'src/styl/minimal.styl'])
		.pipe(plumber())
		.pipe(stylus({
			use:[koutoSwiss(), prefixer(), jeet(), rupture()],
			compress: true
		}))
		.pipe(gulp.dest('_includes'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('_includes'));
});

/**
 * Javascript Task
 */
gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('blog.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));
});

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch('src/styl/**/*.styl', ['stylus', 'jekyll-rebuild']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch(['**/*.html','index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'stylus', 'browser-sync', 'watch']);

// build to deploy
gulp.task('build', ['js', 'stylus', 'jekyll-build']);
