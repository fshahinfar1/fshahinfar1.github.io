#!/usr/bin/python3
import os
import sys
import yaml
import math
import time
from termcolor import colored


TODAY = time.time()


class Data:
    def __init__(self):
        pass


class NothingFormatter:
    def begin(self):
        pass

    def end(self):
        pass

    def entry(self, d):
        base = f'{d.lbl:10}:  {d.deadline:10}  [{d.days} days]'
        if d.is_guess:
            print(base + ' (?? THIS IS A GUESS)', file=OUTPUT_FILE)
        else:
            print(base, file=OUTPUT_FILE)

    def sep(self):
        print('-' * 40, file=OUTPUT_FILE)


class HTMLFormatter:
    def begin(self):
        print('<!DOCTYPE html><html><head></head><body><table>', file=OUTPUT_FILE)

    def end(self):
        print('</table><script src="conf_deadline.js"></script></body></html>', file=OUTPUT_FILE)

    def entry(self, d):
        base = f'<tr><td class="fancy-lbl">{d.lbl:10}:</td><td class="fancy-deadline">{d.deadline:10}</td><td class="fancy-days"></td>'
        if d.is_guess:
            print(base + '<td class="fancy-is-guess">(?? THIS IS A GUESS)</td></tr>', file=OUTPUT_FILE)
        else:
            print(base+'<td></td></tr>', file=OUTPUT_FILE)

    def sep(self):
        print('<tr><td>-----</td><td>-----</td><td>-----</td><td>-----</td></tr>', file=OUTPUT_FILE)


class JSONFormatter:

    def begin(self):
        print('const deadline_info = [', file=OUTPUT_FILE)

    def end(self):
        print(']', file=OUTPUT_FILE)

    def entry(self, d):
        j = json.dumps(vars(d))
        print('\t' + j + ',', file=OUTPUT_FILE)

    def sep(self):
        pass


formatter = {
        'html': HTMLFormatter(),
        'text': NothingFormatter(),
        'json': JSONFormatter(),
}


# TODO: make it a command line input
# OUTPUT_FILE_PATH = './index.html'
OUTPUT_FILE_PATH = './deadline_info.js'
# OUTPUT_FILE_PATH = '-'

if OUTPUT_FILE_PATH == '-':
    OUTPUT_FILE = sys.stdout
    mode = 'text'
else:
    OUTPUT_FILE = open(OUTPUT_FILE_PATH, 'w')
    ext = os.path.splitext(OUTPUT_FILE_PATH)[-1]
    if ext == '.html':
        mode = ext
    elif ext == '.js':
        mode = 'json'
        import json
    else:
        mode = 'text'
fmt = formatter[mode]
print('output =', OUTPUT_FILE_PATH)
print('mode =', mode)


def time_to_ts(s):
    return time.mktime(time.strptime(s, '%d/%m/%Y'))


def get_closest_deadline(list_time):
    if isinstance(list_time, list):
        l = [time_to_ts(x) for x in list_time]
        min_index = 0
        min_value = math.inf
        for i, x in enumerate(l):
            if x < TODAY:
                continue
            if x < min_value:
                min_value = x
                min_index = i
        t = list_time[min_index]
    else:
        assert isinstance(list_time, str)
        t = list_time
    return t


def deadline_sort_criteria(info):
    abst_time = info.get('abstract_submission')
    if abst_time is None:
        t = math.inf

    x = get_closest_deadline(abst_time)
    t = time_to_ts(x)
    return t


def old_time_filter(info):
    abst_time = info.get('abstract_submission')
    x = get_closest_deadline(abst_time)
    t = time_to_ts(x)
    # print(t, '??', TODAY)
    if t < TODAY:
        return False
    return True


def report(c):
    d = Data()
    d.is_guess = c.get('guess', False)
    d.lbl = c.get('label', '???')
    deadline = c.get('abstract_submission', '25/02/1998')
    d.deadline = get_closest_deadline(deadline)
    ts = time_to_ts(d.deadline)
    d.days = int((ts - TODAY) // (24 * 3600))
    d.link = c.get('link', '#')

    fmt.entry(d)


def main():
    curdir = os.path.dirname(__file__)
    yaml_file = os.path.join(curdir, 'deadlines.yaml')
    with open(yaml_file, 'r') as f:
        deadlines = yaml.load(f, Loader=yaml.FullLoader)

    l = sorted(deadlines, key=deadline_sort_criteria)
    old = list(filter(lambda x: not old_time_filter(x), l))
    l = list(filter(old_time_filter, l))

    fmt.begin()
    for c in l:
        report(c)
    fmt.sep()
    old.reverse()
    for c in old:
        report(c)
    fmt.end()


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(e)
        OUTPUT_FILE.close()
