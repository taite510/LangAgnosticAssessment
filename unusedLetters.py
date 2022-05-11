# Given a string of English letters, write a function that returns all the letters of the alphabet that are unused.

# For example the string “A slow yellow fox crawls under the proactive dog" would return "bjkmqz" since none of those letters are used.

# The string “A quick brown fox jumps over the lazy dog” would return “” since all of the English letters are in that sentence.

def findUnusedLetters(s) :
  letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  i = 0
  length = len(letters)
  # loop through each letter in the letters array
  while i < length :
    letter = letters[i]
    # if the letter is found in the string, remove that letter from the letters array
    if letter in s :
      letters.remove(letter)
      length -= 1
    else :
      i += 1
  # join the letters array into a string and return said string
  return ''.join(letters)


# should both return true
findUnusedLetters('A quick brown fox jumps over the lazy dog') == ''
findUnusedLetters('A slow yellow fox crawls under the proactive dog') == 'bjkmqz'