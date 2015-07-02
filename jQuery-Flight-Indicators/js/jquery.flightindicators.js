/* 
* jQuery Flight Indicators plugin
* By Sébastien Matton (seb_matton@hotmail.com)
* Published under GPLv3 License.
* 
* https://github.com/sebmatton/jQuery-Flight-Indicators
*/
(function($) {
	function FlightIndicator( placeholder, type, options ) {
		// Initial configuration
		var attitude = this;
		var settings = $.extend({
			size : 200,
			roll : 0,
			pitch : 0,
			turn : 0,
			slip: 0,
			heading: 0,
			beaconone: 90,
			beacononeshow: true,
			beacontwo: 30,
			beacontwoshow: true,
			vario: 0,
			airspeed: 0,
			altitude: 0,
			pressure: 30,
			showBox : true,
			img_directory : 'img/'
		}, options );

		var constants = {
			pitch_bound:30,
			vario_bound : 1.95,
			airspeed_bound_l : 0,
			airspeed_bound_h : 160
		}

		// Creation of the instrument
		placeholder.each(function(){
			switch(type){
				case 'heading':
					$(this).html('<div class="instrument heading"><div class="heading box"><img src="' + settings.img_directory + 'heading_yaw.svg" class="box" alt="" /></div><div class="beacontwo box"><img src="' + settings.img_directory + 'heading_beacontwo.svg" class="box" alt="" /></div><div class="beaconone box"><img src="' + settings.img_directory + 'heading_beaconone.svg" class="box" alt="" /></div><div class="mechanics box"><img src="' + settings.img_directory + 'heading_foreground.svg" class="box" alt="" /></div></div>');
					_setHeading(settings.heading);
					_setBeaconTwo(settings.beacontwo, settings.beacontwoshow);
					_setBeaconOne(settings.beaconone, settings.beacononeshow);
				break;
				case 'variometer':
					$(this).html('<div class="instrument vario"><img src="' + settings.img_directory + 'vertical_foreground.svg" class="box" alt="" /><div class="vario box"><img src="' + settings.img_directory + 'vertical_hand.svg" class="box" alt="" /></div><div class="mechanics box"></div></div>');
					_setVario(settings.vario);
				break;
				case 'turn_coordinator':
					//$(this).html('<div class="instrument turn_coordinator"><img src="' + settings.img_directory + 'turn_coordinator.svg" class="box" alt="" /><div class="turn box"><img src="' + settings.img_directory + 'turn_coordinator_airplane.svg" class="box" alt="" /></div><div class="mechanics box"></div></div>');
					$(this).html('<div class="instrument turn_coordinator"><div class="background box"><img src="' + settings.img_directory + 'turn_coordinator_background.svg" class="box" alt="" /></div><div class="ball box"><img src="' + settings.img_directory + 'turn_coordinator_ball.svg" class="box" alt="" /></div><div class="shine box"><img src="' + settings.img_directory + 'turn_coordinator_foreground_shine.svg" class="box" alt="" /></div><div class="turn box"><img src="' + settings.img_directory + 'turn_coordinator_airplane.svg" class="box" alt="" /></div><div class="foreground box"><img src="' + settings.img_directory + 'turn_coordinator_foreground.svg" class="box" alt="" /></div></div>');
					_setTurn(settings.turn);
					_setSlip(settings.slip);
				break;
				case 'airspeed':
					$(this).html('<div class="instrument airspeed"><img src="' + settings.img_directory + 'airspeed_foreground.svg" class="box" alt="" /><div class="speed box"><img src="' + settings.img_directory + 'airspeed_hand.svg" class="box" alt="" /></div><div class="mechanics box"></div></div>');
					_setAirSpeed(settings.airspeed);
				break
				case 'altimeter':
					$(this).html('<div class="instrument altimeter"><div class="pressureinhg box"><img src="' + settings.img_directory + 'altimeter_pressure_inhg.svg" class="box" alt="" /></div><div class="pressurembar box"><img src="' + settings.img_directory + 'altimeter_pressure_mbar.svg" class="box" alt="" /></div><div class="foreground box"><img src="' + settings.img_directory + 'altimeter_foreground.svg" class="box" alt="" /></div><div class="hand10000 box"><img src="' + settings.img_directory + 'altimeter_hand_10000ft.svg" class="box" alt="" /></div><div class="midground box"><img src="' + settings.img_directory + 'altimeter_mid.svg" class="box" alt="" /></div><div class="hand1000 box"><img src="' + settings.img_directory + 'altimeter_hand_1000ft.svg" class="box" alt="" /></div><div class="hand100 box"><img src="' + settings.img_directory + 'altimeter_hand_100ft.svg" class="box" alt="" /></div></div>');
					_setAltitude(settings.altitude);
					_setPressure(settings.pressure);
				break;
				default:
					$(this).html('<div class="instrument attitude"><div class="roll box"><img src="' + settings.img_directory + 'horizon_back.svg" class="box" alt="" /><div class="pitch box"><img src="' + settings.img_directory + 'horizon_ball.svg" class="box" alt="" /></div><img src="' + settings.img_directory + 'horizon_circle.svg" class="box" alt="" /></div><div class="mechanics box"><img src="' + settings.img_directory + 'horizon_foreground.svg" class="box" alt="" /></div></div>');
					_setRoll(settings.roll);
					_setPitch(settings.pitch);
			}
			$(this).find('div.instrument').css({height : settings.size, width : settings.size});
			$(this).find('div.instrument img.box.background').toggle(settings.showBox);
		});

		// Private methods
		function _setRoll(roll){
			placeholder.each(function(){
				$(this).find('div.instrument.attitude div.roll').css('transform', 'rotate('+roll+'deg)');
			});
		}

		function _setPitch(pitch){
			// alert(pitch);
			if(pitch>constants.pitch_bound){pitch = constants.pitch_bound;}
			else if(pitch<-constants.pitch_bound){pitch = -constants.pitch_bound;}
			placeholder.each(function(){
				$(this).find('div.instrument.attitude div.roll div.pitch').css('top', pitch*0.25 + '%');
			});
		}

		function _setHeading(heading){
			placeholder.each(function(){
				$(this).find('div.instrument.heading div.heading').css('transform', 'rotate(' + -heading + 'deg)');
			});	
		}

		function _setBeaconOne(heading, visible){
			if (visible) placeholder.each(function(){
				$(this).find('div.instrument.heading div.beaconone').show().css('transform', 'rotate(' + heading + 'deg)');
			});	
			else placeholder.each(function(){
				$(this).find('div.instrument.heading div.beaconone').hide();
			});
		}		

		function _setBeaconTwo(heading, visible){
			if (visible) placeholder.each(function(){
				$(this).find('div.instrument.heading div.beacontwo').show().css('transform', 'rotate(' + heading + 'deg)');
			});	
			else placeholder.each(function(){
				$(this).find('div.instrument.heading div.beacontwo').hide();
			});
		}				

		function _setTurn(turn){
			placeholder.each(function(){
				$(this).find('div.instrument.turn_coordinator div.turn').css('transform', 'rotate('+ turn +'deg)');
			});
		}

		function _setSlip(slip) {

			if (slip < 0) slip = 0;
			if (slip > 100) slip = 100;

			console.log(slip);

			/*
			placeholder.each(function(){
				$(this).find('div.instrument.turn_coordinator div.ball').css('transform', 'rotate('+ slip +'deg)');
			});
			*/

		}

		function _setVario(vario){
			if(vario > constants.vario_bound){vario = constants.vario_bound;}
			else if(vario < -constants.vario_bound){vario = -constants.vario_bound;}
			vario = vario*90;
			placeholder.each(function(){
				$(this).find('div.instrument.vario div.vario').css('transform', 'rotate(' + vario + 'deg)');
			});	
		}

		function _setAirSpeed(speed){
			if(speed > constants.airspeed_bound_h){speed = constants.airspeed_bound_h;}
			else if(speed < constants.airspeed_bound_l){speed = constants.airspeed_bound_l;}
			speed = speed*2;
			placeholder.each(function(){
				$(this).find('div.instrument.airspeed div.speed').css('transform', 'rotate(' + speed + 'deg)');
			});	
		}

		function _setAltitude(altitude){
			var hand100 = altitude / 100 * 360;
			var hand1000 = altitude / 1000 * 360;
			var hand10000 = altitude / 10000 * 360;
			placeholder.each(function(){
				$(this).find('div.instrument.altimeter div.hand100').css('transform', 'rotate(' + hand100 + 'deg)');
				$(this).find('div.instrument.altimeter div.hand1000').css('transform', 'rotate(' + hand1000 + 'deg)');
				$(this).find('div.instrument.altimeter div.hand10000').css('transform', 'rotate(' + hand10000 + 'deg)');
			});	
		}


		function _setPressure(pressure){

			// Code for inHg
			if (pressure >= 27.1 && pressure <= 33) {

				// 5 units = 9 degrees
				pressure1 = (925 - 33.8639 * pressure) * 1.8;
				placeholder.each(function(){
					$(this).find('div.instrument.altimeter div.pressurembar').css('transform', 'rotate(' + pressure1 + 'deg)');
				});	

				// 0.1 units = 6 degrees
				pressure2 = (pressure - 27.1) * 60;
				placeholder.each(function(){
					$(this).find('div.instrument.altimeter div.pressureinhg').css('transform', 'rotate(' + -pressure2 + 'deg)');
				});

			}

			// Code for milibars
			/*
			if (pressure >= 925 && pressure <= 1120) {

				// 5 units = 9 degrees
				pressure1 = (925 - pressure) * 1.8;
				placeholder.each(function(){
					$(this).find('div.instrument.altimeter div.pressurembar').css('transform', 'rotate(' + pressure1 + 'deg)');
				});	

				// 0.1 units = 6 degrees
				pressure2 = (pressure * 0.0295300 - 27.1) * 60;
				placeholder.each(function(){
					$(this).find('div.instrument.altimeter div.pressureinhg').css('transform', 'rotate(' + -pressure2 + 'deg)');
				});

			}
			*/

		}

		function _resize(size){
			placeholder.each(function(){
				$(this).find('div.instrument').css({height : size, width : size});
			});
		}

		function _showBox(){
			placeholder.each(function(){
				$(this).find('img.box.background').show();
			});
		}

		function _hideBox(){
			placeholder.each(function(){
				$(this).find('img.box.background').hide();
			});
		}

		// Public methods
		this.setRoll = function(roll){_setRoll(roll);}
		this.setPitch = function(pitch){_setPitch(pitch);}
		this.setHeading = function(heading){_setHeading(heading);}
		this.setBeaconOne = function(heading, visible){_setBeaconOne(heading, visible);}
		this.setBeaconTwo = function(heading, visible){_setBeaconTwo(heading, visible);}
		this.setTurn = function(turn){_setTurn(turn);}
		this.setSlip = function(slip){_setSlip(slip);}
		this.setVario = function(vario){_setVario(vario);}
		this.setAirSpeed = function(speed){_setAirSpeed(speed);}
		this.setAltitude = function(altitude){_setAltitude(altitude);}
		this.setPressure = function(pressure){_setPressure(pressure);}
		this.resize = function(size){_resize(size);}
		this.showBox = function(){_showBox();}
		this.hideBox = function(){_hideBox();}

		return attitude;
	};

	// Extension to jQuery
	$.flightIndicator = function(placeholder, type, options){
		var flightIndicator = new FlightIndicator($(placeholder), type, options)
		return flightIndicator;
	}

	$.fn.flightIndicator = function(data, type, options){
		return this.each(function(){
			$.flightIndicator(this, type, options);
		});
	}
}( jQuery ));
