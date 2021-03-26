import json
import random
from gtts import gTTS
import os

with open("parties.txt", encoding="utf-8") as f:
	fread = f.read()

dictionary = {"": {}}


for i in range(len(fread)):
	if i >= len(fread)-1:
		break
	dictionary[""][fread[i]] = dictionary[""].get(fread[i]) or 1
	dictionary[""][fread[i]] += 1


	dictionary[fread[i]] = dictionary.get(fread[i]) or dict()
	dictionary[fread[i+1]] = dictionary.get(fread[i+1]) or dict()
	dictionary[fread[i]][fread[i + 1]] = dictionary[fread[i]].get(fread[i + 1]) or 1
	dictionary[fread[i]][fread[i + 1]] += 1


# for i in dictionary.keys():
# 	cres = 0
# 	for j in dictionary[i].keys():
# 		cres += dictionary[i][j]
# 	for j in dictionary[i].keys():
# 		dictionary[i][j] /= cres
	
def next(char):
	return random.choices(list(dictionary[char].keys()), weights=tuple(dictionary[char].values()))[0]

with open("data.json", "w", encoding="utf-8") as f:
	json.dump(dictionary, f, sort_keys=True, ensure_ascii=False)


cchar = ""
cchars = []
for i in range(10000):
	try:
		cchar = next(cchar)
		#print(cchar, end="")
		cchars.append(cchar)
	except:
		break

cchars = list(sorted(set("".join(cchars).split("\n"))))

gTTS(text=random.choice(cchars), lang="de", slow=True).save("welcome.mp3")
os.system("mpg321 welcome.mp3")


with open("saves.txt", "w", encoding="utf-8") as f:
	for cchar in sorted(cchars, key=lambda x: len(x)):
		print(cchar, file=f)