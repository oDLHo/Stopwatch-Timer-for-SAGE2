var testTimer = SAGE2_App.extend( {
    init: function(data) {
        // data: contains initialization parameters, such as `x`, `y`, `width`, `height`, and `date`
        this.SAGE2Init('div',data);
				this.passSAGE2PointerAsMouseEvents = true;
				this.element.style.backgroundColor = 'black';
				this.hours = 0;
				this.minutes = 0;
				this.seconds = 0;
				this.layout = "stopWatch"
        this.resizeEvents = "continuous";//see below for other options
				var _this = this;
				this.drawStopWatch()
				this.changeTimer()
    },

    //load function allows application to begin with a particular state.  Needed for remote site collaboration.
    load: function(date) {
        //your load code here- update app based on this.state
    },

    draw: function(date) {
        // application specific 'draw'
    },

    resize: function(date) {
        // to do:  may be a super class resize
        // or your resize code here
        this.refresh(date); //redraw after resize
    },

    event: function(type, position, user, data, date) {
        // see event handling description below

        // may need to update state here

        // may need to redraw
        this.refresh(date);
    },

    move: function(date) {
        // this.sage2_x, this.sage2_y give x,y position of upper left corner of app in global wall coordinates
                // this.sage2_width, this.sage2_height give width and height of app in global wall coordinates
                // date: when it happened
        this.refresh(date);
       },

    quit: function() {
        // It's the end
        this.log("Done");
    },

		changeTimer: function(){
			if(this.layout != "stopWatch"){
				this.drawStopWatch();
				this.layout = "stopWatch";
			}else {
				this.drawTimer();
				this.layout = "countDown";
			}
		},

		drawStopWatch: function(){
			d3.select(this.element).selectAll("*").remove();
			var _this = this;

			this.timerText = d3.select(this.element)
				.append("svg")
				.attr("class", "timerText")
				.style("background-color", "#ffffff")
				.style("width", "100%")
				.style("height", "50%")
				.style("font-size", "500%")


			this.time = this.timerText
				.append('g')
					.attr("transform", function() { return "translate("+ $($('.timerText')[0]).width()/2 +","+ $($('.timerText')[0]).height()/2 +")"; })
				.append("text")
					.style("width", "100%")
					.style("height", "25%")
					.attr("class", "timeText")
					.text("00:00:00")


			this.buttonRow = d3.select(this.element)
				.append("svg")
				.attr("class", "buttonRow")
				.style("background-color", "#ffffff")
				.style("width", "100%")
				.style("height", "50%")
				.style("font-size", "500%")


			this.startButton = this.buttonRow.append('rect')
				.attr("id", "startButton")
				.attr("fill", "#000000")
				.style("color", "#ffffff")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ 0 +","+ 0 +")"; })
				.on("click" , function(){ _this.startTimer();})
				.text("Start")


			this.pauseButton = this.buttonRow.append('rect')
				.attr("id", "pauseButton")
				.attr("fill", "#000000")
				.style("color", "#ffffff")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/3 +","+ 0 +")"; })
				.on("click" , function(){ _this.pauseTimer();})


			this.stopButton = this.buttonRow
				.append('rect')
				.attr("id", "stopButton")
				.style("color", "#ffffff")
				.attr("fill", "#000000")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/1.5 +","+ 0 +")"; })
				.on("click" , function(){ _this.stopTimer();})
				.text("Stop")

				this.pauseButton
					.append("image")
					.attr("width", $('#pauseButton').width())
					.attr("height", $('#pauseButton').height())
					.attr("xlink:href",  _this.resrcPath + "img/pause.png" );

		},

		drawTimer: function(){
			d3.select(this.element).selectAll("*").remove();
			var _this = this;

			this.timerText = d3.select(this.element)
				.append("svg")
				.attr("class", "timerText")
				.style("background-color", "#ffffff")
				.style("width", "100%")
				.style("height", "25%")
				.style("font-size", "500%")


			this.time = this.timerText
				.append('g')
					.attr("transform", function() { return "translate("+ $($('.timerText')[0]).width()/2 +","+ $($('.timerText')[0]).height()/2 +")"; })
				.append("text")
					.style("width", "100%")
					.style("height", "25%")
					.attr("class", "timeText")
					.text("00:00:00")


			this.adjustRow = d3.select(this.element)
				.append("svg")
				.attr("class", "adjustRow")
				.style("background-color", "#ffffff")
				.style("width", "100%")
				.style("height", "25%")
				.style("font-size", "500%")


			this.hourGroup = this.adjustRow
				.append("g")
				.attr("class", "hourAdjustment")
				.attr("fill", "#ff0000")
				.style("background-color", "#6dff41")
				.attr("width", $($('.adjustRow')[0]).width()/3)
				.attr("height", $($('.adjustRow')[0]).height())


			this.buttonRow = d3.select(this.element)
				.append("svg")
				.attr("class", "buttonRow")
				.style("background-color", "#ffffff")
				.style("width", "100%")
				.style("height", "50%")
				.style("font-size", "500%")


			this.startButton = this.buttonRow.append('rect')
				.attr("id", "startButton")
				.attr("fill", "#000000")
				.style("color", "#ffffff")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ 0 +","+ 0 +")"; })
				.on("click" , function(){ _this.startTimer();})
				.text("Start")


			this.pauseButton = this.buttonRow.append('rect')
				.attr("id", "pauseButton")
				.attr("fill", "#000000")
				.style("color", "#ffffff")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/3 +","+ 0 +")"; })
				.on("click" , function(){ _this.pauseTimer();})


			this.stopButton = this.buttonRow
				.append('rect')
				.attr("id", "stopButton")
				.style("color", "#ffffff")
				.attr("fill", "#000000")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/1.5 +","+ 0 +")"; })
				.on("click" , function(){ _this.stopTimer();})
				.text("Stop")

				this.pauseButton
					.append("image")
					.attr("width", $('#pauseButton').width())
					.attr("height", $('#pauseButton').height())
					.attr("xlink:href",  _this.resrcPath + "img/pause.png" );

		},

		startTimer: function(){
			this.state.running = true;
			_this = this;
			clearInterval(_this.stopclock);
			_this.stopclock = setInterval(function(){
				if(_this.state.running){
					_this.addSecond(_this)
					_this.changeTimerText(_this)
				}
			},1000)
		},

		pauseTimer: function(){
			if(this.state.running){
				this.state.running = false;
			}else{
				this.state.running = true;
			}
		},

		stopTimer: function(){
			this.state.running = false;
			this.clearTime(this)
			clearInterval(this.stopclock)
		},

		addHour: function(_this){
				_this.hours++;
		},

		addMinute: function(_this){
			if(_this.minutes < 59){
				_this.minutes++;
			}else{
				_this.minutes = 0;
				_this.addHour(_this);
			}
		},

		addSecond: function(_this){
			if(_this.seconds < 59){
				_this.seconds++;
			}else{
				_this.seconds = 0;
				_this.addMinute(_this);
			}
		},

		changeTimerText: function(_this){
			var hourFormat = ("0" + _this.hours).slice(-2);
			var minuteFormat = ("0" + _this.minutes).slice(-2);
			var secondFormat = ("0" + _this.seconds).slice(-2);
			_this.time.text(hourFormat+":"+minuteFormat+ ":" +secondFormat)
		},

		clearTime: function(_this){
			_this.hours = 0;
			_this.minutes = 0;
			_this.seconds = 0;
			_this.time.text("00:00:00")
		}
});
