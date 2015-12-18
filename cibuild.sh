#!/usr/bin/env bash
set -e # halt script on error

echo 'Testing travis...'
bundle exec travis-lint
bundle exec jekyll build
bundle exec htmlproof ./_site --href-ignore https://www.codeschool.com/ https://github.com/LFeh/1-post-por-dia/issues/20
