"use strict";

const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");
const watch = require("gulp-watch");


// CLEANER
gulp.task("sass:clean", () => del("css/**/*.css"));

// COMPILER
gulp.task("sass:compile", () => (
  gulp.src("sass/**/*")
    .pipe(sass()
      .on("error", sass.logError)
    )
    .pipe(gulp.dest("css/"))
));

// WATCHER
gulp.task("sass:watch", () => (
  gulp.watch("sass/**/*",["sass:clean", "sass:compile"])
));

// COMPILED TASK
gulp.task("sass:start", ["sass:clean", "sass:compile", "sass:watch"]);

