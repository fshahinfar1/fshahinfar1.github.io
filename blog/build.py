#! /usr/bin/python3
import os
import sys
import subprocess


def build_latex():
    build_dir = './build'
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
    subprocess.check_output(cmd, shell=True, text=True)
    subprocess.check_output(cmd, shell=True, text=True)


def update_blog_index(dirs):
    with open('index.html', 'w') as f:
        f.write('<ol>\n')
        for dir_name in dirs:
            href=f'{dir_name}/build/blog.html'
            f.write(f'<oi><a href={href}>{dir_name}</a></oi>\n')
        f.write('</ol>\n')


def main():
    """
    Each blog post has its own directory. Inside it, there will be a blog.tex
    file. The content of the blog.tex will be converted to blog.html and placed
    in build directory.
    """
    curdir = os.path.dirname(__file__)
    _, dirs, _ = next(os.walk(curdir))
    dirs.sort(reverse=True)
    for dir_name in dirs:
        P = os.path.join(curdir, dir_name)
        print(P)
        os.chdir(P)
        build_latex()
    os.chdir(curdir)
    update_blog_index(dirs)


if __name__ == '__main__':
    main()
