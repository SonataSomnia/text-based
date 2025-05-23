[cm]
[clearfix]
[start_keyconfig]
[chara_new name='w1' storage="../fgimage/chara/witch1.png" jname="witch1"]

@hidemenubutton
[bg storage="../bgimage/background.png" time=500 wait="false" ]
[button name="role_button" role="menu" graphic="button/menu.png" enterimg="button/menu_2.png"  x="915" y="0" time=500]
#




[current layer="message1"]

[er]


[resetfont]
在无边际的漆黑之中，你听到了[style name="echo"]声音[endstyle]。[l][r]
[buildflag name="test"]
[overlay name="echo" text="回响" lingua="ɐɨɸʰ˟ɐɚɸʂ"][l]
[claim]
[endflag]
虚无缥缈。[l]如梦似幻。[l][r]
像是乌云密布的夜空中若隐若现的白月。[l][r]
此刻，那月光正从云层中一点点倾出，向你轻声细语。[l][r]
她说：[l][r]
[style name="echo"]...世界已经失去了理解。[l][r]
我需要你的智慧。[l][r][endstyle]
[font color=0xff0000][afk]不要拯救我。[deafk][resetfont][l][r]
[opt target=*start]聆听[endopt][r]
[s]

*start

[current layer="message0"]
[layopt layer="message0" visible="true" ]
[layopt layer="message1" visible="false" ]
[cm]
...[l][r]
..[l][r]
.[p]


光滑地面的冰凉感是一种怀旧又新奇的独特感觉。[l][r]
新奇，因为你当然不大可能会在大庭广众之下趴在地上，感受它的温度。[l][r]
怀旧，因为在你的孩提时代，在你学会行走之前，这种感觉曾整日与你相伴。[l][r]
只是你把它忘了。[l]时间过去太久，久到你不再是孩子，一切童趣也被封装进记忆深处。[l][r]
但这冰凉感太过独特。它在你的感官系统里涌动着，激发你陈旧的回忆。[l][r]
……真的是这样吗？[l]你真的想起来了吗？[l][r]
还是说，那只是你的大脑为这份体验的存在找了一个合适的借口？[l][r]
毕竟，如果记忆是海滩上划下的文字，童年回忆肯定是最先被海浪冲刷干净的那批。[l][r]
你不信邪。你绞尽脑汁，誓要从脑海里挖出点什么来。[l][r]
你想起……[l][r]
@wait time=1000
你什么都没有想起。[l][r]
此时此刻，除了这份冰凉感以外——[l][r]
——你的回忆里空无一物。[l][r]
...[p]
你从一片漆黑中醒来，宛如刚刚经历过一场长梦。[l][r]
浑身酸痛，四肢麻木无力，[l]唯有那冷彻骨髓的感触，让你意识到自己正趴倒在地面上。[l][r]
寒冷刺激着你的神经，为你驱净脑海里的云翳。[l][r]
于是，你尝试着睁开眼睛。[l][r]
[image layer=0 storage="../image/background/corridor.png" time=500 x=80 width=800 y=40 height=800]
一条长廊映入眼帘。[l][r]
你很确定自己脑海里没有与这个地方相关的记忆。[l][r]
……不过那是理所应当的。你脑海里什么记忆也没有。[l][r]
你不清楚自己叫什么名字，也忘了自己之前在哪。[l][r]
自然，你没法知道这是哪里，你又为何身在此处。[l][r]
你从没想过回忆是这么痛苦的一件事。[l][r]
就像你脑子里有个上锁的保险箱，[l]而你赤手空拳，试图将它拆开。[l][r]
你踢了它一脚，绝望地发现它连晃都不晃一下。[l][r]
……还是放弃做无用功吧。[l][r]
看起来，你现在能做的事只有一件了。[l][r]
[opt target=*node1]探索四周[endopt][r]
[s]

*node1
#
[cm]
你用手扶着墙壁艰难起身。[l][r]
不知道是不是在地上趴了太久的缘故，你的身体有些僵硬，不听使唤。[l]你只能紧靠墙壁缓缓前行。[l][r]
不过这也意味着，你有充足的时间来确认自己的状态，或者是观察周围的环境。[l][r]
[opt target=*node2]看看自己[endopt][r]
[opt target=*node3]环顾四周[endopt][r]
[s]

