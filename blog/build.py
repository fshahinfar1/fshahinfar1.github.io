#! /usr/bin/python3
import os
import sys
import subprocess

build_dir = './build'

def build_latex():
    need_rebuild = False

    if not os.path.isdir(build_dir):
        os.mkdir(build_dir)
        need_rebuild = True

    if not need_rebuild:
        P = os.path.join(build_dir, 'blog.html')
        if os.path.isfile(P):
            # We do not need to rebuild this post
            return

    cmd = f'make4ht --output-dir {build_dir} blog'
    subprocess.check_output(cmd, shell=True, text=True)
    # bibtex $(OUTDIR)/$(PAPER)
    try:
        subprocess.check_output('bibtex blog', shell=True, text=True)
    except:
        print('bibtex failed!')
    subprocess.check_output(cmd, shell=True, text=True)


def clean_latex():
    if not os.path.isdir(build_dir):
        # Nothing to do
        return
    cmd = f'rm -r {build_dir}'
    subprocess.check_output(cmd, shell=True)


def read_blog_post_date(path):
    X = "<div class='date'><span class='cmr-12'>"
    Y = "</span></div>"
    with open(path, 'r') as blog_file:
        for line in blog_file:
            if not line.startswith(X):
                continue
            x = len(X)
            y = line.index(Y)
            date = line[x:y]
            return date
    return '-- missing update date --'


def read_blog_post_title(path):
    X = len('<head><title>')
    with open(path, 'r') as blog_file:
        for line in blog_file:
            if not line.startswith('<head><title>'):
                continue
            Y = line.index('</title>')
            title = line[X:Y]
            return title
    return '-- untitled --'


def update_blog_index(dirs):
    css = '''
.date-tag {
font-size: 10pt;
color: gray;
padding-left: 2em;
}
'''
    head_section = f'''
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farbod's Blog Index </title>
    <link rel="stylesheet" type="text/css" href="/styles/main.css"/>
    <style>\n{css}\n</style>
</head>
    '''
    navbar = '''
<!-- Navigation bar -->
<div class="navbar">
    <a href="/"><span>Home</span></a>
    <a href="/blog/index.html"><span>Blog</span></a>
    <a
        href="https://github.com/fshahinfar1/my-resume/raw/master/resume.pdf"
        target="_blank"><span>CV</span></a>
</div>
    '''
    with open('index.html', 'w') as f:
        f.write(head_section)
        f.write('<body>\n')
        f.write(navbar)
        f.write('<ol>\n')
        for dir_name in dirs:
            href=f'{dir_name}/build/blog.html'
            if not os.path.isfile(href):
                print(f'warning: {dir_name} does not have a blog.html entry')
                continue
            title = read_blog_post_title(href)
            date = read_blog_post_date(href)
            f.write(f'<li><a href={href} target="_blank">{title}</a><span class="date-tag">{date}</span></li>\n')
        f.write('</ol>\n')
        f.write('</body>')


def main():
    """
    Each blog post has its own directory. Inside it, there will be a blog.tex
    file. The content of the blog.tex will be converted to blog.html and placed
    in build directory.
    """

    action = 'build'
    if len(sys.argv) > 1:
        action = sys.argv[1]

    actions = {
            'build': build_latex,
            'clean': clean_latex,
            }
    build_entry_func = actions.get(action)
    if build_entry_func is None:
        print('Unsupported requested action')
        sys.exit(1)

    curdir = os.path.dirname(__file__)
    _, dirs, _ = next(os.walk(curdir))
    skip = ['03',]
    tmp_dirs = []
    for d in dirs:
        okay = True
        for s in skip:
            if d.startswith(s):
                okay = False
                break
        if okay:
            tmp_dirs.append(d)
    dirs = tmp_dirs
    dirs.sort(reverse=True)
    for dir_name in dirs:
        P = os.path.join(curdir, dir_name)
        print(P)
        os.chdir(P)
        build_entry_func()
    os.chdir(curdir)
    update_blog_index(dirs)


if __name__ == '__main__':
    main()
