import sys
import json


def text2json(path, outfile='transcript.json'):
  output = []
  with open(path) as f:
    data = f.readlines()
    for n, line in enumerate(data, 1):
      try:
        arr = line.split('**')
        # Dict to be populated and returned
        item = {}
        arrLen = len(arr)
        if arrLen == 1:
          tmp = list(arr[0])
          if tmp[0] == '(':
            item['text'] = arr[0]
            output.append(item)
        elif arrLen == 2:
          item['timestamp'] = arr[0]
          item['text'] = arr[1]
          output.append(item)
        elif arrLen == 3:
          item['timestamp'] = arr[0]
          item['speaker'] = arr[1]
          item['text'] = arr[2]    
          output.append(item)
        else:
          raise Exception()
      except:
        print 'Error: {:2}.'.format(n), line.rstrip()        
  with open(outfile, 'w') as outfile:
    json.dump(output, outfile)

if __name__ == '__main__':
  # called by 'python txt2json.py <path>'
  text2json(sys.argv[1], sys.argv[2])