*node2
#
[cm ]
[eval exp="f.p_n2=1" ]
你附近的墙壁光滑得足以映出你的倒影。[l][r]
[chara_show name='w1' top=200 left=20][l]
……看上去有些年轻。[l]哪怕以“少女”的标准来说，也显得过于娇小了。[l][r]
你扯了扯身上的黑色袍子。[l]质地柔软，上面有细腻的花纹。[l]看上去就很贵重。[l][r]
在你的胸口处挂着一支白色的羽毛笔。[l]你把它取下，在手心划了划。[l]没有留下任何痕迹。毕竟没有墨水。[l][r]
你摸了摸自己的脸颊。[l]比起稚嫩的触感，掌心的冰凉感反倒还更引人注意。[l][r]
你试着开口说话：[l][r]
;todo：dual+dialog
[dial]
[dual]
[style name="echo"]话。[endstyle][l][r]
[current layer="message0" ]
[narr]
[layopt layer="message1" visible="false" ]
如铃般清脆的声音在长廊里回荡。[l]除了回声之外，你没有得到任何回应。[l][r]
……这些行为真的能帮你认识自己从前是个怎样的人吗？[l][r]
你暂且把自己的迷茫埋藏在心里。[l][r]
[if exp="f.p_n3!=1"][opt target=*node3]环顾四周[endopt]
[else][opt target=*node4]继续前进[endopt]
[endif][r][s]
*node3
#
[cm ]
[eval exp="f.p_n3=1" ]
; 改一下
你抬起头，长廊的全貌尽收眼底。[l][r]
很奇妙的景象。[l]如果不是你的意识足够明晰，你甚至会以为自己还在梦里。[l][r]
墙面和地面是统一的灰色石质，上面没有一点装饰，光滑得甚至隐约能看到你自己的倒影。[l][r]
四周严丝合缝，不透一点光亮，长廊内部肉眼可及的地方也没有光源。[l][r]
神奇的是，你依然可以清晰地看见事物。[l][r]
视线放远，在你的正前方，长廊的尽头，有一扇紧闭的门。[l][r]
看起来那里就是你的目标了。[l][r]
[if exp="f.p_n2!=1"][opt target=*node2]看看自己[endopt]
[else][opt target=*node4]继续前进[endopt]
[endif][r][s]

*node4
#
[cm ]
你继续向前。[l][r]
经过一段时间的活动，[l][r]
最后，只剩走廊最后的这一扇门未经你探索了。[l][r]
[freeimage layer=0 time=500 ]
[image layer=0 storage="../image/background/corridor_door.png" time=500 x=80 width=800 y=40 height=800]
你尝试着推开大门。[l]但没什么效果。[l][r]
门像是和空间固定在了一起，纹丝不动。[l][r]
你注意到大门上贴着一张告示。[l][r]
[opt target=*key]阅读[endopt][r]
[s]


*key
[current layer="message1" ]
[layopt layer="message1" visible="true" ]
#
[er]
[buildflag name="dream"]
[style name="record-plain"]
入馆须知[l][r]
[overlay name="record" text="梦" lingua="ɨ̅ɟ̤ɱɒ"]的大图书馆，贮藏思念、映像和死去的回忆。[l][r]
进入本馆之前，请仔细阅读以下须知：[l][r]
一、不禁止明火、喧闹、携带食品入馆或占座，但请注意礼仪。如需要涂改或毁坏书籍，请征得著书者同意。[l][r]
二、如有阅读困难，请向管理员寻求帮助。[l][r]
三、如在[overlay name="record" text="梦" lingua="ɨ̅ɟ̤ɱɒ"]中迷失，误入馆中，请向管理员寻求帮助。[l][r]
四、本馆不限制借阅，借出书籍无需归还。本馆不对书籍内容负责。[l][r]
五、请勿将除书籍外的其他物品带出图书馆。[l][r]
六、禁止在馆中长时间停留或连续阅读多册书籍。具体限制因人而异，请咨询管理员。[l][r]
七、离馆之后[overlay name="record" text="梦" lingua="ɨ̅ɟ̤ɱɒ"]见书籍内容是正常现象，该症状通常会在物质世界三至五天后缓解。[l][r]
另：请参与星沙试炼的魔女相互转告：欢迎你们来找管理员聊天，但我真的不知道你们每个人的题目，求求别再问了。[l][r]
[endstyle]
[current layer="message0"]
...[l][r]
你揉了揉眼睛，确认自己没看错。[l][r]
告示里有一个奇怪的符号。[l]你很确信自己不认识它。[l][r]
但它如此自然地混在其他文字里，以至于你差点怀疑自己脑子出了问题。[l][r]
……虽然失忆也算是出问题就是了。[l][r]
总而言之，考虑到告示上面写着“进入本馆之前，请仔细阅读以下须知”……[l]不会是说，要你搞懂了这些符号是什么意思，这门才能打开吧？[l][r]
虽然有点莫名其妙，但你呆在这儿也没别的事干，还是动动脑子好了。[l][r]
仔细读了读告示之后，你觉得这个符号的意思是……[l][r]
[opt target=*solve]阐明[endopt]
[s]

