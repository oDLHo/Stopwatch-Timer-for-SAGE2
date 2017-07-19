var stopwatch = SAGE2_App.extend({

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
				this.drawStopWatch()
    },

    //load function allows application to begin with a particular state.  Needed for remote site collaboration.
    load: function(date) {
        //your load code here- update app based on this.state
    },

    draw: function(date) {
        // application specific 'draw'
    },

    resize: function(date) {
      if(this.layout == "stopWatch"){
        this.drawStopWatch();
      }else {
        this.drawTimer();
      }
      this.changeTimerText(this);
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
			this.clearTime(this)
			clearInterval(this.stopclock);
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

			var button = this.timerText.append("g")
					.attr("class", "bar-button")
					.attr("cursor", "pointer")
					.attr("transform", function(d, i) { return "translate("+ -$($('.timerText')[0]).width()/1 +","+ 0 +")"; })
					.on("click", function () { _this.changeTimer() } )

			var buttonRect = button.append("rect")
					.style("fill", "#c7ff00")

			button.append("text")
					.attr("x", $($('.timerText')[0]).width())
					.attr("y", 18)
					.attr("dy", ".35em")
					.attr('class', 'bar-button-text')
					.style("font-size", "40%")
					.style("text-anchor", "start")
					.text(function(d) { return "Change Overlay"; });

			buttonRect.attr("width", $('.bar-button-text')[0].getBBox().width+5)
					.attr("height", $('.bar-button-text')[0].getBBox().height)
					.attr("x",$('.bar-button-text')[0].getBBox().x - 5)


			this.time = this.timerText
				.append('g')
					.attr("transform", function() { return "translate("+ $($('.timerText')[0]).width()/5.5 +","+ $($('.timerText')[0]).height()/1.5 +")"; })
				.append("text")
					.style("width", "100%")
					.style("height", "25%")
					.style("font-size", "200%")
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


      this.startText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/15 +","+ $($('.timerText')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
        .text("Start")


			this.pauseButton = this.buttonRow.append('rect')
				.attr("id", "pauseButton")
				.attr("fill", "#000000")
				.style("color", "#ffffff")
				.attr("width", $($('.buttonRow')[0]).width()/3)
				.attr("height", $($('.buttonRow')[0]).height())
				.attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/3 +","+ 0 +")"; })
				.on("click" , function(){ _this.pauseTimer();})


      this.pauseText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/2.6 +","+ $($('.timerText')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
        .text("Pause")


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

      this.stopText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/1.36 +","+ $($('.timerText')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
        .text("Stop")
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


			var button = this.timerText.append("g")
					.attr("class", "bar-button")
					.attr("cursor", "pointer")
					.attr("transform", function(d, i) { return "translate("+ -$($('.timerText')[0]).width()/1 +","+ 0 +")"; })
					.on("click", function () { _this.changeTimer() } )

			var buttonRect = button.append("rect")
					.style("fill", "#c7ff00")

			button.append("text")
					.attr("x", $($('.timerText')[0]).width())
					.attr("y", 18)
					.attr("dy", ".35em")
					.attr('class', 'bar-button-text')
					.style("font-size", "40%")
					.style("text-anchor", "start")
					.text(function(d) { return "Change Overlay"; });

			buttonRect.attr("width", $('.bar-button-text')[0].getBBox().width+5)
					.attr("height", $('.bar-button-text')[0].getBBox().height)
					.attr("x",$('.bar-button-text')[0].getBBox().x - 5)


			this.time = this.timerText
				.append('g')
					.attr("transform", function() { return "translate("+ $($('.timerText')[0]).width()/3.8 +","+ $($('.timerText')[0]).height()/1.2 +")"; })
				.append("text")
					.style("font-size", "150%")
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


			this.hourBox = this.hourGroup
				.append("rect")
				.attr("class", "hourBox")
				.attr("fill", "#ff0000")
				.attr("width", $($('.adjustRow')[0]).width()/3.5)
				.attr("height", $($('.adjustRow')[0]).height())


			this.hourAdjustBox = this.hourGroup
				.append("rect")
				.attr("fill", "#00ff12")
				.attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
				.attr("height", $($('.adjustRow')[0]).height()/2)
				.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ 0 +")"; })
        .on("click", function() { _this.increaseHour(_this) } )


      this.decreaseMinuteAdjustBox = this.hourGroup
        .append("rect")
        .attr("fill", "#ff0000")
        .attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
        .attr("height", $($('.adjustRow')[0]).height()/2)
        .attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ $($('.adjustRow')[0]).height()/2 +")"; })
        .on("click", function() { _this.decreaseHour(_this) } )


      this.hourText = this.hourGroup.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.adjustRow')[0]).width()/25 +","+ $($('.adjustRow')[0]).height()/1.5 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "80%")
        .text("Hour")


			this.minuteGroup = this.adjustRow
				.append("g")
				.attr("class", "minuteAdjustment")
				.attr("fill", "#eb00ff")
				.style("background-color", "#6dff41")
				.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3 +","+ 0 +")"; })


			this.minuteBox = this.minuteGroup
				.append("rect")
				.attr("class", "minuteBox")
				.attr("fill", "#2be7db")
				.attr("width", $($('.adjustRow')[0]).width()/3.5)
				.attr("height", $($('.adjustRow')[0]).height())


			this.increaseMinuteAdjustBox = this.minuteGroup
				.append("rect")
				.attr("fill", "#00ff12")
				.attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
				.attr("height", $($('.adjustRow')[0]).height()/2)
				.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ 0 +")"; })
        .on("click", function() { _this.increaseMinute(_this) } )

      this.decreaseMinuteAdjustBox = this.minuteGroup
  			.append("rect")
  			.attr("fill", "#ff0000")
  			.attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
  			.attr("height", $($('.adjustRow')[0]).height()/2)
  			.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ $($('.adjustRow')[0]).height()/2 +")"; })
        .on("click", function() { _this.decreaseMinute(_this) } )


      this.minuteText = this.minuteGroup.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.adjustRow')[0]).width()/50 +","+ $($('.adjustRow')[0]).height()/1.5 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "80%")
        .text("Minute")


			this.secondGroup = this.adjustRow
				.append("g")
				.attr("class", "secondAdjustment")
				.attr("fill", "#ff0000")
				.style("background-color", "#6dff41")
				.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/1.5+","+ 0 +")"; })


			this.secondBox = this.secondGroup
				.append("rect")
				.attr("class", "secondBox")
				.attr("fill", "#ff0000")
				.attr("width", $($('.adjustRow')[0]).width()/3.5)
				.attr("height", $($('.adjustRow')[0]).height())


			this.increaseSecondAdjustBox = this.secondGroup
				.append("rect")
				.attr("fill", "#00ff12")
				.attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
				.attr("height", $($('.adjustRow')[0]).height()/2)
				.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ 0 +")"; })
        .on("click", function() { _this.increaseSecond(_this) } )


      this.decreaseSecondAdjustBox = this.secondGroup
  			.append("rect")
  			.attr("fill", "#ff0000")
  			.attr("width", ($($('.adjustRow')[0]).width()/3) - ($($('.adjustRow')[0]).width()/3.5))
  			.attr("height", $($('.adjustRow')[0]).height()/2)
  			.attr("transform", function() { return "translate("+ $($('.adjustRow')[0]).width()/3.5 +","+ $($('.adjustRow')[0]).height()/2 +")"; })
        .on("click", function() { _this.decreaseSecond(_this) } )


      this.secondText = this.secondGroup.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.adjustRow')[0]).width()/50 +","+ $($('.adjustRow')[0]).height()/1.5 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "80%")
        .text("Second")


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


      this.startText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/15 +","+ $($('.buttonRow')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
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


      this.pauseText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/2.6 +","+ $($('.buttonRow')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
        .on("click" , function(){ _this.pauseTimer();})
        .text("Pause")



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


      this.stopText = this.buttonRow.append("text")
        .attr("transform", function(d, i) { return "translate("+ $($('.timerText')[0]).width()/1.36 +","+ $($('.buttonRow')[0]).height()/2 +")"; })
        .attr("fill", "#ffffff")
        .style("font-size", "100%")
        .on("click" , function(){ _this.stopTimer();})
        .text("Stop")


		},

		startTimer: function(){
			this.state.running = true;
			_this = this;
			clearInterval(_this.stopclock);
			if(this.layout == "stopWatch"){
				_this.stopclock = setInterval(function(){
					if(_this.state.running){
						_this.adjustSecond(_this)
						_this.changeTimerText(_this)
					}
				},1000)
			}else if(this.layout == "countDown"){
				_this.stopclock = setInterval(function(){
					if(_this.state.running){
						_this.adjustSecond(_this)
						_this.changeTimerText(_this)
					}
				},1000)
			}
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

		adjustHour: function(_this){
				if(_this.layout == "stopWatch"){ _this.hours++; }
				else if(_this.layout == "countDown"){
          if( _this.hours > 0 ){
            _this.hours--;
          }
        }
		},

		adjustMinute: function(_this){
			if(_this.layout == "stopWatch"){
				if(_this.minutes < 59){
					_this.minutes++;
				}else{
          _this.minute = 0;
          _this.adjustHour(_this);
        }
			}else if(_this.layout == "countDown"){
        if(_this.minutes >= 0){
					_this.minutes--;
					if(_this.minutes == -1){
            if(_this.hours == 0){
              _this.minutes = 0;
            }else{
						  _this.minutes = 59;
						  _this.adjustHour(_this);
            }
					}
				}
			}
		},

		adjustSecond: function(_this){
			if(_this.layout == "stopWatch"){

				if(_this.seconds < 59){
					_this.seconds++;
				}else{
					_this.seconds = 0;
					_this.adjustMinute(_this);
				}

			} else if(_this.layout == "countDown"){

				if(_this.seconds >= 0){
					_this.seconds--;
					if(_this.seconds == -1){
            if(_this.hours == 0 && _this.minutes == 0){
              _this.seconds = 0;
              _this.stopTimer();
            }else{
						  _this.seconds = 59;
						  _this.adjustMinute(_this);
            }
					}
				}
			}

		},

    increaseHour: function(_this){
      _this.hours += 1
      _this.changeTimerText(_this);
    },

    increaseMinute: function(_this){
      _this.minutes += 1
      _this.changeTimerText(_this);
    },

    increaseSecond: function(_this){
      _this.seconds += 1
      _this.changeTimerText(_this);
    },

    decreaseHour: function(_this){
      _this.hours -= 1
      _this.changeTimerText(_this);
    },

    decreaseMinute: function(_this){
      _this.minutes -= 1
      _this.changeTimerText(_this);
    },

    decreaseSecond: function(_this){
      _this.seconds -= 1
      _this.changeTimerText(_this);
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
