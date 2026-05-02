class Resource {
  constructor() {
  }

  punchCard() {
    let data = [];
    for (let i = 0; i < 11; i++) {
      data[i] = [];
      for (let j = 0; j < 79; j++) { // 79
        data[i].push('empty');
      }
    }
    return data;
  }

  className = {
    swichManual: {
      eSwichMAll: 'eSwichMAll',
      eSwichMLeftDown: 'eSwichMLeftDown',
      eSwichMLeftTop: 'eSwichMLeftTop',
      eSwichMLeftRight: 'eSwichMLeftRight',
      eSwichMRightTop: 'eSwichMRightTop',
      eSwichMRightDown: 'eSwichMRightDown',
      eSwichMTopDown: 'eSwichMTopDown',
    },
    transistor: {
      eTransistorRightTopDown: 'eTransistorRightTopDown',
      eTransistorRightLeftDown: 'eTransistorRightLeftDown',
      eTransistorRightDownTop: 'eTransistorRightDownTop',
      eTransistorRightLeftTop: 'eTransistorRightLeftTop',
      eTransistorLeftTopDown: 'eTransistorLeftTopDown',
      eTransistorLeftRightDown: 'eTransistorLeftRightDown',
      eTransistorLeftDownTop: 'eTransistorLeftDownTop',
      eTransistorLeftRightTop: 'eTransistorLeftRightTop',
      eTransistorRightTopLeft: 'eTransistorRightTopLeft',
      eTransistorRightDownLeft: 'eTransistorRightDownLeft',
      eTransistorTopRightDown: 'eTransistorTopRightDown',
      eTransistorTopLeftDown: 'eTransistorTopLeftDown',
    },
    conductor: {
      eConductorAll: 'eConductorAll',
      eConductorLeftDown: 'eConductorLeftDown',
      eConductorLeftTop: 'eConductorLeftUp',
      eConductorLeftRight: 'eConductorLeftRight',
      eConductorRightTop: 'eConductorRightUp',
      eConductorRightDown: 'eConductorRightDown',
      eConductorTopDown: 'eConductorUpDown',
    }
  }

  old_symbolState = {
    'empty': '\u2205',
    '_&o': '_&o',
    '_&s': '&s',
    '_|END|': '|END|',
    '_0': 0,
    '_1': 1,
    'not': 'НІ',
    'and': 'I',
    'or': 'АБО',
    'xor': 'І-НІ',
    'nor': 'АБО-НІ',
    'subtraction': '-',
    'addition': '+',
    'multiplication': '*',
    'division': '/',
  }

  symbolState = {
    'operation': {
      'empty': '\u2205',
      '&i': '&i',
      '&o': '&o',
      'END': 'END',
    },
    'binary': {
      '0': 0,
      '1': 1,
    },
    'logical': {
      'not': 'НІ',
      'and': 'I',
      'or': 'АБО',
      'xor': 'І-НІ',
      'nor': 'АБО-НІ',
    },
    'arithmetic': {
      'sub': '-',
      'add': '+',
      'mul': '*',
      'div': '/',
    },
  }

  symbolStateList = {
    'empty': '\u2205',
    '&i': '&i',
    '&o': '&o',
    'END': 'END',
    '0': 0,
    '1': 1,
    'not': 'НІ',
    'and': 'I',
    'or': 'АБО',
    'xor': 'І-НІ',
    'nor': 'АБО-НІ',
    'sub': '-',
    'add': '+',
    'mul': '*',
    'div': '/',
  }

  symbolRevers = {
    '\u2205': 'empty',
    '&i': '&i',
    '&o': '&o',
    'END': 'END',
    0: '0',
    1: '1',
    'НІ': 'not',
    'I': 'and',
    'АБО': 'or',
    'І-НІ': 'xor',
    'АБО-НІ': 'nor',
    '-': 'sub',
    '+': 'add',
    '*': 'mul',
    '/': 'div',
  }

  helps = {
    ruls: {
      "title": "Приклад використовування.",
      1: "Знак пуста комірка ('\u2205'empty')  - ігнорується",
      2: "Знак памʼять ('&i')  - зберігає результат.",
      3: "Знак памʼять ('&o')  - виводить результат.",
      4: "Кінець команди - END",
      5: "0 або 1,- значення біта",
      6: "Операції — НІ, I, АБО, І-НІ, АБО-НІ,*, /, +, -",
      "ruls": "Правила",
      '1r': "(значення) операція (значення)запис в памʼять (адреса памʼяті)END",
      '2r': "Запис значення можна брати з памʼяті - &o(адреса памʼяті)"
    },
  }

  meny = {
    "Punch card": "Перфокарта",
  }

  configs = {
    idCardServer:'',
  }
}

export default Resource = new Resource()