*solve
[er]
[grouplink style="grouplink default-opt" link=[["梦"],["想"],["望"],["重","再"],["幻","忆"]] target=["*solve1","*solve2","*solve3","*solve4","*solve5"]]
[s]

*solve1
[er]
[layopt layer="message0" visible="false"]
[transit style="record" text1="ɨ̅ɟ̤ɱɒ" text2="梦" x=1440 y=440]
[layopt layer="message0" visible="true"]
[claim]
[endflag]
告示上的符号“溶解”了。[l][r]
你很难找出别的词来形容。[l]你确信那是用墨水书写在纸张上的一笔一划，但它就是令人难以置信地改变了形状。[l][r]
如月溶于夜幕，如日升于苍穹。取代陌生的图腾，你所熟悉的记号从它的残余中浮现。[l][r]
……梦。[l][r]
刚才那一幕确实挺梦幻的。[l][r]
但你伸手捏了捏自己的脸，[l]很痛。[l][r]
真的会有感触如此真实的梦境吗？[l][r]
而且，你的思考也依然清晰，不像是在做梦。[l][r]
……信息量还是太少了。[l][r]
无论如何，既然你已经看懂了告示，这门大概是能打开了吧？[l][r]
如果那上面写的东西真实有效，门背后理应存在着一个所谓的“管理员”。[l]对方应该能解答你的疑惑。[l][r]
[opt target=*node5]推门[endopt]


[s]
*solve2
[er]
[count name="p_s2"]
@jump cond="f.p_s2!=1" target="*solve_n"  
嗯……“想”吗……[l][r]
怎么说呢，感觉稍微有点抽象了，不是吗？[l][r]
你很难想到怎么在这种东西里“迷失”。[l][r]
应该有更合适的字。[l][r]
@jump target="*solve" 


*solve3
[er]
[count name="p_s3"]

[jump cond="(f.p_s3!=1)&&f.p_s3!=7" target="*solve_n"]
[if exp="f.p_s3==7"]
就这么念念不忘吗？你还真是有点“在‘望’中迷失”了呢。[l]
[else]
嗯……“望”吗……[l][r]
“望见书籍内容”是不是有点离谱了？[l][r]
感觉挺无厘头的，你不太清楚自己为什么会想到这个。[l][r]
应该有更合适的字。[l][r]
[endif]
@jump target="*solve" 



*solve4
[er]
[count name="p_s4"]
@jump cond="f.p_s4!=1" target="*solve_n" 
嗯……如果用来修饰“见”这个字的话，倒是挺通顺的。[l][r]
但是前两处不太对啊。[l]而且也没什么逻辑性。[l][r]
应该有更合适的字。[l][r]
@jump target="*solve" 


*solve5
[er]
[count name="p_s5"]
@jump cond="f.p_s5!=1" target="*solve_n" 
嗯……感觉哪里不对，读起来磕磕绊绊的。[l][r]
意思上应该差不多。[l]但是没有人会这样说话吧。大概。[l][r]
应该有更合适的字。[l][r]
@jump target="*solve" 


*solve_n
[rnd n=5]
[if exp="tf.rnd==1"]
……刚才是不是考虑过这个字了？没有吗？[l][r]
你感觉脑子有点乱乱的。[l][r]
[elsif exp="tf.rnd==2"]
嗯……感觉哪里不对，刚才应该有想到过类似的吧？[l][r]
[elsif exp="tf.rnd==3"]
这个字刚才是不是分析过了？没有吗？[l][r]
你感觉脑子有点乱乱的。[l][r]
[elsif exp="tf.rnd==4"]
你产生了一种奇妙的既视感，仿佛就在上一刻，与现在完全一致的想法曾从你的脑海中流过。[l][r]
那大概不是错觉。[l][r]
你有点起鸡皮疙瘩。[l]为了摆脱这种感觉，你决定重新、仔细想一遍。[l][r]
[else]
嗯……对吗？[l][r]
感觉不是很吻合，应该有更合适的字。[l][r]
[endif]
@jump target="*solve" 


*node5
#

[freeimage layer=0 time=500 ]
[cm]
[mtext text="第一章" size=30 x=220 y=200 in_effect="fadeIn" out_effect="fadeOut" time=500 wait=true]



