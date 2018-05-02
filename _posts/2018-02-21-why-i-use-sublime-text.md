---
layout: post
title:  "Why I use sublime text"
author: Paul Mesnilgrente
categories: jekyll update
---
[Sublime text](http://www.sublimetext.com/) is a rich text editor that can turn into a real IDE in a few
minutes. Its most powerfull feature is the package control which enables plugin
installation very easily. I present here my favourites plugins.

# Table Editor

I use [Table editor](https://github.com/vkocubinsky/SublimeTableEditor) for writing Markdown. It implements
some very usefull formating in your markdown tables. You can pass from:

```markdown
| Column 1 | Column 2 |
|-|-|
| First line | First line second column |
```

to this:

```markdown
|  Column 1  |         Column 2         |
|------------|--------------------------|
| First line | First line second column |
```

simply by pressing enter. But this is not the only feature that there is. I hardly recommend to check
its documentation.

# PHP-Twig

As a Symfony programmer, I am quite used to write Twig templates. And for this, nothing is better than
this plugin. It does the syntax highlighting and it adds some usefull snippets. For example, you can type
simply `b<tab>` and it will complete with `{% raw %}{% block ... %}{% endblock %}{% endraw %}`.

[PHP-Twig](https://github.com/Anomareh/PHP-Twig.tmbundle) is the plugin that you must have if you are
front-end developper in Symfony or other PHP project using this template engine.

# LESS

LESS is a simple syntax highlighter for the well known less syntax. Even if I tend to use Sass
these days, the package is still installed! I have some projects that were using bootstrap 3.4
and it still compiles with the less npm package.

# Sass

[Sass](https://packagecontrol.io/packages/Sass) is a syntax highlither for Sass files. It even has a
support for CSS 4! At least, they have an active development.

# Markdown Preview

[MarkdownPreview](https://github.com/revolunet/sublimetext-markdown-preview)
is compatible with MathJax. For example, you can type:

```markdown
Inline formula \(x = 2 \times x + 10\) for example

Here is a block formula:

$$x = 2.x + 10$$
```

And it will render:

Inline formula \\(x = 2 \times x + 10\\) for example

Here is a block formula:

$$x = 2.x + 10$$
