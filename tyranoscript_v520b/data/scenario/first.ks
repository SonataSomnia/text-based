*start

[macro name="afk"]
    [delay speed=500][message_config ch_speed_in_click="default"]
[endmacro]

[macro name="deafk"]
    [message_config ch_speed_in_click=0][resetdelay]
[endmacro]


[macro name="opt"]
    [block name=%name|default-opt]
    [link target=%target]
[endmacro]

[macro name="endopt"]
    [endblock]
    [endlink]
[endmacro]

[macro name="buildflag"]
    [iscript]
        if(f[mp.name]==null){
            f[mp.name]=0;
            }
        if(sf.current_flag==null||sf.current_flag==0){
            sf.current_flag=mp.name;
        }      
    [endscript]
[endmacro]

[macro name="endflag"]
    [iscript]
        sf.current_flag=0;
    [endscript]
[endmacro]

[macro name="overlay"]
    [resetfont]
    [if exp="f[sf.current_flag]==1"]
        [block name=%name|default][emb exp="mp.text"][endblock]
    [endif]
    [if exp="f[sf.current_flag]==0"]
        [iscript]
            if(mp.name==null){mp.name="default";}
            f.temp_class_name=mp.name;
            mp.name=f.temp_class_name+" stasis";
        [endscript]
        [block name=%name][emb exp="mp.text"][endblock]
        [iscript]
            mp.name=f.temp_class_name+" lingua";
            if(mp.text.length==1){
                mp.name=mp.name+" single";
            }
        [endscript]
        [block name=%name][emb exp="mp.lingua"][endblock]

    [endif]
[endmacro]

[macro name="claim"]
        [iscript]
            f[sf.current_flag]=1;
            var e=document.querySelectorAll('.lingua');
            e.forEach(element=>{element.classList.add('encrypted')});
            var e=document.querySelectorAll('.stasis');
            e.forEach(element=>{element.classList.add('decrypted')});
        [endscript]
[endmacro]

[position layer="message0" left=1020 width=840 top=90 height=900]
[layopt layer=0 visible=true]
[layopt layer="message1" visible="true" ]
[position layer="message1" left=60 width=840 top=90 height=900]

@jump storage="test.ks" 

@jump storage="prologue.ks"