你本以为自己会跌在地上。[l][r]
...但是并没有。一股奇异的力量支撑着你，令你维持着身体前倾的姿势。[l][r]
你尚未反应过来是怎么回事，耳边却先有声音响起：[l][r]
[font color=0xff00ff]别紧张。[resetfont][l][r]
你抬起头。[p]
[playbgm storage=into_the_dream.ogg]
[bg storage=library_entry.jpg ]
[chara_show name='w1' top=10 left=10][l]
[cm]
虽然你什么也看不见，但你勉强能听出声音的主人是一名少女。[l][r]
[font color=0xff00ff]没事吧？先坐下来平复一下心情吧。[resetfont][l][r]
你听见她的双手挥动。[l]接着，你感到那股神秘的力量推着你向后倒去。[l][r]
你一时有些慌张。[l][r]
但很快，臀部和后背便传来坚实的触感。[l][r]
...看来她给你找了把椅子。[l][r]
你这时才有机会...“观察”你此刻所处的环境。[l][r]
空间十分宽广，声音可以传出很远。[l]空气中充斥着纸张和油墨的气味。[l]...虽然你大概也无法描述那到底是怎样一种味道，但至少它给你带来这样的印象。[l][r]
[font color=0xff00ff]冷静下来了吗？[resetfont][p]
似乎发觉了你正在“东张西望”，少女向你搭话。[l][r]
你听到轻轻的一声响，似乎是她坐在了你的对面。[l][r]
[font color=0xff00ff]那么，开始试炼吧。[resetfont][l][r]
...[l][r]
？[l][r]
你请求她再说一遍。[l][r]
[font color=0xff00ff]哎呀，有什么问题吗？[resetfont][l][r]

[font color=0xffff00][mark color=0x0000ff]
[link target=*chap1_c13]是不是有什么误会？[endlink][r]
[resetfont][endmark]
[s]

*chap1_c13
#
[cm]
[font color=0xff00ff]咦？你不是来参加试炼的？[resetfont][l][r]
你告诉她自己莫名其妙地就到了这里。[l][r]
[font color=0xff00ff]可是按理来说，只有来参加星沙试炼的魔女才会到我这里来。[l]而且，你是不是现在眼睛看不见了？[resetfont][l][r]
你点头。[l][r]
[font color=0xff00ff]那没错啊？[resetfont][l]她的声音里带着困惑，[font color=0xff00ff]典型的第一次进来的魔女的反应。[resetfont][l][r]

[font color=0xffff00][mark color=0x0000ff]
[link target=*chap1_c14]可是我不是魔女，也不知道什么试炼。[endlink][r]
[resetfont][endmark]
[s]

*chap1_c14
#
[cm]

[font color=0xff00ff]我还是第一次遇到这种情况……[l]那，你是怎么到这里来的？[resetfont][l][r]
她向你反问道。[l][r]
你或许对自己来到这里的缘由一无所知。[l]但是，从你的记忆里，从你对某些事情的模糊印象里，或者，从你的直觉里，[l]你都可以获得些许有关真相的蛛丝马迹。[l][r]
可要不要信任面前这位魔女则是另一个问题。[l]或许，有些事情不应该让她知晓。[l]具体该如何回答，选择权在你自己手上。[l][r]
[font color=0x000000][mark color=0xffffff]
[link target=*chap1_c17]告诉她你毫无头绪[endlink][r]
[link target=*chap1_c16]只告诉她关于身体的异常[endlink][r]
[link target=*chap1_c15]告诉她所有你能说的[endlink][r]
[resetfont][endmark]
[s]

*chap1_c15
#
[cm]

你把来这里的过程中所经历的全部告诉了她，包括身体上感到的违和和朦胧中听到过的低语，以及一个你的“猜想”。[l][r]
[font color=0xff00ff]你难道想说……这具身体不是你的？[resetfont][l]她似乎感到难以置信，[l][font color=0xff00ff]还什么“我需要你的智慧”，该不会是哪个魔女怕自己星沙考不过找人代考……我想也不太可能。[resetfont][l][r]
你摇头。她刚才是不是说了个笑话？[l][r]
[font color=0xff00ff]嗯……虽然这样也勉强说得通？不过你确定自己不是魔女，也没有和魔女扯上关系的记忆？[resetfont][l][r]
你表示自己完全不知道什么魔女。[l][r]
[font color=0xff00ff]好吧……虽然不知道本该参加试炼的魔女到底打着什么算盘，但现在还是想想该怎么把你送回去吧……[resetfont][l][r]
[jump target=*chap1_c18]
[s]

*chap1_c16
#
[cm]

