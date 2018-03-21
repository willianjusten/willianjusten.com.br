#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing travis...'
bundle exec travis-lint
bundle exec jekyll build
bundle exec htmlproofer ./_site --http-status-ignore [0, 999] --url-ignore 'https://www.linkedin.com/in/willianjusten'
