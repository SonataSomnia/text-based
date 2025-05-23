tyrano.plugin.kag.tag.loadjs = {
  vital: ["storage"],
  pm: { storage: "", type: "" },
  start: function (pm) {
    var that = this;
    "module" === pm.type
      ? import("../../../data/others/" + pm.storage).then((module) => {
          that.kag.ftag.nextOrder();
        })
      : $.getScript("./data/others/" + pm.storage, function () {
          that.kag.ftag.nextOrder();
        });
  },
};
tyrano.plugin.kag.tag.movie = {
  vital: ["storage"],
  pm: {
    storage: "",
    volume: "",
    skip: "false",
    mute: "false",
    bgmode: "false",
    loop: "false",
  },
  start: function (pm) {
    if ("pc" != $.userenv()) {
      this.kag.cancelWeakStop();
      if ($.isTyranoPlayer()) this.playVideo(pm);
      else {
        this.kag.cancelWeakStop();
        this.playVideo(pm);
        $(".tyrano_base").unbind("click.movie");
      }
    } else {
      "opera" == $.getBrowser() &&
        (pm.storage = $.replaceAll(pm.storage, ".mp4", ".webm"));
      this.playVideo(pm);
    }
  },
  playVideo: function (pm) {
    var that = this,
      url = "./data/video/" + pm.storage,
      video = document.createElement("video");
    video.id = "bgmovie";
    video.src = url;
    "" != pm.volume
      ? (video.volume = parseFloat(parseInt(pm.volume) / 100))
      : void 0 !== this.kag.config.defaultMovieVolume &&
        (video.volume = parseFloat(
          parseInt(this.kag.config.defaultMovieVolume) / 100
        ));
    video.style.backgroundColor = "black";
    video.style.position = "absolute";
    video.style.top = "0px";
    video.style.left = "0px";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.display = "none";
    video.autoplay = !0;
    video.autobuffer = !0;
    video.setAttribute("playsinline", "1");
    "true" == pm.mute && (video.muted = !0);
    if ("true" == pm.bgmode) {
      that.kag.tmp.video_playing = !0;
      video.style.zIndex = 0;
      "true" == pm.loop ? (video.loop = !0) : (video.loop = !1);
      video.addEventListener("ended", function (e) {
        if (null == that.kag.stat.video_stack) {
          that.kag.tmp.video_playing = !1;
          if (1 == that.kag.stat.is_wait_bgmovie) {
            that.kag.ftag.nextOrder();
            that.kag.stat.is_wait_bgmovie = !1;
          }
        } else {
          var video_pm = that.kag.stat.video_stack,
            video2 = document.createElement("video");
          video2.style.backgroundColor = "black";
          video2.style.position = "absolute";
          video2.style.top = "0px";
          video2.style.left = "0px";
          video2.style.width = "100%";
          video2.style.height = "100%";
          video2.autoplay = !0;
          video2.autobuffer = !0;
          "true" == video_pm.loop ? (video2.loop = !0) : (video2.loop = !1);
          video2.setAttribute("playsinline", "1");
          "true" == video_pm.mute && (video2.muted = !0);
          video2.src = "./data/video/" + video_pm.storage;
          video2.load();
          var j_video2 = $(video2);
          video2.play();
          j_video2.css("z-index", -1);
          $("#tyrano_base").append(j_video2);
          video2.addEventListener(
            "canplay",
            function (event) {
              var arg = arguments.callee;
              j_video2.css("z-index", 1);
              setTimeout(function () {
                $("#bgmovie").remove();
                video2.id = "bgmovie";
              }, 100);
              that.kag.stat.video_stack = null;
              that.kag.tmp.video_playing = !0;
              video2.removeEventListener("canplay", arg, !1);
            },
            !1
          );
          video2.addEventListener("ended", arguments.callee);
        }
      });
    } else {
      video.style.zIndex = 199999;
      video.addEventListener("ended", function (e) {
        $(".tyrano_base").find("video").remove();
        that.kag.ftag.nextOrder();
      });
      "true" == pm.skip &&
        $(video).on("click touchstart", function (e) {
          $(video).off("click touchstart");
          $(".tyrano_base").find("video").remove();
          that.kag.ftag.nextOrder();
        });
    }
    var j_video = $(video);
    j_video.css("opacity", 0);
    $("#tyrano_base").append(j_video);
    j_video.animate(
      { opacity: "1" },
      { duration: parseInt(pm.time), complete: function () {} }
    );
    video.load();
    video.addEventListener("canplay", function () {
      video.style.display = "";
      video.play();
    });
  },
};
tyrano.plugin.kag.tag.bgmovie = {
  vital: ["storage"],
  pm: {
    storage: "",
    volume: "",
    loop: "true",
    mute: "false",
    time: "300",
    stop: "false",
  },
  start: function (pm) {
    pm.skip = "false";
    pm.bgmode = "true";
    this.kag.stat.current_bgmovie.storage = pm.storage;
    this.kag.stat.current_bgmovie.volume = pm.volume;
    if (0 == this.kag.tmp.video_playing) {
      this.kag.ftag.startTag("movie", pm);
      "false" == pm.stop && this.kag.ftag.nextOrder();
    } else {
      var video = document.getElementById("bgmovie");
      this.kag.stat.video_stack = pm;
      video.loop = !1;
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.wait_bgmovie = {
  vital: [],
  pm: { stop: "false" },
  start: function (pm) {
    if (1 == this.kag.tmp.video_playing) {
      var video = document.getElementById("bgmovie");
      this.kag.stat.is_wait_bgmovie = !0;
      video.loop = !1;
    } else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.stop_bgmovie = {
  vital: [],
  pm: { time: "300", wait: "true" },
  start: function (pm) {
    var that = this;
    that.kag.tmp.video_playing = !1;
    that.kag.stat.current_bgmovie.storage = "";
    that.kag.stat.current_bgmovie.volume = "";
    $(".tyrano_base")
      .find("video")
      .animate(
        { opacity: "0" },
        {
          duration: parseInt(pm.time),
          complete: function () {
            $(this).remove();
            "true" == pm.wait && that.kag.ftag.nextOrder();
          },
        }
      );
    $(".tyrano_base").find("video").get(0)
      ? "false" == pm.wait && that.kag.ftag.nextOrder()
      : that.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.showsave = {
  pm: {},
  start: function (pm) {
    var that = this;
    that.kag.stat.load_auto_next = !0;
    this.kag.menu.displaySave(function () {
      that.kag.stat.load_auto_next = !1;
      that.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag.showload = {
  pm: {},
  start: function (pm) {
    var that = this;
    this.kag.menu.displayLoad(function () {
      that.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag.showmenu = {
  pm: {},
  start: function (pm) {
    this.kag.menu.showMenu();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.showmenubutton = {
  pm: { keyfocus: "false" },
  start: function (pm) {
    const j_button = $(".button_menu");
    j_button.show();
    this.kag.makeFocusable(j_button, pm.keyfocus);
    this.kag.stat.visible_menu_button = !0;
    this.kag.config.configVisible = "true";
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.hidemenubutton = {
  pm: {},
  start: function (pm) {
    $(".button_menu").hide();
    this.kag.stat.visible_menu_button = !1;
    this.kag.config.configVisible = "false";
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.skipstart = {
  pm: {},
  start: function (pm) {
    if (1 == this.kag.stat.is_skip || this.kag.stat.is_adding_text) return !1;
    this.kag.setSkip(!0, pm);
    this.kag.ftag.hideNextImg();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.skipstop = {
  start: function (pm) {
    this.kag.setSkip(!1);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.cancelskip = {
  start: function (pm) {
    this.kag.setSkip(!1);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.autostart = {
  pm: {},
  start: function (pm) {
    if (1 == this.kag.stat.is_auto) return !1;
    this.kag.readyAudio();
    this.kag.setAuto(!0);
    this.kag.ftag.hideNextImg();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.autostop = {
  pm: { next: "true" },
  start: function (pm) {
    this.kag.setAuto(!1);
    this.kag.stat.is_wait_auto = !1;
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.autoconfig = {
  pm: { speed: "", clickstop: "" },
  start: function (pm) {
    if ("" != pm.speed) {
      this.kag.config.autoSpeed = pm.speed;
      this.kag.ftag.startTag("eval", {
        exp: "sf._system_config_auto_speed = " + pm.speed,
        next: "false",
      });
    }
    if ("" != pm.clickstop) {
      this.kag.config.autoClickStop = pm.clickstop;
      this.kag.ftag.startTag("eval", {
        exp: "sf._system_config_auto_click_stop = " + pm.clickstop,
        next: "false",
      });
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.anim = {
  pm: {
    name: "",
    layer: "",
    left: "",
    top: "",
    width: "",
    height: "",
    opacity: "",
    color: "",
    time: "2000",
    effect: "",
  },
  start: function (pm) {
    var that = this,
      anim_style = {};
    "" != pm.left && (anim_style.left = pm.left);
    "" != pm.top && (anim_style.top = pm.top);
    "" != pm.width && (anim_style.width = pm.width);
    "" != pm.height && (anim_style.height = pm.height);
    "" != pm.opacity && (anim_style.opacity = $.convertOpacity(pm.opacity));
    "" != pm.color && (anim_style.color = $.convertColor(pm.color));
    if ("" != pm.name)
      $("." + pm.name).each(function () {
        that.kag.pushAnimStack();
        $(this)
          .stop(!0, !0)
          .animate(anim_style, parseInt(pm.time), pm.effect, function () {
            that.kag.popAnimStack();
          });
      });
    else if ("" != pm.layer) {
      var layer_name = pm.layer + "_fore";
      "free" == pm.layer && (layer_name = "layer_free");
      $("." + layer_name)
        .children()
        .each(function () {
          that.kag.pushAnimStack();
          $(this)
            .stop(!0, !0)
            .animate(anim_style, parseInt(pm.time), pm.effect, function () {
              that.kag.popAnimStack();
            });
        });
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.wa = {
  start: function (pm) {
    if (this.kag.tmp.num_anim > 0) {
      this.kag.stat.is_wait_anim = !0;
      this.kag.weaklyStop();
    } else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.stopanim = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    $("." + pm.name).stop();
    this.kag.popAnimStack();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.keyframe = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    this.kag.stat.current_keyframe = pm.name;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.endkeyframe = {
  pm: {},
  start: function (pm) {
    this.kag.stat.current_keyframe = "";
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.frame = {
  vital: ["p"],
  pm: { p: "" },
  master_trans: {
    x: "",
    y: "",
    z: "",
    translate: "",
    translate3d: "",
    translateX: "",
    translateY: "",
    translateZ: "",
    scale: "",
    scale3d: "",
    scaleX: "",
    scaleY: "",
    scaleZ: "",
    rotate: "",
    rotate3d: "",
    rotateX: "",
    rotateY: "",
    rotateZ: "",
    skew: "",
    skewX: "",
    skewY: "",
    perspective: "",
  },
  start: function (pm) {
    var percentage = pm.p;
    delete pm.p;
    //!!!!!!!!!transかstyleかをここで振り分ける必要がありますよ！
    if (this.kag.stat.map_keyframe[this.kag.stat.current_keyframe]);
    else {
      this.kag.stat.map_keyframe[this.kag.stat.current_keyframe] = {};
      this.kag.stat.map_keyframe[this.kag.stat.current_keyframe].frames = {};
      this.kag.stat.map_keyframe[this.kag.stat.current_keyframe].styles = {};
    }
    var map_trans = {},
      map_style = {};
    for (let key in pm)
      "" == this.master_trans[key]
        ? (map_trans[key] = pm[key])
        : (map_style[key] = pm[key]);
    this.kag.stat.map_keyframe[this.kag.stat.current_keyframe].frames[
      percentage
    ] = { trans: map_trans, styles: map_style };
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.kanim = {
  vital: ["keyframe"],
  pm: { name: "", layer: "", keyframe: "" },
  start: function (pm) {
    var that = this;
    const j_targets = $.findAnimTargets(pm);
    if (0 === j_targets.length) {
      this.kag.ftag.nextOrder();
      return;
    }
    const anim = $.extend({}, this.kag.stat.map_keyframe[pm.keyframe]);
    anim.config = pm;
    pm.time && (pm.duration = parseInt(pm.time) + "ms");
    pm.delay && (pm.delay = parseInt(pm.delay) + "ms");
    const should_push_anim_stack = "infinite" !== pm.count;
    delete pm.name;
    delete pm.keyframe;
    delete pm.layer;
    j_targets.each(function () {
      const j_this = $(this),
        this_anim = $.extend({}, anim);
      this_anim.complete = () => {
        if (should_push_anim_stack && this.anim_stack_exists) {
          this.anim_stack_exists = !1;
          that.kag.popAnimStack();
        }
      };
      if (should_push_anim_stack && !this.anim_stack_exists) {
        this.anim_stack_exists = !0;
        that.kag.pushAnimStack();
      }
      j_this.on("remove", () => {
        this_anim.complete();
      });
      j_this.a3d(this_anim);
    });
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.stop_kanim = {
  pm: { name: "", layer: "" },
  start: function (pm) {
    const that = this,
      j_targets = $.findAnimTargets(pm);
    if (0 !== j_targets.length) {
      j_targets.each(function () {
        const j_this = $(this);
        if (this.anim_stack_exists) {
          this.anim_stack_exists = !1;
          that.kag.popAnimStack();
        }
        j_this.css({
          "animation-name": "",
          "animation-play-state": "",
          "animation-iteration-count": "",
          "animation-fill-mode": "",
          "animation-timing-function": "",
          transform: "",
        });
      });
      this.kag.ftag.nextOrder();
    } else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.xanim = {
  pm: {
    name: "",
    layer: "",
    keyframe: "",
    easing: "ease",
    count: "1",
    delay: "0",
    direction: "normal",
    mode: "forwards",
    reset: "true",
    time: "",
    svg: "",
    svg_x: "true",
    svg_y: "true",
    svg_rotate: "false",
    next: "true",
    wait: "false",
  },
  start: function (pm) {
    if (!pm.svg) {
      this._start(pm);
      return;
    }
    const j_hidden_area = this.kag.getHiddenArea();
    this.kag.stat.hidden_svg_list || (this.kag.stat.hidden_svg_list = []);
    let j_svg;
    const path = $.parseStorage(pm.svg, "image");
    j_svg = document.getElementById(path);
    j_svg
      ? this._start(pm, $(j_svg))
      : $.get(path, (xml) => {
          j_svg = $(xml).find("svg").attr("id", path).appendTo(j_hidden_area);
          this.kag.stat.hidden_svg_list.push(path);
          this._start(pm, j_svg);
        });
  },
  _start: function (_pm, j_svg) {
    const that = this,
      pm = $.extend({}, _pm),
      should_wait = "false" !== pm.wait && "infinite" !== pm.count,
      should_next = "false" !== pm.next;
    let is_next_done = !1;
    const next = () => {
        if (!is_next_done) {
          is_next_done = !0;
          should_next && this.kag.ftag.nextOrder();
        }
      },
      j_targets = $.findAnimTargets(pm);
    if (0 === j_targets.length) {
      next();
      return;
    }
    const duration = parseInt(pm.time) || 1e3,
      delay = parseInt(pm.delay) || 0,
      direction = pm.direction,
      loop = "infinite" === pm.count || parseInt(pm.count) || 1,
      mode = pm.mode;
    let easing = pm.easing;
    const oldOptions = {
      ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
      "ease-in": "cubicBezier(0.42, 0.0, 1.0, 1.0)",
      "ease-out": "cubicBezier(0.42, 0.0, 0.58, 1.0)",
      "ease-in-out": "cubicBezier(0.0, 0.0, 0.58, 1.0)",
      swing: "easeOutQuad",
      jswing: "easeOutQuad",
      def: "easeOutQuad",
    };
    oldOptions[easing] && (easing = oldOptions[easing]);
    easing = easing.replace("cubic-bezier", "cubicBezier");
    let keyframes_css_names = [];
    const keyframes = [];
    if (pm.keyframe) {
      const anim = this.kag.stat.map_keyframe[pm.keyframe];
      if (!anim) {
        this.kag.error("undefined_keyframe", pm);
        next();
        return;
      }
      let previous_time = 0;
      for (const key in anim.frames) {
        const frame = anim.frames[key],
          percentage = parseInt(key);
        if (isNaN(percentage))
          this.kag.error("invalid_keyframe_percentage", { percentage: key });
        else {
          const time = (duration * percentage) / 100,
            time_of_section = time - previous_time;
          previous_time = time;
          const keyframe = $.extend(
            { duration: time_of_section },
            frame.styles
          );
          delete keyframe._tag;
          for (const _key in frame.trans) {
            const key = _key.replace(/^(x|y|z)$/, function (v) {
                return "translate" + v.toUpperCase();
              }),
              val = frame.trans[_key];
            keyframe[key] = val;
          }
          keyframes_css_names = Object.keys(frame.styles);
          Object.keys(frame.trans).length > 0 &&
            keyframes_css_names.push("transform");
          keyframes.push(keyframe);
        }
      }
      if (0 === keyframes.length) {
        this.kag.error("invalid_keyframe");
        next();
        return;
      }
    }
    const css_in_pm = {};
    for (const _key in pm)
      if (!(_key in this.pm) && "_tag" !== _key) {
        const key = _key.replace(/^(x|y|z)$/, function (v) {
          return "translate" + v.toUpperCase();
        });
        css_in_pm[key] = pm[_key];
      }
    pm.opacity && (pm.opacity = $.convertOpacity(pm.opacity));
    pm.color && (pm.color = $.convertColor(pm.color));
    pm["background-color"] &&
      (pm["background-color"] = $.convertColor(pm["background-color"]));
    j_targets.each(function () {
      const j_this = $(this),
        initial_keyframes_css = {};
      keyframes_css_names &&
        "none" === mode &&
        keyframes_css_names.forEach(function (prop) {
          initial_keyframes_css[prop] = j_this.css(prop);
        });
      keyframes_css_names &&
        "true" === pm.reset &&
        keyframes_css_names.forEach(function (prop) {
          j_this.css(prop, "");
        });
      const should_restore = !0 === loop;
      let anime_state;
      const anime_opt = {
        targets: this,
        duration: duration,
        complete: () => {
          keyframes_css_names &&
            "none" === mode &&
            j_this.css(initial_keyframes_css);
          !0 !== loop && that.kag.popAnimStack();
          should_restore && j_this.removeClass("set-xanim-restore");
          if (this.anime_state_set) {
            this.anime_state_set.delete(anime_state);
          }
          should_wait && next();
        },
        easing: easing,
        delay: delay,
        direction: direction,
        loop: loop,
      };
      keyframes.length > 0 && (anime_opt.keyframes = keyframes);
      for (const key in css_in_pm) anime_opt[key] = css_in_pm[key];
      j_this.on("remove", () => {
        if (this.anime_state_set)
          for (const anime_state of this.anime_state_set)
            if (!anime_state.completed) {
              anime_state.pause();
              anime_state.complete();
            }
      });
      !0 !== loop && that.kag.pushAnimStack();
      if (j_svg) {
        const path_elm = j_svg.find("path").get(0),
          path = anime.path(path_elm);
        "true" === pm.svg_x && (anime_opt.translateX = path("x"));
        "true" === pm.svg_y && (anime_opt.translateY = path("y"));
        "true" === pm.svg_rotate && (anime_opt.rotateZ = path("angle"));
        keyframes_css_names.push("transform");
      }
      if (should_restore) {
        j_this.addClass("set-xanim-restore");
        j_this.attr("data-event-pm", JSON.stringify(_pm));
        const initial_css_map = {};
        for (const name of keyframes_css_names)
          initial_css_map[name] = j_this.css(name);
        for (const name in css_in_pm) initial_css_map[name] = j_this.css(name);
        j_this.attr("data-effect", JSON.stringify(initial_css_map));
      }
      anime_state = anime(anime_opt);
      this.anime_state_set || (this.anime_state_set = new Set());
      this.anime_state_set.add(anime_state);
    });
    should_wait || next();
  },
};
tyrano.plugin.kag.tag.stop_xanim = {
  pm: { name: "", layer: "", complete: "false" },
  start: function (pm) {
    const j_targets = $.findAnimTargets(pm);
    if (0 !== j_targets.length) {
      j_targets.each(function () {
        $(this);
        if (this.anime_state_set)
          for (const anime_state of this.anime_state_set)
            if (!anime_state.completed) {
              "true" === pm.complete && anime_state.seek(anime_state.duration);
              anime_state.pause();
              anime_state.complete();
            }
      });
      this.kag.ftag.nextOrder();
    } else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_ptext = {
  pm: { name: "", face: "" },
  start: function (pm) {
    this.kag.weaklyStop();
    const j_chara_name = this.kag.chara.getCharaNameArea();
    if ("" == pm.name) {
      j_chara_name.updatePText("");
      "none" != this.kag.stat.chara_talk_focus &&
        this.kag.chara.setNotSpeakerStyle(this.kag.chara.getCharaContainer());
      "zoom" == this.kag.stat.chara_talk_anim &&
        this.zoomChara("", this.kag.stat.chara_talk_anim_zoom_rate);
    } else {
      this.kag.stat.jcharas[pm.name] &&
        (pm.name = this.kag.stat.jcharas[pm.name]);
      const cpm = this.kag.stat.charas[pm.name];
      if (cpm) {
        j_chara_name.updatePText(cpm.jname);
        "" != cpm.color && j_chara_name.css("color", $.convertColor(cpm.color));
        const j_chara_speaker = this.kag.chara.getCharaContainer(pm.name);
        if ("none" != this.kag.stat.chara_talk_focus) {
          this.kag.chara.setNotSpeakerStyle(this.kag.chara.getCharaContainer());
          this.kag.chara.setSpeakerStyle(j_chara_speaker);
        }
        if ("none" != this.kag.stat.chara_talk_anim && j_chara_speaker.get(0)) {
          let timeout = 0;
          if ("" != pm.face) {
            this.kag.ftag.startTag("chara_mod", {
              name: pm.name,
              face: pm.face,
              next: "false",
              time: "0",
            });
            timeout = 10;
          }
          $.setTimeout(() => {
            "zoom" == this.kag.stat.chara_talk_anim
              ? this.zoomChara(pm.name, this.kag.stat.chara_talk_anim_zoom_rate)
              : this.animChara(
                  j_chara_speaker,
                  this.kag.stat.chara_talk_anim,
                  pm.name
                );
          }, timeout);
        }
      } else {
        j_chara_name.updatePText(pm.name);
        "none" != this.kag.stat.chara_talk_focus &&
          this.kag.chara.setNotSpeakerStyle(this.kag.chara.getCharaContainer());
        "zoom" == this.kag.stat.chara_talk_anim &&
          this.zoomChara("", this.kag.stat.chara_talk_anim_zoom_rate);
      }
    }
    if (1 == this.kag.stat.vostart && this.kag.stat.map_vo.vochara[pm.name]) {
      const vochara = this.kag.stat.map_vo.vochara[pm.name],
        se_pm = {
          loop: "false",
          storage: $.replaceAll(vochara.vostorage, "{number}", vochara.number),
          stop: "true",
          buf: vochara.buf,
        };
      this.kag.ftag.startTag("playse", se_pm);
      vochara.number++;
      this.kag.stat.voconfig_preload && this.kag.preloadNextVoice();
    }
    this.kag.stat.f_chara_ptext = "true";
    this.kag.cancelWeakStop();
    "" != pm.face && "none" == this.kag.stat.chara_talk_anim
      ? this.kag.ftag.startTag("chara_mod", { name: pm.name, face: pm.face })
      : this.kag.ftag.nextOrder();
  },
  animChara: function (chara_obj, type, name) {
    if (void 0 === this.kag.tmp.map_chara_talk_top[name]) {
      var that = this,
        tmp_top = parseInt(chara_obj.get(0).offsetTop);
      chara_obj.css("top", tmp_top);
      var a_obj = {},
        b_obj = {};
      this.kag.tmp.map_chara_talk_top[name] = !0;
      var anim_time = this.kag.stat.chara_talk_anim_time;
      if ("up" == type) {
        a_obj.top = tmp_top - this.kag.stat.chara_talk_anim_value;
        b_obj.top = tmp_top;
      } else if ("down" == type) {
        a_obj.top = tmp_top + this.kag.stat.chara_talk_anim_value;
        b_obj.top = tmp_top;
      }
      chara_obj
        .stop(!0, !0)
        .animate(a_obj, anim_time, "easeOutQuad", function () {
          chara_obj
            .stop(!0, !0)
            .animate(b_obj, anim_time, "easeOutQuad", function () {
              delete that.kag.tmp.map_chara_talk_top[name];
            });
        });
    }
  },
  zoomChara: function (name, zoom_rate) {
    if (this.kag.stat.chara_last_zoom_name != name) {
      var anim_time = this.kag.stat.chara_talk_anim_time;
      if ("" != this.kag.stat.chara_last_zoom_name) {
        let j_chara_last_zoom = this.kag.chara.getCharaContainer(
          this.kag.stat.chara_last_zoom_name
        );
        j_chara_last_zoom.css("margin", 0);
        j_chara_last_zoom.stop(!0, !0).animate(
          { margin: zoom_rate - 1 },
          {
            duration: anim_time,
            easing: "easeOutQuad",
            step: function (now, fx) {
              j_chara_last_zoom.css(
                "transform",
                "scale(" + (zoom_rate - now) + ")"
              );
            },
            complete: function () {
              j_chara_last_zoom.css("transform", "");
            },
          }
        );
      }
      this.kag.stat.chara_last_zoom_name = name;
      if ("" != name) {
        let chara_obj = this.kag.chara.getCharaContainer(name);
        chara_obj.css("margin", 0);
        chara_obj.stop(!0, !0).animate(
          { margin: zoom_rate - 1 },
          {
            duration: anim_time,
            easing: "easeOutQuad",
            step: function (now, fx) {
              chara_obj.css("transform", "scale(" + (1 + now) + ")");
            },
            complete: function () {},
          }
        );
      }
    }
  },
};
tyrano.plugin.kag.tag.chara_config = {
  pm: {
    pos_mode: "",
    effect: "",
    ptext: "",
    time: "",
    memory: "",
    anim: "",
    pos_change_time: "",
    talk_focus: "",
    brightness_value: "",
    blur_value: "",
    talk_anim: "",
    talk_anim_time: "",
    talk_anim_value: "",
    talk_anim_zoom_rate: "",
    plus_lighter: "",
  },
  start: function (pm) {
    "" != pm.pos_mode && (this.kag.stat.chara_pos_mode = pm.pos_mode);
    "" != pm.effect && (this.kag.stat.chara_effect = pm.effect);
    "" != pm.ptext && (this.kag.stat.chara_ptext = pm.ptext);
    "" != pm.time && (this.kag.stat.chara_time = pm.time);
    "" != pm.memory && (this.kag.stat.chara_memory = pm.memory);
    "" != pm.anim && (this.kag.stat.chara_anim = pm.anim);
    "" != pm.pos_change_time &&
      (this.kag.stat.pos_change_time = pm.pos_change_time);
    pm.plus_lighter && (this.kag.stat.plus_lighter = pm.plus_lighter);
    "" != pm.brightness_value &&
      (this.kag.stat.chara_brightness_value = pm.brightness_value);
    "" != pm.blur_value && (this.kag.stat.chara_blur_value = pm.blur_value);
    "" != pm.talk_anim && (this.kag.stat.chara_talk_anim = pm.talk_anim);
    "" != pm.talk_anim_time &&
      (this.kag.stat.chara_talk_anim_time = parseInt(pm.talk_anim_time));
    "" != pm.talk_anim_value &&
      (this.kag.stat.chara_talk_anim_value = parseInt(pm.talk_anim_value));
    "" != pm.talk_anim_zoom_rate &&
      (this.kag.stat.chara_talk_anim_zoom_rate = parseFloat(
        pm.talk_anim_zoom_rate
      ));
    if ("" != pm.talk_focus) {
      "none" == pm.talk_focus
        ? (this.kag.stat.apply_filter_str = "")
        : "brightness" == pm.talk_focus
        ? (this.kag.stat.apply_filter_str =
            "brightness(" + this.kag.stat.chara_brightness_value + "%)")
        : "blur" == pm.talk_focus &&
          (this.kag.stat.apply_filter_str =
            "blur(" + this.kag.stat.chara_blur_value + "px)");
      $("#tyrano_base")
        .find(".tyrano_chara")
        .css({
          "-webkit-filter": "brightness(100%) blur(0px)",
          "-ms-filter": "brightness(100%) blur(0px)",
          "-moz-filter": "brightness(100%) blur(0px)",
        });
      this.kag.stat.chara_talk_focus = pm.talk_focus;
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_new = {
  vital: ["name", "storage"],
  pm: {
    name: "",
    storage: "",
    width: "",
    height: "",
    reflect: "false",
    jname: "",
    color: "",
    map_face: {},
    fuki: { enable: "false" },
    is_show: "false",
  },
  start: function (pm) {
    var storage_url = "./data/fgimage/" + pm.storage;
    $.isHTTP(pm.storage) && (storage_url = pm.storage);
    pm.map_face.default = pm.storage;
    this.kag.stat.charas[pm.name] = pm;
    "" != pm.jname && (this.kag.stat.jcharas[pm.jname] = pm.name);
    this.kag.preload(storage_url, (img_obj) => {
      if (img_obj) {
        let img_width = $(img_obj).get(0).width,
          img_height = $(img_obj).get(0).height;
        this.kag.stat.charas[pm.name].origin_width = img_width;
        this.kag.stat.charas[pm.name].origin_height = img_height;
        this.kag.stat.charas[pm.name].fuki.left = Math.round(img_width / 2);
        this.kag.stat.charas[pm.name].fuki.top = Math.round(img_height / 3);
      }
      this.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag.chara_show = {
  vital: ["name"],
  pm: {
    name: "",
    page: "fore",
    layer: "0",
    wait: "true",
    left: "",
    top: "",
    width: "",
    height: "",
    zindex: "1",
    depth: "front",
    reflect: "",
    face: "",
    storage: "",
    time: 1e3,
  },
  start: function (pm) {
    var that = this,
      cpm = this.kag.stat.charas[pm.name],
      array_storage = [];
    if (null != cpm) {
      var check_obj = that.kag.chara.getCharaContainer(pm.name);
      check_obj.stop(!0, !0);
      if (check_obj.get(0)) {
        check_obj.stop(!0, !0);
        if ("none" != check_obj.css("display")) {
          that.kag.ftag.nextOrder();
          return;
        }
      } else cpm.is_show = "false";
      if ("true" != cpm.is_show) {
        var storage_url = "./data/fgimage/" + cpm.storage;
        $.isHTTP(cpm.storage) && (storage_url = cpm.storage);
        if ("" != pm.face) {
          if (!cpm.map_face[pm.face]) {
            this.kag.error("undefined_face", pm);
            return;
          }
          storage_url = "./data/fgimage/" + cpm.map_face[pm.face];
          $.isHTTP(cpm.map_face[pm.face]) &&
            (storage_url = cpm.map_face[pm.face]);
        } else if ("" != pm.storage) {
          storage_url = $.isHTTP(pm.storage)
            ? pm.storage
            : "./data/fgimage/" + pm.storage;
          that.kag.stat.charas[pm.name].storage = pm.storage;
        }
        var j_chara_root = $("<div></div>");
        j_chara_root.css({ position: "absolute", display: "none" });
        var img_obj = $("<img />");
        img_obj.attr("src", storage_url);
        img_obj.addClass("chara_img");
        j_chara_root.append(img_obj);
        if ("" != pm.width) {
          var width = parseInt(pm.width);
          cpm.width = width;
        }
        if ("" != pm.height) {
          var height = parseInt(pm.height);
          cpm.height = height;
        }
        "" != cpm.width && j_chara_root.css("width", cpm.width + "px");
        "" != cpm.height && j_chara_root.css("height", cpm.height + "px");
        if ("" != pm.zindex) {
          var zindex = parseInt(pm.zindex);
          j_chara_root.css("z-index", zindex);
        }
        var chara_layer = {};
        cpm._layer && (chara_layer = cpm._layer);
        for (let key in chara_layer) {
          var chara_part = chara_layer[key],
            current_part_id = chara_part.current_part_id,
            chara_obj = chara_part[current_part_id];
          "allow_storage" == current_part_id &&
            (chara_obj = {
              storage: chara_part.allow_storage,
              visible: "true",
            });
          var part_storage = "./data/fgimage/" + chara_obj.storage,
            j_img = $("<img />");
          "none" == chara_obj.storage
            ? (part_storage = "./tyrano/images/system/transparent.png")
            : array_storage.push(part_storage);
          j_img.attr("src", part_storage);
          j_img.css({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            "z-index": chara_part.zindex,
          });
          j_img.addClass("part");
          j_img.addClass(key);
          j_chara_root.append(j_img);
        }
        "" != pm.reflect &&
          ("true" == pm.reflect
            ? (cpm.reflect = "true")
            : (cpm.reflect = "false"));
        that.kag.chara.setPartContainer(j_chara_root);
        array_storage.push(storage_url);
        cpm.is_show = "true";
        cpm.layer = pm.layer;
        this.kag.preloadAll(array_storage, function () {
          var target_layer = that.kag.layer.getLayer(pm.layer, pm.page);
          "back" == pm.depth
            ? target_layer.prepend(j_chara_root).show()
            : target_layer.append(j_chara_root).show();
          var chara_num = 1;
          that.kag.weaklyStop();
          if ("true" == that.kag.stat.chara_pos_mode && "" === pm.left) {
            "" !== pm.top
              ? j_chara_root.css("top", parseInt(pm.top))
              : j_chara_root.css("bottom", 0);
            var chara_cnt = target_layer.find(".tyrano_chara").length,
              sc_width = parseInt(that.kag.config.scWidth),
              center =
                (parseInt(that.kag.config.scHeight),
                Math.floor(parseInt(j_chara_root.css("width")) / 2)),
              base = Math.floor(sc_width / (chara_cnt + 2)),
              tmp_base = base,
              first_left = base - center;
            j_chara_root.css("left", first_left + "px");
            var array_tyrano_chara = target_layer
              .find(".tyrano_chara")
              .get()
              .reverse();
            $(array_tyrano_chara).each(function () {
              chara_num++;
              tmp_base += base;
              var j_chara = $(this);
              center = Math.floor(parseInt(j_chara.css("width")) / 2);
              var left = tmp_base - center;
              "false" == that.kag.stat.chara_anim
                ? j_chara
                    .stop(!0, !0)
                    .fadeTo(
                      parseInt(that.kag.cutTimeWithSkip(pm.time)),
                      0,
                      function () {
                        j_chara.css("left", left);
                        j_chara
                          .stop(!0, !0)
                          .fadeTo(
                            parseInt(
                              that.kag.cutTimeWithSkip(
                                that.kag.stat.pos_change_time
                              )
                            ),
                            1,
                            function () {
                              if (0 == --chara_num) {
                                that.kag.cancelWeakStop();
                                "true" == pm.wait && that.kag.ftag.nextOrder();
                              }
                            }
                          );
                      }
                    )
                : j_chara
                    .stop(!0, !0)
                    .animate(
                      { left: left },
                      parseInt(
                        that.kag.cutTimeWithSkip(that.kag.stat.pos_change_time)
                      ),
                      that.kag.stat.chara_effect,
                      function () {
                        if (0 == --chara_num) {
                          that.kag.cancelWeakStop();
                          "true" == pm.wait && that.kag.ftag.nextOrder();
                        }
                      }
                    );
            });
          } else {
            j_chara_root.css("top", pm.top + "px");
            j_chara_root.css("left", pm.left + "px");
          }
          setTimeout(function () {
            var width = img_obj.css("width"),
              height = img_obj.css("height");
            j_chara_root.css("width", width);
            j_chara_root.css("height", height);
            j_chara_root.find(".part").css("width", width);
            j_chara_root.find(".part").css("height", height);
          }, 1);
          $.setName(j_chara_root, cpm.name);
          j_chara_root.addClass("tyrano_chara");
          "" != cpm.width && img_obj.css("width", cpm.width + "px");
          "" != cpm.height && img_obj.css("height", cpm.height + "px");
          "true" == cpm.reflect
            ? j_chara_root.addClass("reflect")
            : j_chara_root.removeClass("reflect");
          "true" != pm.wait && that.kag.ftag.nextOrder();
          j_chara_root.stop(!0, !0).animate(
            { opacity: "show" },
            {
              duration: parseInt(that.kag.cutTimeWithSkip(pm.time)),
              easing: that.kag.stat.chara_effect,
              complete: function () {
                if (0 == --chara_num) {
                  that.kag.cancelWeakStop();
                  "true" == pm.wait && that.kag.ftag.nextOrder();
                }
              },
            }
          );
        });
      } else that.kag.ftag.nextOrder();
    } else this.kag.error("undefined_character", pm);
  },
};
tyrano.plugin.kag.tag.chara_hide = {
  vital: ["name"],
  pm: {
    page: "fore",
    layer: "0",
    name: "",
    wait: "true",
    pos_mode: "true",
    time: "1000",
  },
  start: function (pm) {
    var that = this,
      target_layer = this.kag.layer.getLayer(pm.layer, pm.page),
      img_obj = this.kag.chara.getCharaContainer(pm.name, target_layer);
    this.kag.stat.charas[pm.name].is_show = "false";
    img_obj.stop(!0, !0);
    if (!img_obj.get(0)) {
      img_obj.stop(!0, !0);
      if ("none" == img_obj.css("display")) {
        that.kag.ftag.nextOrder();
        return;
      }
    }
    if (img_obj.get(0)) {
      var chara_num = 0;
      that.kag.weaklyStop();
      img_obj.stop(!0, !0).animate(
        { opacity: "hide" },
        {
          duration: parseInt(that.kag.cutTimeWithSkip(pm.time)),
          easing: "linear",
          complete: function () {
            img_obj.remove();
            if (
              "true" == that.kag.stat.chara_pos_mode &&
              "true" == pm.pos_mode
            ) {
              var j_all_chara = that.kag.chara.getCharaContainer(),
                chara_cnt = j_all_chara.length,
                sc_width = parseInt(that.kag.config.scWidth),
                base =
                  (parseInt(that.kag.config.scHeight),
                  Math.floor(sc_width / (chara_cnt + 1))),
                tmp_base = 0;
              if (0 == chara_cnt) {
                that.kag.cancelWeakStop();
                "true" == pm.wait && that.kag.ftag.nextOrder();
                return;
              }
              var array_tyrano_chara = j_all_chara.get().reverse();
              $(array_tyrano_chara).each(function () {
                chara_num++;
                tmp_base += base;
                var j_chara = $(this),
                  center = Math.floor(parseInt(j_chara.css("width")) / 2),
                  left = tmp_base - center;
                "false" == that.kag.stat.chara_anim
                  ? j_chara
                      .stop(!0, !0)
                      .fadeTo(
                        parseInt(that.kag.cutTimeWithSkip(pm.time)),
                        0,
                        function () {
                          j_chara.css("left", left);
                          j_chara
                            .stop(!0, !0)
                            .fadeTo(
                              parseInt(
                                that.kag.cutTimeWithSkip(
                                  that.kag.stat.pos_change_time
                                )
                              ),
                              1,
                              function () {
                                if (0 == --chara_num) {
                                  that.kag.cancelWeakStop();
                                  "true" == pm.wait &&
                                    that.kag.ftag.nextOrder();
                                }
                              }
                            );
                        }
                      )
                  : j_chara
                      .stop(!0, !0)
                      .animate(
                        { left: left },
                        parseInt(
                          that.kag.cutTimeWithSkip(
                            that.kag.stat.pos_change_time
                          )
                        ),
                        that.kag.stat.chara_effect,
                        function () {
                          if (0 == --chara_num) {
                            that.kag.cancelWeakStop();
                            "true" == pm.wait && that.kag.ftag.nextOrder();
                          }
                        }
                      );
              });
            } else if ("true" == pm.wait) {
              that.kag.cancelWeakStop();
              that.kag.ftag.nextOrder();
            }
          },
        }
      );
      "false" == this.kag.stat.chara_memory &&
        (this.kag.stat.charas[pm.name].storage =
          this.kag.stat.charas[pm.name].map_face.default);
      "true" != pm.wait && this.kag.ftag.nextOrder();
    } else that.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_hide_all = {
  vital: [],
  pm: { page: "fore", layer: "0", wait: "true", time: "1000" },
  start: function (pm) {
    var that = this,
      target_layer = this.kag.layer.getLayer(pm.layer, pm.page),
      img_obj = this.kag.chara.getCharaContainer(void 0, target_layer);
    that.kag.weaklyStop();
    var flag_complete = !1,
      charas = this.kag.stat.charas;
    for (let key in charas)
      (void 0 === charas[key].layer || charas[key].layer === pm.layer) &&
        (charas[key].is_show = "false");
    if (img_obj.get(0)) {
      img_obj.stop(!0, !0).animate(
        { opacity: "hide" },
        {
          duration: parseInt(that.kag.cutTimeWithSkip(pm.time)),
          easing: "linear",
          complete: function () {
            img_obj.remove();
            if ("true" == pm.wait && 0 == flag_complete) {
              flag_complete = !0;
              that.kag.cancelWeakStop();
              that.kag.ftag.nextOrder();
            }
          },
        }
      );
      if ("false" == this.kag.stat.chara_memory)
        for (let key in this.kag.stat.charas)
          this.kag.stat.charas[key].storage =
            this.kag.stat.charas[key].map_face.default;
      if ("true" != pm.wait) {
        this.kag.cancelWeakStop();
        this.kag.ftag.nextOrder();
      }
    } else that.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_delete = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    delete this.kag.stat.charas[pm.name];
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_mod = {
  vital: ["name"],
  pm: {
    name: "",
    face: "",
    reflect: "",
    storage: "",
    time: "",
    cross: "true",
    wait: "true",
    next: "true",
  },
  start: function (pm) {
    var that = this;
    that.kag.weaklyStop();
    var storage_url = "",
      folder = "./data/fgimage/";
    const is_wait = "false" !== pm.wait,
      is_cross = "false" !== pm.cross;
    if ("" != pm.face) {
      if (!this.kag.stat.charas[pm.name]) {
        this.kag.error("undefined_character", pm);
        return;
      }
      if (!this.kag.stat.charas[pm.name].map_face[pm.face]) {
        this.kag.error("undefined_face", pm);
        return;
      }
      storage_url = this.kag.stat.charas[pm.name].map_face[pm.face];
      $.isHTTP(storage_url) && (folder = "");
    } else if ($.isHTTP(pm.storage)) {
      folder = "";
      storage_url = pm.storage;
    } else storage_url = pm.storage;
    var j_chara = this.kag.chara.getCharaContainer(pm.name),
      j_img = j_chara.find(".chara_img");
    if (0 != j_chara.length) {
      var chara_time = this.kag.stat.chara_time;
      "" != pm.time && (chara_time = pm.time);
      j_img.attr("src") == folder + storage_url && (chara_time = "0");
      if ("" != pm.reflect) {
        "true" == pm.reflect
          ? j_chara.addClass("reflect")
          : j_chara.removeClass("reflect");
        this.kag.stat.charas[pm.name].reflect = pm.reflect;
      }
      if ("" != storage_url)
        this.kag.preload(folder + storage_url, function () {
          $(".chara-mod-animation").get(0) &&
            $(".chara-mod-animation_" + pm.name).remove();
          if ("0" != chara_time) {
            j_img.stop(!0, !0);
            var j_new_img = j_img.clone();
            j_new_img.attr("src", folder + storage_url);
            j_new_img.css("opacity", 0);
            j_img.addClass("chara-mod-animation_" + pm.name);
            j_img.after(j_new_img);
            is_cross &&
              j_img
                .stop(!0, !0)
                .fadeTo(
                  parseInt(that.kag.cutTimeWithSkip(chara_time)),
                  0,
                  function () {}
                );
            j_new_img
              .stop(!0, !0)
              .fadeTo(
                parseInt(that.kag.cutTimeWithSkip(chara_time)),
                1,
                function () {
                  if (is_cross) {
                    j_img.remove();
                    if (is_wait) {
                      that.kag.cancelWeakStop();
                      "false" !== pm.next && that.kag.ftag.nextOrder();
                    }
                  } else
                    j_img
                      .stop(!0, !0)
                      .fadeTo(
                        parseInt(that.kag.cutTimeWithSkip(chara_time)),
                        0,
                        function () {
                          j_img.remove();
                          if (is_wait) {
                            that.kag.cancelWeakStop();
                            "false" !== pm.next && that.kag.ftag.nextOrder();
                          }
                        }
                      );
                }
              );
          } else {
            j_img.stop(!0, !0);
            j_img.attr("src", folder + storage_url);
            if (is_wait) {
              that.kag.cancelWeakStop();
              "false" !== pm.next && that.kag.ftag.nextOrder();
            }
          }
          that.kag.stat.charas[pm.name].storage = storage_url;
          if (!is_wait) {
            that.kag.cancelWeakStop();
            "false" !== pm.next && that.kag.ftag.nextOrder();
          }
        });
      else {
        that.kag.cancelWeakStop();
        "false" !== pm.next && this.kag.ftag.nextOrder();
      }
    } else {
      this.kag.stat.charas[pm.name].storage = storage_url;
      this.kag.stat.charas[pm.name].reflect = pm.reflect;
      this.kag.cancelWeakStop();
      "false" !== pm.next && this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.chara_move = {
  vital: ["name"],
  pm: {
    name: "",
    time: "600",
    anim: "false",
    left: "",
    top: "",
    width: "",
    height: "",
    effect: "",
    wait: "true",
  },
  start: function (pm) {
    var that = this,
      target_obj = this.kag.chara.getCharaContainer(pm.name),
      target_img = target_obj.find("img");
    if (target_obj.get(0)) {
      var anim_style = {},
        img_anim_style = {};
      "" != pm.left && (anim_style.left = pm.left + "px");
      "" != pm.top && (anim_style.top = pm.top + "px");
      if ("" != pm.width) {
        anim_style.width = pm.width;
        img_anim_style.width = pm.width;
      }
      if ("" != pm.height) {
        anim_style.height = pm.height;
        img_anim_style.height = pm.height;
      }
      if ("" != pm.name)
        if ("true" == pm.anim) {
          target_obj
            .stop(!0, !0)
            .animate(anim_style, parseInt(pm.time), pm.effect, function () {
              "true" == pm.wait && that.kag.ftag.nextOrder();
            });
          target_img
            .stop(!0, !0)
            .animate(
              img_anim_style,
              parseInt(pm.time),
              pm.effect,
              function () {}
            );
        } else
          target_obj
            .stop(!0, !0)
            .fadeTo(
              parseInt(that.kag.cutTimeWithSkip(pm.time)) / 2,
              0,
              function () {
                target_obj.css(anim_style);
                target_img.css(img_anim_style);
                target_obj
                  .stop(!0, !0)
                  .fadeTo(
                    parseInt(that.kag.cutTimeWithSkip(pm.time)) / 2,
                    1,
                    function () {
                      "true" == pm.wait && that.kag.ftag.nextOrder();
                    }
                  );
              }
            );
      "false" == pm.wait && this.kag.ftag.nextOrder();
    } else that.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.chara_face = {
  vital: ["name", "face", "storage"],
  pm: { name: "", face: "", storage: "" },
  start: function (pm) {
    var storage_url = "";
    storage_url = ($.isHTTP(pm.storage), pm.storage);
    const chara = this.kag.stat.charas[pm.name];
    if (chara) {
      chara.map_face[pm.face] = storage_url;
      this.kag.ftag.nextOrder();
    } else {
      this.kag.error("undefined_character", pm);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.chara_layer = {
  vital: ["name", "part", "id", "storage"],
  pm: { name: "", part: "", id: "", storage: "", zindex: "" },
  start: function (pm) {
    var cpm = this.kag.stat.charas[pm.name];
    if (null != cpm) {
      var chara_layer = {};
      cpm._layer ? (chara_layer = cpm._layer) : (cpm._layer = {});
      var chara_part = {},
        init_part = !1;
      if (chara_layer[pm.part]) chara_part = chara_layer[pm.part];
      else {
        init_part = !0;
        cpm._layer[pm.part] = {
          default_part_id: pm.id,
          current_part_id: pm.id,
          zindex: pm.zindex,
        };
      }
      var chara_obj = {};
      chara_part[pm.id]
        ? (chara_obj = chara_part[pm.id])
        : ((chara_obj = { storage: "", zindex: "" }).visible =
            1 == init_part ? "true" : "false");
      cpm._layer[pm.part][pm.id] = $.extendParam(pm, chara_obj);
      this.kag.ftag.nextOrder();
    } else this.kag.error("undefined_character", pm);
  },
};
tyrano.plugin.kag.tag.chara_layer_mod = {
  vital: ["name", "part"],
  pm: { name: "", part: "", zindex: "" },
  start: function (pm) {
    var cpm = this.kag.stat.charas[pm.name];
    if (null != cpm)
      if (cpm._layer) {
        cpm._layer[pm.part] && (cpm._layer[pm.part].zindex = pm.zindex);
        this.kag.ftag.nextOrder();
      } else this.kag.error("undefined_character_parts", pm);
    else this.kag.error("undefined_character", pm);
  },
};
tyrano.plugin.kag.tag.chara_part = {
  vital: ["name"],
  pm: { name: "", allow_storage: "false", time: "", wait: "true" },
  start: function (pm) {
    var that = this,
      cpm = this.kag.stat.charas[pm.name];
    if (null != cpm)
      if (cpm._layer) {
        var chara_part = cpm._layer,
          map_part = {},
          array_storage = [];
        for (let key in pm)
          if (chara_part[key]) {
            var part_id = pm[key];
            if (chara_part[key][part_id]) {
              var part = chara_part[key][part_id];
              part.id = part_id;
              map_part[key] = part;
              "none" != part.storage &&
                array_storage.push("./data/fgimage/" + part.storage);
              this.kag.stat.charas[pm.name]._layer[key].current_part_id =
                part_id;
            } else if ("true" == pm.allow_storage) {
              map_part[key] = { storage: part_id, id: part_id };
              array_storage.push("./data/fgimage/" + part_id);
              this.kag.stat.charas[pm.name]._layer[key].current_part_id =
                "allow_storage";
              this.kag.stat.charas[pm.name]._layer[key].allow_storage = part_id;
            }
          }
        var target_obj = this.kag.chara.getCharaContainer(pm.name);
        this.kag.preloadAll(array_storage, function () {
          if ("" != pm.time) {
            var n = 0,
              cnt = 0;
            for (let key in map_part)
              !(function () {
                cnt++;
                var part = map_part[key],
                  j_img = target_obj.find(".part." + key),
                  j_new_img = j_img.clone();
                j_new_img.css("opacity", 0);
                "none" != part.storage
                  ? j_new_img.attr("src", "./data/fgimage/" + part.storage)
                  : j_new_img.attr(
                      "src",
                      "./tyrano/images/system/transparent.png"
                    );
                pm[key + "_zindex"]
                  ? j_new_img.css("z-index", pm[key + "_zindex"])
                  : j_new_img.css("z-index", chara_part[key].zindex);
                j_img.after(j_new_img);
                j_img.stop(!0, !0).fadeTo(parseInt(pm.time), 0, function () {
                  j_img.remove();
                });
                j_new_img
                  .stop(!0, !0)
                  .fadeTo(parseInt(pm.time), 1, function () {
                    n++;
                    "true" == pm.wait && cnt == n && that.kag.ftag.nextOrder();
                  });
              })();
            "false" == pm.wait && that.kag.ftag.nextOrder();
          } else {
            for (let key in map_part) {
              var part = map_part[key],
                j_img = target_obj.find(".part." + key);
              "none" != part.storage
                ? j_img.attr("src", "./data/fgimage/" + part.storage)
                : j_img.attr("src", "./tyrano/images/system/transparent.png");
              pm[key + "_zindex"]
                ? j_img.css("z-index", pm[key + "_zindex"])
                : j_img.css("z-index", chara_part[key].zindex);
            }
            that.kag.ftag.nextOrder();
          }
        });
      } else this.kag.error("undefined_character_parts", pm);
    else this.kag.error("undefined_character", pm);
  },
};
tyrano.plugin.kag.tag.chara_part_reset = {
  vital: ["name"],
  pm: { name: "", part: "" },
  start: function (pm) {
    var cpm = this.kag.stat.charas[pm.name];
    if (null != cpm)
      if (cpm._layer) {
        var chara_part = cpm._layer,
          new_pm = { name: pm.name };
        if ("" == pm.part)
          for (let key in chara_part)
            new_pm[key] = chara_part[key].default_part_id;
        else
          for (
            var array_part = pm.part.split(","), i = 0;
            i < array_part.length;
            i++
          ) {
            var key = array_part[i];
            chara_part[key] && (new_pm[key] = chara_part[key].default_part_id);
          }
        this.kag.ftag.startTag("chara_part", new_pm);
      } else this.kag.error("undefined_character_parts");
    else this.kag.error("undefined_character");
  },
};
tyrano.plugin.kag.tag.showlog = {
  pm: {},
  start: function (pm) {
    this.kag.menu.displayLog();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.filter = {
  vital: [],
  pm: {
    layer: "all",
    page: "fore",
    name: "",
    grayscale: "",
    sepia: "",
    saturate: "",
    hue: "",
    invert: "",
    opacity: "",
    brightness: "",
    contrast: "",
    blur: "",
  },
  buildFilterPropertyValue: function (pm) {
    let filter_str = "";
    "" != pm.grayscale && (filter_str += "grayscale(" + pm.grayscale + "%) ");
    "" != pm.sepia && (filter_str += "sepia(" + pm.sepia + "%) ");
    "" != pm.saturate && (filter_str += "saturate(" + pm.saturate + "%) ");
    "" != pm.hue && (filter_str += "hue-rotate(" + pm.hue + "deg) ");
    "" != pm.invert && (filter_str += "invert(" + pm.invert + "%) ");
    "" != pm.opacity && (filter_str += "opacity(" + pm.opacity + "%) ");
    "" != pm.brightness &&
      (filter_str += "brightness(" + pm.brightness + "%) ");
    "" != pm.contrast && (filter_str += "contrast(" + pm.contrast + "%) ");
    "" != pm.blur && (filter_str += "blur(" + pm.blur + "px) ");
    return filter_str;
  },
  start: function (pm) {
    var j_obj = {};
    j_obj =
      "all" == pm.layer
        ? $(".layer_camera")
        : this.kag.layer.getLayer(pm.layer, pm.page);
    "" != pm.name && (j_obj = j_obj.find("." + pm.name));
    const filter_str = this.buildFilterPropertyValue(pm);
    j_obj.setFilterCSS(filter_str, !1);
    j_obj.addClass("tyrano_filter_effect");
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.free_filter = {
  vital: [],
  pm: { layer: "", page: "fore", name: "" },
  start: function (pm) {
    var j_obj;
    j_obj =
      "" == pm.layer
        ? $(".tyrano_filter_effect")
        : this.kag.layer.getLayer(pm.layer, pm.page);
    "" != pm.name && (j_obj = j_obj.find("." + pm.name));
    j_obj.css({ "-webkit-filter": "", "-ms-filter": "", "-moz-filter": "" });
    j_obj.removeClass("tyrano_filter_effect");
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.position_filter = {
  vital: [],
  pm: {
    layer: "message0",
    page: "fore",
    remove: "false",
    grayscale: "",
    sepia: "",
    saturate: "",
    hue: "",
    invert: "",
    opacity: "",
    brightness: "",
    contrast: "",
    blur: "",
  },
  start: function (pm) {
    const j_message_layer = this.kag.layer.getLayer(pm.layer, pm.page),
      j_message_outer = j_message_layer.find(".message_outer");
    j_message_layer.find(".message_filter").remove();
    if ("true" === pm.remove) {
      this.kag.ftag.nextOrder();
      return;
    }
    const j_message_outer_clone = j_message_outer.clone();
    j_message_outer_clone
      .removeClass("message_outer")
      .addClass("message_filter");
    j_message_outer_clone.css({
      opacity: "1",
      "background-image": "none",
      "background-color": "transparent",
    });
    const filter_str =
      this.kag.ftag.master_tag.filter.buildFilterPropertyValue(pm);
    j_message_outer_clone.css({
      "-webkit-backdrop-filter": filter_str,
      "backdrop-filter": filter_str,
    });
    j_message_outer_clone.insertBefore(j_message_outer);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.web = {
  vital: ["url"],
  pm: { url: "" },
  start: function (pm) {
    if (-1 == pm.url.indexOf("http")) window.open(pm.url);
    else if ($.isNWJS()) {
      require("nw.gui").Shell.openExternal(pm.url);
    } else if ($.isElectron()) {
      require("electron").shell.openExternal(pm.url);
    } else $.isTyranoPlayer() ? $.openWebFromApp(pm.url) : window.open(pm.url);
    this.kag.ftag.nextOrder();
  },
};