你告诉了她关于身体感觉的异常。[l][r]
[font color=0xff00ff]你是说，你觉得自己变小了？[resetfont][l]她好像挠了挠头，[l][font color=0xff00ff]呃，我可能明白了。[resetfont][l][r]
你请她继续说下去。[l][r]
[font color=0xff00ff]之前不是说过，第一次来的魔女都会有某种“症状”吗？[l]其实之前也有过身体变小的例子……可是这样的话你身上还有失明和失忆的现象，加起来就三个了……[resetfont][l][r]
你觉得自己并没有失忆。[l]不过，你对这个所谓的“症状”很感兴趣，希望她能解释一下。[l][r]
[font color=0xff00ff]怎么说呢……这不是“试炼”吗？那就相当于考题的一部分啦，要求你在受到某些限制的条件下完成任务。[l]不过，三种限制的难度我也是第一次见……这是不是说明你的[ruby text="拉卡"]司[ruby text="契亚"]职特别强？[resetfont][l][r]
[font color=0xffff00][mark color=0x0000ff]
[link target=*chap1_c19]拉卡契亚？[endlink][r]
[resetfont][endmark]
[s]

*chap1_c17
#
[cm]
[font color=0xff00ff]这样啊……[resetfont][l]她大概看得出你有所保留，但还是表示理解，[l][font color=0xff00ff]那姑且不论你是怎么来的，现在应该思考怎么把你送回去吧……[resetfont][l][r]

*chap1_c18
#
确实。你对此表示肯定。那么该怎么出去呢？[l][r]
[font color=0xff00ff]呃，最简单的办法……[resetfont][l]她欲言又止，但还是继续说道，[l][font color=0xff00ff]……就是通过试炼。[resetfont][l][r]
……仔细想想，确实。你对此表示肯定。那么该怎么通过试炼呢？[l][r]
[font color=0xff00ff]虽然你说自己不是魔女……但是这个东西本身就是为魔女设计的，[l]所以还是只能就按照原来的流程来。不过别担心，要是有什么“严重的错误”发生了的话，[resetfont][l]她眨了眨眼睛，[font color=0xff00ff]我会帮你解决的！[resetfont][l][r]
[font color=0xffff00][mark color=0x0000ff]
[link target=*chap1_c20]好吧，那么试炼的具体内容是？[endlink][r]
[resetfont][endmark]
[s]

*chap1_c19
#
[cm]
[eval exp="f._rakatia=1"]
[font color=0xff00ff]拉卡契亚……你就理解成魔女的某种特殊能力就好了。[resetfont][l]她楞了一下，似乎本想长篇大论，但看你一脸懵懂的样子还是决定一笔带过，[l][font color=0xff00ff]虽然你说自己不是魔女……不过我认为这应该也是试炼的限制，所以你应该也是有拉卡契亚的。[resetfont][l][r]

[font color=0xffff00][mark color=0x0000ff]
[link target=*chap1_c20]好吧，那么试炼的具体内容是？[endlink][r]
[resetfont][endmark]
[s]

*chap1_c20
#
[cm]
[font color=0xff00ff]试炼……简单来说就是在这个场地里找到出口。[resetfont][l][r]
...你的第一反应是回头去摸背后那扇门。[l][r]
然而，你却摸到了一排书籍。[l]不管你怎么向周围摸索，都找不到有门存在的迹象。[l]取而代之的是高大的书架。[l][r]
[font color=0xff00ff]哎呀，看来试炼已经开始了呢。[resetfont][l]她似乎挺坏心眼地笑了，[l][font color=0xff00ff]这间图书馆是暧昧的存在，能够跨越逻辑与幻想……[l][r]
这就是开始前的提示了。[l]不管使用什么手段，只要找到了出口就行。[l][r][resetfont]
[chara_hide name="w1" ]
她起身走到不远处坐下。……那大概是某个类似图书馆前台的位置？[l][r]
[font color=0xff00ff]顺带一提，这个东西是没有时间限制的，也没有放弃的选项。我就坐在这里，有问题随时来找我，加油！[resetfont][l][r]
……总觉得十分不靠谱。[font color=0xffff00]之前的魔女没有试炼失败过或者放弃之类的吗？[resetfont][l][r]
[font color=0xff00ff]嗯……怎么说呢？[l]如果图书馆认为你试炼失败了，会自动把你踢出去的。不过判定的标准我也不是很清楚啦。[l]而且这个东西很简单的，我觉得比起想着怎么放弃，还是直接通关比较快。[resetfont][l][r]
……好吧。那姑且尝试一下吧。[l][r]

[font color=0x000000][mark color=0xffffff]
[link target=*chap1_c21]开始试炼[endlink][r]
[resetfont][endmark]
[s]

*chap1_c21
#
[cm]
等！