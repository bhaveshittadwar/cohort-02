/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
  if(str1.length != str2.length) return false;
  let dum1 = str1.toLowerCase().split('').sort().join('');
  let dum2 = str2.toLowerCase().split('').sort().join('');
  for(let i = 0; i < str1.length; i++) {
    console.log('res: ', dum1.charAt(i) != dum2.charAt(i))
    if(dum1.charAt(i) != dum2.charAt(i)) return false;
  }

  return true;
}

module.exports = isAnagram;
