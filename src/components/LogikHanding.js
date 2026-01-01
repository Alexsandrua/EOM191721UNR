import Db from './Db';

export default class LogikHanding {
constructor() {
    this.symbol = ['and', 'or', 'not',  'nand', 'nor',  'xor',  'xnor', 'sub','add','mul','div'];
    this.biN = {'_1': 1, '_0': 0};
    this.lineAllAr = {};
    this.sortToArLine(Db.getPpzAll());
    console.log(' :', this.lineAllAr)
    this.bitZero = [];
    for(let g = 0; g < 10000; g++) this.bitZero.push('_0');
    this.sortMatch();
  }
  
 sortToArLine (data) {
  let i = 1, j = 1;
  let block = {};
  let nRom = false;
  block['bin' + i] = [];
  data.map((arr) => {
  arr.map((ars) => {
   ars.map((e) => {
    if(e !== 'empty')
    if(e === '_1' || e === '_0') {
     block['nRom'] ? block['nRom'].push(e) : block['bin' + i].push(e);
    } else if(e !== 'END') {
        block[e] = e;
        if(e !== '&i' && e !== '&o' ){
        i++;
        block['bin' + i] = [];
        }
        if(e === '&o'){
          !block['oRom'] && (block['oRom'] = []);
          block['oRom'].push(i);
        }
        if(e === '&i')  block['nRom'] = [] ;
    } else {
      if(block['bin2'] && !block['bin2'].length) delete block['bin2'];
        block[e] = e;
        this.lineAllAr['lineO' + j] = block;
        j++;
        block = {};
        i = 1
        block['bin' + i] = [];
      }
    
  });
 })
 })
}
 
  sortMatch () {
  let swich = 1;
   for(let s in this.lineAllAr) {
   swich = 1;
     this.symbol.map((act) => {
       if(this.lineAllAr[s][act] && this.lineAllAr[s]['&i']) {
         switch (act) {
           case 'and':
           this.and (this.lineAllAr[s]);
           break;
           case 'or':
           this.or (this.lineAllAr[s]);
           break;
           case 'not':
           this.not (this.lineAllAr[s]);
           break;
           case 'nand':
           this.nand (this.lineAllAr[s]);
           break;
           case 'nor':
           this.nor (this.lineAllAr[s]);
           break;
           case 'xor':
           this.xor (this.lineAllAr[s]);
           break;
           case 'xnor':
           this.xnor (this.lineAllAr[s]);
           break;
           case 'add':
           this.add (this.lineAllAr[s]);
           break;
           case 'sub':
           this.sub (this.lineAllAr[s]);
           break;
           case 'mul':
           this.mul (this.lineAllAr[s]);
           break;
           case 'div':
           this.div (this.lineAllAr[s]);
           break;
        }
         swich = 0;
         return;
       }
     })
       if(swich && this.lineAllAr[s]['&i']) {
         this.ppsInput(this.lineAllAr[s]);
       } 
   }
 }
 
