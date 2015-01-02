---
layout: post
title:  "Welcome to Jekyll!"
date:   2014-12-29 20:02:49
description: "This is the first post in my blog!"
categories: jekyll update
tags:
- jekyll
- ruby
- hightlight
---

![Jekyll logo](http://www.proxygear.com/images/posts/jekyll.png)
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

**Jekyll also offers powerful support for code snippets**:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

{% highlight javascript %}
var disqus_loaded = false;

function load_disqus()
{
    disqus_loaded = true;
    var disqus_shortname = 'willianjusten';
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    var ldr = document.getElementById('disqus_loader');
    ldr.parentNode.removeChild(ldr);
};

window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800)) {
        //hit bottom of page
        if (disqus_loaded==false)
            load_disqus()
    }
};
{% endhighlight %}

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.