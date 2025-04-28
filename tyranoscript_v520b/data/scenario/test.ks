[cm]
[clearfix]
[start_keyconfig]
@hidemenubutton

*start
#
[current layer="message0"]
[er]
[resetfont]
@wait time=1500
[layopt layer="message0" visible="false" ]
[transit style="echo" text2="回响" text1="ɞːʈʰ˟ɞ̅ʈʐɻ̈˩̀" x=500 y=500]
[layopt layer="message0" visible="true" ]
[opt target=*g1]一个字[endopt][r]
[opt target=*g2]两个字[endopt]
[s]

*g1
[cm]
[grouplink style="grouplink default-opt" link=[["一","二","三","四"],["五","六","七","八","九"]] target=["*node1","*node2"]]
[s]

*g2
[cm]
[grouplink style="grouplink default-opt" link=[["第一","第二","第三","第四"],["第五","第六","第七","第八","第九"]] target=["*node1","*node2"]]
[s]

*node1
#
[er]
第一种选择支[l][r]
[opt target=*start]返回[endopt]
[s]

*node2
#
[er]
第二种选择支[l][r]
[opt target=*start]返回[endopt]

[s]