 and (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push(data['bin1'][i] === '_1'&& data['bin2'][i] === '_1'? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
 
  or (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push(data['bin1'][i] === '_1'|| data['bin2'][i] === '_1'? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
 
   not (data) {
   data['oRom'] && (data['bin1'] = Db.getOpMem(data['bin1']));
     let res = [];
     data['bin1'].map((i) => {
       res.push(i === '_1'? '_0' : '_1');
   });
   data['res'] = res;
   this.ppsInput (data)
 }
 
    nand (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push((data['bin1'][i] === '_0' && data['bin2'][i] === '_0') || (data['bin1'][i] !== data['bin2'][i])? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
 
    nor (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push(data['bin1'][i] === '_0' && data['bin2'][i] === '_0'? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
 
   xor (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push(data['bin1'][i] !== data['bin2'][i]? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
 
   xnor (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let l = data['bin1'].length;
     l > data['bin2'].length? l: l = data['bin2'].length;
     for(let i = 0; i < l; i++) {
       res.push((data['bin1'][i] === '_0' && data['bin2'][i] === '_0') || (data['bin1'][i] === '_1' && data['bin2'][i] === '_1')? '_1' : '_0');
     }
   
   data['res'] = res;
   this.ppsInput (data)
 }
  
   add (data) {
     if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
     let res = [];
     let simar = this._toDoSimArLeng(data['bin1'], data['bin2']);
     data['bin1'] = simar.arr1;
     data['bin2'] = simar.arr2;
     let carry = '';

     for(let i = data['bin1'].length - 1; i >= 0; i--) {
       if(data['bin1'][i] !== data['bin2'][i]) {
         if(carry === '_1') {
           if(data['bin1'][i] === '_0'){
             if(data['bin2'][i] === '_0') {
                res.unshift('_1')
                } else {
                  res.unshift('_0');
                  carry = '_1';
                }
           } else {
             if(data['bin2'][i] === '_0') {
                res.unshift('_0')
                carry = '_1'
                } else {
                  res.unshift('_1');
                  carry = '_1';
                }
           }
         } else res.unshift('_1');
         
       } else {
         if(data['bin1'][i] === '_1' && data['bin2'][i] === '_1') {
            carry === '_1'? res.unshift('_1'):  res.unshift('_0');
            carry = '_1'
         } else {
            carry === '_1'? res.unshift('_1'): res.unshift('_0');
            carry = '';
         }
       }
     }
   if(carry === '_1') res.unshift('_1');
   data['res'] = res;
   this.ppsInput (data);
 }
 
  comparison(compare1, compare2, type) {
    
   // 'greater than >'
   // 'less than <'
   if(compare1.length !== compare2.length) {
     if(type === '>') return compare1.length > compare2.length
     else if(type === '<') return compare1.length < compare2.length
   } else {
     for(let i = 0; i < compare1.length; i++) {
       if(type === '>')
         if(this.biN[compare1[i]] > this.biN[compare2[i]]) return true;
         else if(compare1[i] === '_0' && compare1[i] !== compare2[i] && !(this.biN[compare1[i]] > this.biN[compare2[i]]))
         return false;
       else if(type === '<') 
         if(this.biN[compare1[i]] < this.biN[compare2[i]]) return true;
         else if(compare1[i] === '_1' && compare1[i] !== compare2[i] && !(this.biN[compare1[i]] < this.biN[compare2[i]]))
         return false;
     }
   }
   return true;
  }
  
  convertBinToDec(bin) {
    let dec = 0;
    let pw = 0;
    for(let i = bin.length - 1; i >= 0; i--) {
      if(bin[i] === '_1') {
        dec += Math.pow(2, pw);
      }
      pw++;
    }
  return dec;
 }
 
  _toDoSimArLeng(arr1, arr2) {
     if(arr1.length !== arr2.length){
       let l = arr1.length;
       l > arr2.length? l: l = arr2.length;
       for(let i = 0; i < l; i++) {
         if(arr1.length < arr2.length) {
           !arr1[i] && arr1.unshift('_0');
         } else {
           !arr2[i] && arr2.unshift('_0')
         }
       }
    }
    return {arr1, arr2};
 }
 
  _borrow(inx, a) {
    for(let i = inx ; i >= 0; i--) {	
      if(inx === i && a[i] === '_0') {
        a[i] = 2;
       } else if(a[i] == '_0') {
         a[i] = '_1';
       } else {
         a[i] = '_0';
         break;
       }
     }
     return a;
 }
 
  sub(data) {
   if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
   let resSub = [];
   let a, b, negative;
   let simar = this._toDoSimArLeng(data['bin1'], data['bin2']);
   data['bin1'] = simar.arr1;
   data['bin2'] = simar.arr2;
   this.convertBinToDec(data['bin1']) > this.convertBinToDec(data['bin2'])? (a = data['bin1'], b = data['bin2']) : (a = data['bin2'], b = data['bin1'], negative = '|-|');
   for(let i = a.length - 1; i >= 0; i--) {
     if(a[i] === '_0' && b[i] !== '_0' && i !== '_0' && b[i] !== 'x') {
       a = this._borrow(i, a);
       resSub.unshift('_1');
     } else if(a[i] === '_0' && b[i] === '_0') {
       resSub.unshift('_0');
     } else if(a[i] === '_1' && b[i] === '_1') {
       resSub.unshift('_0');
     } else if(a[i] === '_1' && b[i] === '_0') {
       resSub.unshift('_1');
     } else if(a[i] === '_0' && b[i] === 'x') {
       resSub.unshift('_0');
     }
  }
  negative && resSub.unshift(negative);
  data['res'] = resSub;
  this.ppsInput (data);
}

  mul (data) {
  if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }
    let res = ['mul'];
    let resMul = [];

    let ix = 0;
  for(let i = data['bin2'].length - 1; i >= 0; i--) {
   resMul[ix] = [];
     for(let j = data['bin1'].length - 1; j >= 0; j--) {
       if(data['bin2'][i] === '_0') {
         resMul[ix].unshift('_0');
       } else if(data['bin2'][i] === '_1') {
         if(data['bin1'][j] === '_0')
           resMul[ix].unshift('_0');
         else if(data['bin1'][j] === '_1')
           resMul[ix].unshift('_1');
       }
   }
   ix++;
}

  let iadd = 0;
  let a = 0, b = 1;

  for(let f = 0; f < resMul.length; f++){
    if(f != 0)
      resMul[f].push(...this.bitZero.slice(0, f));
    }

  do {
    a != 0 && b != 1? (a++, b++): 0
    if(!resMul[a] || !resMul[b]) break;
    this.add ({'bin1': resMul[a],'bin2': resMul[b], 'nRom': ['_0','_1']})
    resMul[resMul.length] = this.ppsOutput(['_0','_1']);
    this.ppsDelete(['_0','_1']);
    a++; b++;
    if(!resMul[a] || !resMul[b]) break;
  } while(a < resMul.length)
  
  data['res'] = resMul[resMul.length - 1];
  data['res'].push('M') // delete
  this.ppsInput (data)
}

  div (data) { 
    if(data['oRom']) {
       data['oRom'][0] && (data['bin1'] = Db.getOpMem(data['bin1']));
       data['oRom'][1] && (data['bin1'] = Db.getOpMem(data['bin1']));
     }  
    let sub1 = [data['bin1'][0]], sub2 = [], res = ['div'], divRes = [];
    let i = 0;
    do{
    if(this.comparison(sub1, data['bin2'], '>')) {
    // sub1 - sub2
      sub2 = data['bin2'];
      this.sub ({'bin1': sub1,'bin2': sub2, 'nRom': ['_1','_1']});
      sub1 = this.ppsOutput(['_1','_1']);
      sub1.push(data['bin1'][0])
      this.ppsDelete(['_1','_1']);
      divRes.push('_1');
    } else {
      sub2 = ['_0'];
      this.sub ({'bin1': sub1,'bin2': sub2, 'nRom': ['_1','_1']});
      sub1 = this.ppsOutput(['_1','_1']);
      sub1.push(data['bin1'][i])
      this.ppsDelete(['_1','_1']);
      divRes.push('_0');
    }
      i++
    } while(i < data['bin1'].length)
    
    data['res'] = divRes;
    data['res'].push('D') // delete
    this.ppsInput (data)
 }
 
    ppsInput (payload) {
      let data = payload['res'] ? payload['res']: payload['bin1'];
      Db.setOpMem (payload['nRom'], data)
    //pps[payload['nRom']] = payload['res'] ? payload['res']: payload['bin1'];
 }
 
  ppsOutput(id) {
    return Db.getOpMem (id)
    //return pps[id];
 }
 
  ppsDelete(id) {
    Db.deleteOpMem(id)
    //delete pps[id];
 }
}

const _symbolState = {
             'operation':{
               'empty':'\u2205',
               '&i':'&i', 
               '&o': '&o',
               'END': 'END',
             },
             'binary':{
               '_0': 0,
               '_1': 1,
             },
             'logical':{
               'not': 'НІ',
               'and': 'I',
               'or': 'АБО',
               'xor': 'І-НІ',
               'nor': 'АБО-НІ',
             },
             'arithmetic':{
               'subtraction':'-', 
               'addition':'+', 
               'multiplication':'*', 
               'division':'/',
             },
        };
