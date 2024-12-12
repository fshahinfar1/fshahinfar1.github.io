#!/usr/bin/python3
import os
import sys
import yaml
import math
import time
from termcolor import colored


TODAY = time.time()

OUTPUT_FILE = open('./index.html', 'w')

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
        print('</table></body></html>', file=OUTPUT_FILE)

    def entry(self, d):
        base = f'<tr><td class="fancy-lbl">{d.lbl:10}:</td><td class="fancy-deadline">{d.deadline:10}</td><td class="fancy-days">[{d.days} days]</td>'
        if d.is_guess:
            print(base + '<td class="fancy-is-guess">(?? THIS IS A GUESS)</td></tr>', file=OUTPUT_FILE)
        else:
            print(base+'<td></td></tr>', file=OUTPUT_FILE)

    def sep(self):
        print('<tr><td>-----</td><td>-----</td><td>-----</td><td>-----</td></tr>', file=OUTPUT_FILE)


formatter = {
        'html': HTMLFormatter(),
        'text': NothingFormatter(),
}
terminal = OUTPUT_FILE == sys.stdout
fmt = formatter['terminal' if terminal else 'html']


class Item:
    @classmethod
    def from_dict(cls, d):
        o = Item()
        pass

    def __init__():
        self.type = None
        self.abstract_submission = None
        self.fullname = None
        self.label = None


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
    except:
        close(OUTPUT_FILE)
