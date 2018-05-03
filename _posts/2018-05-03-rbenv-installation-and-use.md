---
layout: post
title:  "Install rbenv and use it"
author: Paul Mesnilgrente
categories: ruby rbenv installation
image: /assets/images/rbenv_logo.png
---
## I. What is rbenv

Rbenv is a tool to manage your ruby versions. It works in collaboration with
`bundler` which manage your development libraries versions. You can find more
information on their [github
page](https://github.com/rbenv/rbenv). 

## II. Why I prefer rbenv to RVM

One reason can be found in the article on [RVM]({{ site.baseurl }}{% post_url
2018-05-02-rvm-and-ruby-installation %}): there is a bug. But actually, rbenv
themselves are explaining it well
[here](https://github.com/rbenv/rbenv/wiki/Why-rbenv%3F). The **main** reason is
that I don't like to change my shell (RVM overrides cd!) only to have a ruby
version manager. I think it is an overkill in comparison of rbenv and this is
dangerous as well.

Another point is, python has used the same mechanism as Ruby, the project is
called [pyenv](https://github.com/pyenv/pyenv). So it will be very easy to
understand how pyenv works if you have understood how rbenv works. Even if
python includes the concept of virtual environemnts.

## III. Install and use rbenv

### III.1. Install rbenv

Rbenv provides an installation script which include a plugin to facilitate the
ruby installation. You can find the repository on
[github](https://github.com/rbenv/rbenv-installer). To summarize it in a bash
script:

```bash
# prepare the installation to avoid warnings from rbenv-doctor
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
# if you want to be sure that rbenv is correctly installed:
#     - close the terminal and open a new one, or
#     - source your ~/.bashrc
#     - check that everything is OK in the result of the following command:
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

### III.2. Use rbenv to install ruby

When you wan to install Ruby on your OS, you have the choice. You can install
ruby from your package manager (`sudo apt install ruby`), rbenv will take it
into account. Or you can install a specific ruby version (for development
maybe) with: `rbenv install 2.4.2`.

After installing a new version with rbenv, you should execute `rbenv rehash` to
install/update the shims in your new version. More information about shims [here](https://github.com/rbenv/rbenv#understanding-shims).

### III.3. Use rbenv to develop your jekyll website

One powerfull feature of rbenv is to set default (global) and local ruby
versions easily. For example, if you want to let your default ruby version to
be the one installed by the package manager, run `rbenv global system`. But if
you want to develop your jekyll website and make it work on github, you will
need to:
- set a ruby version for the development
- manage jekyll dependencies

Here is a script to retrieve your jekyll website, install everything and begin
to write articles:

```bash
# install the currently ruby version supported by github-pages
rbenv install 2.4.2
rbenv rehash
# retrieve your website
git clone git@github.com:/user/project.github.io
# set your ruby environment to 2.4.2 in this folder
cd project.github.io
rbenv local 2.4.2
# install bundler, the ruby library package manager
gem install bundler
bundle install --path vendor
# add vendor to .gitignore if not already done
[ `grep -c vendor .gitignore` -eq 0 ] && echo vendor >> .gitignore
# star the jekyll built-in server
bundle exec jekyll serve
```

**Note:** You should update your packages versions in Gemfile to make it match
the one from github-pages. You can check github-pages package versions
[here](https://pages.github.com/versions/).

## Sources

- https://github.com/rbenv/rbenv
- https://github.com/rbenv/rbenv-installer
- https://github.com/rbenv/rbenv/wiki/Why-rbenv%3F
- https://gist.github.com/MicahElliott/2407918
- https://pages.github.com/versions/
- https://github.com/pyenv/pyenv
