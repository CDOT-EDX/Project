/******************************* BEGIN AVATARS ******************************/

/******************* MALE AVATAR START *************************************************/
var maleAvatar = (function (maleLib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
maleLib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};

// symbols:
(maleLib.Watch = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAsgpQAAAAAAAAQAAABABAAQACACACACQACABABABQAKALACAOQAAABAAAAQAAABAAAAQAAACAAACQAAACAAABQAAABgBACQgCANgMALQgOAOgUAAQgNAAgIgFAgggBQAAgBAAgBQAAgNAGgKQABgBAAgBQADgEAEgEQAOgOATAAQAPAAANAIQAAABABAAQAMgDAHgJIAPAeQAMAMgbAOAgMgUIAYASAgggBQgWAOgbABIARAoQAngEATgOQgCgBgCgBQgBAAAAgBQAAAAgBAAQAAAAgBgBQgDgCgCgDQgNgMgBgQgAAQgBIARgPAgPgvIAHgE");
	this.shape.setTransform(8.3,5.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#959577").s().p("AgVApIgFgCIAAAAIgBgBIgBgBIgGgFQgMgMgCgSIAAgCQABgLAFgKIACgCIAGgIQAPgOATAAQAPAAAMAIIABABIABAAIAAABIAFAEIACACQALALABAOIAAABIAAABIAAACIAAAFIAAADQgDANgLALQgPAOgTAAQgLAAgKgFgAABACIARgNgAABACIgCgBgAgBABIgagQgAgbgPIgPgGg");
	this.shape_1.setTransform(9.8,4.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6F502D").s().p("AhRAOQAbgBAWgOQABAQANAMIAFAFIABABIABABIABAAIAEACQgTAOgnAEgABAAAIAAgDIAAgEIAAgBIAAgBQgCgOgKgLIgDgCIgEgEIgBgBIAAAAQAMgDAHgJIAPAeQAMAMgbAOIABgDg");
	this.shape_2.setTransform(8.3,5.2);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1,-1.3,18.5,13);


(maleLib.Torso = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ABqofIAfAcIA8BvIAAAWQACAEACADIACAEIASAXIAKAJABqofIgFgZQhdhqhzBsIgFAkIgZAXIg9BpIABAUQgFCAAQB7IBChdQA/A2A4BBIgEALQAWFQglEpIAZBNIAAABIABAEIgBgEIAAgBIgCgJIACAJADJl3QABACABABAABh2IAWhLIBtjQIgaiOAEggHIACAAIguDKIiYgXIgBAAIAMjDIAAgKIC5AaQgmAogtAVIgXAEIgSgHQgaA7AOAtADFl+QAEB/gPB8IhChdQhGA7g3BHADFhUQADAFABAFQAAADAAACQAAANgMAOIADgEQgJAJgMAAQgKAAgIgGQgCgCgBgBQgIgJAAgOQAAgHACgFQACgEADgEQAAgBABgBQAJgJAMAAQAMAAAJAJQADAEACADQAvAIApgFQgdA5hDgSADPAfQgHADgIgBQgKgBgGgGQgGgGABgGQABgHAIgEQAHgDAJABQAJABAGAGQAFAGgBAGQgBAHgHAEACVhZQgwAAgsgJQATAvAsAHQAPADASgCAFFBzIAAgCQAqhfAHg2AHFifQAJAGAIAGQAAAAAAABQg/CehQBmQgBABgBAAQgBACgCACQACgDABgDAE+CqQACgZACgaACkAzQghgOgcg8ADNA2QgCBBgaAsAHEifIgZgOIgJgFAlIIfIAMALIAiAeIAGAFQBTAWBnAHQAPABAPAAQAYABBTACQABAAABAAQAXAAAWgBQAOgBAPgBQBAgGA3gQQARgFARgGAE+CrQgLDQAaCiIg4AvAjflbQAQgSAKgRAABh2IiGkbIAViBAlHBkQhOhUhAiiQAAgBAAAAQAVgOATgOAhdgXIAAgGAhkgdIiyAWIgBAAIABAAIAAABQAlAnAtAOQAAAAABAAIAVAOIAAgBIARgSIAAAAQAcBEgQA0Ak+BzIgJgPQgnhQgHg4AlMIeQAkjMgYjbIgHgTAibAQQAAAGgHAFIAAABQgGAEgJAAQgKAAgGgFQgGgFAAgGQAAgHAGgFQAGgEAKAAQAJAAAGAEQAHAFAAAHgAidAqIAAAAQAkgGAcg7AjDAvQABA4ARAxAkWgGIAsDJICZgXIgMjDAgUkrQAXAaAfgdAABh2IgCAN");
	this.shape.setTransform(0,-25.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AAMANIgVgQIgHgIIABgFIAgAbIgBAFIAAABIgEgEg");
	this.shape_1.setTransform(-30.1,32.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDEDED").s().p("AgjFlIAAgBIALgBQARAAALAGIgngEgACWjhQgKgBgGgGQgGgGABgGQABgHAHgEQAIgEAJACQAIABAHAGQAFAGgBAGQgBAHgHAEIAAAAQgFACgGAAIgEAAgAjrjnQgGgFgBgGQABgHAGgFQAGgFAKAAQAJAAAGAFQAHAFAAAHQAAAGgHAFIAAABQgGAEgJAAQgKAAgGgFgABukvIgCgDQgJgJAAgOQAAgHACgFIAFgIIACgCQAIgJANAAQAMAAAJAJIAFAHQADAFABAFIAAAFQAAANgMAOIADgEQgJAJgMAAQgLAAgIgGgACTkuQAMgOAAgNIAAgFQgBgFgDgFQAvAIAogFQgVArgsAAQgOAAgQgEgABOkwQgsgHgTgvQAsAJAvAAIgFAIQgCAFAAAHQAAAOAJAJIACADIgPABIgRgCgABukvIAAAAg");
	this.shape_2.setTransform(4.2,0.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000066").s().p("AGMBRIgdgSIABgCIAGAEIABAAQAFAAABgEIgBAAQADgFAEgLIAEgTQAUAKASANQAAAYgLASIgWgKgAmsAuQASgNAUgJIAEATQAEALADAEIgBABQABADADAAIACABIABAAIAGgEIABACIgdARIgJAEIgNAHQgLgSAAgZgAFDAhIAAgBQAAAAAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIABgBIABgCIgBgBQAGgHAQgaQAPAHAIAHQAAABAAAAQAAABABAAQAAABAAAAQABAAABAAIACADIgBABIgEAMIgGAMQgEAJgBAEIAAADQAAABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIACAAIABABIAAAAIgCADIglgagAlpA2IAAgBIABAAIACAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAAAIAAgEQgBgEgEgIIgGgMIgEgNIgBgBIACgCQABAAABgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAIgFAPgKQAOAYAHAIIABABIgBABIABACIABABQAAABAAAAQgBAAAAABQAAAAAAAAQAAAAAAABIAAAAIglAbIgCgDgAEVgHIgCgDIACAAIABgBIABgCIAEgGIAHgLIAOgPQANALANAOIgHAIQgIAMgJANIgBADIACADIgegagAkwANIgBgDIgBgCQgIgMgIgKIgHgJQANgOANgLIAOAPIAHAMIAEAFIAAABIABACIABAAIACABIgCADIgeAZIACgDgAEFgZIgBgBIgDgEQgNgQgMgSIAAgBQANgPAVgIQAOANALAQQgEACgHAHQgJAKgJANIAAADIgBgBgAkFgeIAAAAQgJgMgJgKQgHgHgEgDQALgPAOgNQAVAIANAPIgQAXIgJAMIgDAEIgBAAIgBABIAAgDg");
	this.shape_3.setTransform(-0.2,-52.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDCE91").s().p("AiDgeIAUiBIAFgkQBzhsBdBqIAFAZIAZCOIhtDOIgVBLgAAEBSQANAAAPgNIAAAAIADgCIgDACIAAAAQgPANgNAAIAAAAIgBAAQgLAAgMgMQAMAMALAAIABAAIAAAAg");
	this.shape_4.setTransform(-0.1,-62.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AAvJHIhrgCIgegCQhngHhTgVIgGgGIgigdIgMgMIgEAAIAAgBQAkjLgYjcIACgDIgJgQQgmhOgIg5QAIA5AmBOQhOhShAikIgBgBIAqgcIAGADIABAAIAEgEQAegOAbgQIAAgBQAcgRAXgUIAAAAQAXgUAVgUIABgBIAAgBQAWgZASgdIAAAAIABgBIAAgGQAQgSAKgRIgBgUIA9hpIAZgXIgUCBICFEbIAWhLIBsjQIgZiOIAfAdIA8BuIgBAWIAFAHIACAFIgCgFIACAEIAAABIAAAGIABACIAAAAIAWAfQAQAZAUAXIAAABIABABQAUAUAXATIABAAQAXAUAbARIAAABQAbARAeAOIAEADIABAAIABAAIASAJIAGAEIABAAIAHgCIABAAIASAMIAAABQhACghQBlIgCgBQApheAHg3QgHA3gpBeIgDAFIgEAzIgFAHQAAASAFgYQgLDQAZCjIg4AuIABgCIgCAAIgiALQg2ARhBAFIgcACIgtABIgCAAgAAuJHQgNgHgRAAIgLABIgCgJIABAKIABAAIAAAEIAAgDIApAEIAAAAgAgUH0IAYBOIgYhOQAWi3AAjHQAAh5gHiCQAHCCAAB5QAADHgWC3IAAAAgABbCFIABAAICYAXIAujKIgCAAIi5gaIAAAKQAcA+AhAMQghgMgcg+IAAgKIC5AaIACAAIguDKIiYgXIgBAAIAMjDIgMDDgAjrCcICZgXIgLjDIAAgGIgHAAIAHAGQgdA9giAEIgBAAIgRATIAAAAIgVgOIAVAOIAAAAIARgTIAAABIABgBQAigEAdg9IALDDIiZAXIgrjJQAmApAsAMIABAAIgBAAQgsgMgmgpIAAgBIgBAAIABAAIAAABIArDJgACxB8QAagsAChBQgCBBgaAsgAiRB7QAGgSAAgVQAAglgSgrQASArAAAlQAAAVgGASgACXB0QgEgPAAgRQAAghARgnIASAIIAXgFQAtgTAmgqQgmAqgtATIgXAFIgSgIQgRAnAAAhQAAARAEAPgAixBxQgRgxgBg4QABA4ARAxgACzgiQgHAFgBAGQgBAHAGAFQAGAGAKACQAIABAHgDIAAgBQAHgEABgHQABgGgFgGQgHgGgIgBIgFAAQgGAAgGACgAjBggQgGAFgBAGQABAHAGAEQAGAFAKABQAJAAAGgFIAAgBQAHgEAAgHQAAgGgHgFQgGgGgJAAQgKAAgGAGgAkWguICygWgACrhLQAMAAAJgKIgDAEQBDATAcg6QgoAFgvgHIgFgHQgJgKgMAAQgNAAgIAKIgCABQgvAAgsgJQATAvAsAHQAPADARgCQAIAGALABgAgFiFQA3hHBGg7IBCBdQALhfAAhiIgBg6IABA6QAABigLBfIhChdQhGA7g3BHIADgLQg3hBg/g2IhCBdQgMhdAAhgIABg+IgBA+QAABgAMBdIBChdQA/A2A3BBIgDALgAgCiQIADgNgAkWgtIAAAAgAhdg+gAgFiFgAkKlSIABgBIAAABg");
	this.shape_5.setTransform(0,-21.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAwHwIADAAIAsgBIABADQgUAAgUADIgIgFgAGkkoIgEgEQgegOgbgQIAAgBQgbgRgYgUIAAAAQgXgTgUgVIgBAAIAAgBQgUgXgRgZIgEgGIAAgBIgBgBIAAgIIABgBIAAgEIACAEIABgCIABADQAQgQAXgIIADAAIACABIAPAUIAKAMIAEACIACABIACACIABAAIAAABQAIAGgBAFIASASQADgBADACIAEACIAHAGQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQACADAAADIAUAPQADgBAJAFQANAHABAHIAmAWIACABIAAADQABAcgNAUIADACIAEADIgBABIgCAAIgKgFIAKAFIgHADIgBAAgAFwlSIgBACIAdASIAWAKQALgSAAgYQgSgNgUgKIABgDIgEgFQgGgIgFgBIgCABIgCADIgCgDQgBAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQgIgHgPgJIACgDQgEgDgDgEQgDgDgGgCIgBACQgNgOgNgLIABgCIgCgEIgJgFIgDgDQgLgQgOgNQgVAIgNAPIAAABQAMASANAQIADAEIABABIABABIADACIAAAAIAFAEIADAEIACAEIACADIAeAcIAAABIAHADQAGAEACADQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAIAAABIAlAaIACgDIAGAFgADonRIgJgJgAGtkrgAmkkrIgHgCIgDgBIgBgBIAEgDIADgBQgNgVABgcIAAgCIACgBIAmgWQABgHANgHQAJgGADACIAUgPQAAgDACgEQAAAAAAgBQAAAAABAAQAAAAAAAAQAAAAABAAIAHgGIAEgCQADgCADAAIASgRQgBgFAIgHIAAAAIABAAIACgCIACgCIAEgBQANgQAMgQIACgCIADAAQAXAJAQAQIABgDIABABIACgDIABAFIAAACIAAAGIgBABIAAAAQgSAdgXAZIAAABIgBABQgUAUgXAUIAAAAQgYAUgbARIAAAAQgbARgeAOIgEADgAmDmAIgEAGIABADQgUAJgSANQAAAZALASIANgHIAJgEIAdgRIgBgCIAGgFIACADIAlgbIAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQACgDAGgEIAHgDIAAgBIAegbIACgDIACgEIADgEIAFgFIAAAAIADgCIABgBIABAAIADgEIAJgMIAQgXQgNgPgVgIQgOANgLAPIgDADIgJAFIgCAFIABABQgNALgNAOIgBgBQgGABgDADQgDAFgEACIACADQgPAKgIAHQAAAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAIgCACIgCgDIgCAAQgFABgGAHg");
	this.shape_6.setTransform(-0.2,-12.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFF8F6").s().p("AF2BMIgGgEIgGgFIAAAAIgBgBIgCAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBIAAgDQABgEAEgJIAGgMIAEgMIABgBIACgDIACgBQAFABAGAIIAEAFIgBADIgEATQgEALgDAFIABAAQgBAEgFAAgAl2BKIgCgBQgDAAgBgDIABgBQgDgEgEgLIgEgTIgBgDIAEgGQAGgHAFgBIACAAIACADIABABIAEANIAGAMQAEAIABAEIAAAEQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAIgCAAIgBAAIAAABIgGAFIgGAEgAE6AiIgHgDIAAgBIgCgDIABgDQAJgPAIgKIAHgIIABgCQAGACADADQADAEAEACIgCACQgQAcgGAHIABABIgBACIgBABQgCgDgGgEgAlCAlIgBgCIABgBIgBgBQgHgIgOgZIgCgCQAEgCADgFQADgDAGgBIABABIAHAJQAIAIAIAOIABACIABADIgCADIAAABIgHADQgGAEgCADIgBgBgAERgDIgDgEIgFgEIAAgBIAAABIgDgCIAAgDQAJgNAJgKQAHgHAEgCIADADIAJAFIACAEIgBACIgOAPIgHALIgEAGIgBACIgBAAIgCAAIgCgDgAEPgRIAAAAIABAAIAAgBIgBABgAkUgCIgBAAIgBgCIAAgBIgEgFIgHgMIgOgPIgBgBIACgFIAJgFIADgDQAEADAHAHQAJAKAJAMIAAAAIAAADIgDACIAAAAIAAAAIgFAFIgDAEIgCAEIgCgBgAkPgUIABABIAAAAIgBgBgAFggcIgDgCIgFgCIACgBIAAAAIABABQAGAAADAFIACAEIgGgFgAEuhJIgDgCQADABADADIAAABIgDgDg");
	this.shape_7.setTransform(-0.2,-53.8);

	this.addChild(this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-48.1,-88.4,96.2,126.5);


(maleLib.Shoulder = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACPAaIhWDVQgHgCgIgCQhkghhAhgQgLgQgJgRQAlg3Adg6QAqhWAYhdQAAgDABgCQABgFABgGIABAAIAGgDQAAAAAAAB");
	this.shape.setTransform(2,-22.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AAqDqQhkghhAhfQgLgQgJgRQAlg4Adg5QAqhWAYheIABgEIACgLIABAAIAGgDQCaBMgNCoIABAFIgBgCIABADIABAOIhWDVIgPgFg");
	this.shape_1.setTransform(2,-22);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-13.3,-47,30.8,49.9);


(maleLib.Mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	};
	this.frame_19 = function() {
		this.gotoAndPlay(1);
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10).call(this.frame_19).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AA4gIQgZgQgSABQgQABgEAAIgBAAQgEAAgSgCQgTgBgXAWIA/gEQAHABAFAAQAyAEADgGQAIgCAJgFAAZAZIhFAA");
	this.shape.setTransform(0.1,-0.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC6666").s().p("AgVgJIAVACIAAAAIAVgBQASgBAaAOQgEAGgygEIgLgBIhAAEQAXgUAUABg");
	this.shape_1.setTransform(-0.7,-2.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AA3gQQgagRgSABQgRAAgCAAIAAAAQgFACgSgCQgTgBgaAWIAEAAIA+gFQAHABAVABQAWABALgBQADAAABgCQAIgCAOgGAhHgIQAmASAmgGQAXgEAYgLAAXAcQgiALgigL");
	this.shape_2.setTransform(0.2,0.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#660000").s().p("Ag9gCIAAgDIA9gFIAcACIAhAAIABADQgYAKgXAEQgKACgHAAQgeAAgdgNg");
	this.shape_3.setTransform(-0.8,-0.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC6666").s().p("AgUgJQASACADgCIAAAAIAUAAQATgBAaAPQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgiAAIgcgCIg8AFIgFAAQAagUATABg");
	this.shape_4.setTransform(-0.9,-2.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,1,1).p("ABHgXQAAAAAAAAQgcgRgTABQgUABgEAAIAAAAQgEAAgTgBQgWgBgZAVIACAAIBEgDQAAAAADAAIAAAAQAFAAAFABQAzADAHgFgAhEgTQAKALAJAIQAzAtAzgvQAJgJAJgMAAhAiQgfANgmgN");
	this.shape_5.setTransform(-0.7,0.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#660000").s().p("AgygFQAcgKAXAAQAZABAZAHQgZAXgaAAQgYAAgagVg");
	this.shape_6.setTransform(-0.6,0.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhFgGIBEgEIADABIAAAAIAKABQAzADAHgFQgJAKgKAJQgZgHgZgBQgXAAgcAKQgJgIgKgJg");
	this.shape_7.setTransform(-0.6,-1.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CC6666").s().p("AhGAKQAZgUAWABIAXACIAAAAIAYgBQATgBAcAOIAAABQgHAFgzgEIgKAAIAAAAIgDgBIhEAEg");
	this.shape_8.setTransform(-0.7,-3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,1,1).p("AA3gQQAIgCAOgGAA3gQQgagRgSABQgRAAgCAAIAAAAQgFACgSgCQgTgBgaAWIAEAAIA+gFQAHABAVABQAWABALgBQADAAABgCgAhHgIQAmASAmgGQAXgEAYgLAAXAcQgiALgigL");
	this.shape_9.setTransform(0.2,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},3).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},3).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_9}]},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.2,-4.2,16.7,7.1);


(maleLib.Leg = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AiYqyIAEgCAiVNpIgHx3IAEmkAiVNuQASADATACQA7AHA3gFQABAAAAAAQAfgDAfgGIAAAAQAVgEAVgGQAJgDAIgDIAh7SAACNrIAp5m");
	this.shape.setTransform(16,11.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AhwN3IglgFIAAgFIgHx3IAEmlIABAAIADgCIAAAAQBEjsDtAqIghbTIgRAFIgqALIAAAAQgfAGgfADIgBAAQgVABgYAAQgiAAgjgDgAACNuIAp5lgAiXqvIADgCg");
	this.shape_1.setTransform(16,11.1);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-0.7,-78.3,33.5,179.6);


(maleLib.Head = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AC/gLQADgDADgCQAEgEAFgDQABAFABAFQABAKABAIQAAABABAAQAFA4gPAsQgIAWgcgcQgIBGgEAVQgFAVgCADQgEAHgFAGQgHAIgHAHQgBABgBABQgKAJgMAIQgXAQgdANQgCABgCAAQgQAEgOABQgCAAgCAAIgJAAQgCAAgEAAQgOgBgQgEQgugSgegcACDkAQA+AUAUBHQgVBDgBBKQAAABAAAAQAAAGAAAGACDkAIgjBRQgPgIgSACQhcAkhOAEQgiAfgMAiQgBAAAAABQAAAAAAABQgBABAAABQAAACgBABQgBAIgBAHQAAABAAAAIAAABQAAABAAABQgBABAAABQgBALAAANQAAAHAAAIIAAABQABASAEAXQAAACAAADIABAGQgBgDgBgDQgKgZgKgNQgBgCgCgDQgBgKgBgKQgJhKgUg1QgCgPAAgFIAAgCQAphJBygpQCCgaA6A6gACQhBIAGAOIgHgBIhpgIIAFgXQA2ABAvARgABgivQAqAeAZA+IgBBpIAAAKIAAAGIABAAIgBgGAiPgzIAHgBIBpgIIgFgXQg2ABgvAPgAizgFIAAAAQgFgGgEgFQgFgEgFgDQgGAUgBARQAAABAAABIAAAAQgDAyAOAoQAIAWAegXQAAADABACQAFA6AIAlQACAFABAFIgBACAi9AQIAPAfIABABIAMAZAitAwIgGAPAiaAsIAEA9IAAAEIAeAuAAaB9QgCADgDADQgEADgFACQgEACgFABQgEgBgEgCQgGgCgDgDQgDgDgBgDQgNgHgPABQgBgQAMgLAgSB9QgBgKACgBACjAmQABgCACgCIAAAAQAGgKABgCQAHgUAJgKQABgCABgBACzArIAIASACzArIgQAcIAAghAAaA/QgCgeACgXQAAgBAAAAIABgOIAAgCQAEgaAIgPAAaB9QABgMgCAAAAaB9QAMgHAPABQABgQgMgLACJCSIAag0IAAgXAiLDXQAEAGAaAbADGAGIgTAl");
	this.shape.setTransform(-0.7,-8.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgOgNIABgCQAEAGAYAZg");
	this.shape_1.setTransform(-13.3,14.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#663300").s().p("AicClQgKgZgKgPIgDgFIgCgVQgJhJgUg0IgCgTIAAgCQAphKBygoQCCgaA6A5IgjBSQgPgJgSADQhcAjhOAEQgiAegMAiIgBAAIAAACIgBACIgBADIgCAPIAAABIAAAAIAAADIgBABIgBAYIAAAQIAAAAQABAVAEAWIAAAFIABAGIgCgFgACiCVIABhsQgZg8gqgdIAjhSQA+AUAUBIQgVBBgBBKIgCAQQgJAMgHAUgAAmBBIAFgXQA2ABAvARIgBANgAiJA5QAvgOA2gBIAFAXIhpAIg");
	this.shape_2.setTransform(-0.7,-20.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FDCE91").s().p("AAGDwIgIAAIgHAAQgOgCgQgDQgugTgegbIgBgBIgRgRIAVAUQgagcgEgGIgDgJQgIglgFg7IgBgEQgeAXgIgWQgOgoADgwIAAgBIAAgBQABgTAGgUQAFACAFAFIAJALIAAAAIADAFQAKAPAKAZIACAFIgBgGIAAgFQgEgWgBgVIAAAAIAAgQIABgYIABgBIAAgDIAAAAIAAgBIACgPIABgDIABgCIAAgCIABAAQAMgiAiggQBOgEBcgjQASgDAPAJQAqAdAZA+IgBBsIAAAKIAAAGIABAAIADgEIAAgBIAHgLQAHgUAJgMIACgEIAGgFQAEgEAFgCIACAJIACAUIABACQAFA2gPAsQgIAWgcgcQgIBFgEAVIgHAZIgJAMIgOAQIgCABQgKAKgMAIQgXAQgdANIgEABQgQADgOACIgEAAgAiZAzIAeAvIgegvIAAgEIgEg7IAEA7IAAAEgACgAlIgaAzIAagzIAAgYgAgVBEIAEAFIAJAGIAIACIAJgCIAJgFIAFgGIACgBQAKgGALAAIABAAIAAAAIADAAIABgCQAAgOgMgLQAMALAAAOIgBACIgDAAIAAAAIgBAAQgLAAgKAGIgCABIAAgHQAAgGgBAAQABAAAAAGIAAAHIgFAGIgJAFIgJACIgIgCIgJgGIgEgFIAAgGQAAgFABgBQgBABAAAFIAAAGIgCgBIAAgBIgBAAQgKgFgLAAIAAAAIgBAAIgDAAIAAgCQAAgOALgLQgLALAAAOIAAACIADAAIABAAIAAAAQALAAAKAFIABAAIAAABIACABIAAAAgAixgJIABACIAMAWIgMgWIgBgCIgPgfgACgANIAQgaIgQAaIAAgeIAAAegAAXAGIgBgfIABgUIAAgCIABgQIAAgBQAEgaAIgPQgIAPgEAaIAAABIgBAQIAAACIgBAUIABAfgAi2AFIAGgMgACwgNIAIAQIgIgQIATgkIgTAkgAAYhsIACAAIAJgCIABgBIABAAIADABIgBgBIgDAAIgBAAQgGAAgFADgAAjh1IBpAIIAHAAIgGgNQgvgRg2gBgAiMh9IgGAQIAHAAIBpgIIgFgXQg2ABgvAOgAgVBEIAAAAgACgANg");
	this.shape_3.setTransform(-0.4,-2.5);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-23,-39,44.7,61.5);


(maleLib.Hand = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ag3ByIAAgCIg4hwIgEAAIAAAAIA6jcABzBzQgoACgNhLQAAgBACgEQACgEgOgaQgNgZgnAfIAAABIAAAAQgBADgBADQgJApALAqIAAADQANgDARAeQgFACgHABIAYApQALAcgRAIIgGgIAAABqIASAeAg3ByIACADIAAABIABAFIBFBiIANgQAhaACIAjBtIAAADAg/AGIAWBlIBHBiABXhDIAdC0AAvjTQgCBCApBO");
	this.shape.setTransform(11.6,22.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCE91").s().p("Ag0B7IgBgFIAAgBIgBgDIgBgDIgihtIAiBtIAAABIg4hwIgEAAIAAAAIA6jcIBoAJQgCBCApBOIABAAIAdC0IgBACQgpACgMhLQgBgBADgEQACgEgNgaQgOgZgnAfIAAABIAAAAIgCAGQgJApALAqIAAADQANgDARAeIgMADIgSgeIASAeIAYApQALAcgRAIIgGgIIhHhiIgWhlIAWBlIBHBiIgNAQgAAeDNg");
	this.shape_1.setTransform(11.6,22.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,25.2,46.4);


(maleLib.Foot = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAqhxQAOAfAQAZQAEAFADAFQAMAQANAOQAVATAMASQAIANAEALQAIAagTAWIgDAWQgDgBgEgBQiAgRh+ARID+AAAhBgnQAegIAeABQABgBABABQARAAATADQAFAAAGABAg8gbQAcgFAcAAQAWAAAZAEQADAAADABAg/hBQApgJAnAIQADABACAAACJAUQiCgphdAcIgCABQgRAogtgPACKBcQiKgViCARIAAAAQgSgYgCgfIAAAAQgBgNACgQIAIhrAiDBeIADARAhDhOQAsgKAqAK");
	this.shape.setTransform(0,2.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("ACACIQiAgSh+ASIgCgCIgDgRIABgGQgSgYgCgeIAAgBQgBgNACgQIAIhqIADgOQA5gqAdgBQAeAAARADQAPADAdAeIADALQAOAeAQAaIAHAJQAMARANALQAVAWAMASIgBgBIgCAAIgCgBIgBAAIgGgCIAAAAQhFgWg6AAIAAAAIAAAAQgsAAgmAMIgCABIgCAAIAAABIgBABIAAACQgNAZgZAAIAAAAIAAAAQgJAAgKgDIAAAAIgDgBIgBAAIABAAIADABIAAAAQAKADAJAAIAAAAIAAAAQAZAAANgZIAAgCIABgBIAAgBIACAAIACgBQAmgMAsAAIAAAAIAAAAQA6AABFAWIAAAAIAGACIABAAIACABIACAAIABABQAIAMAEALQAIAagTAXIgEgBIgGgBIAAAAIgDAAQhHgKhDAAIAAAAIAAAAQg7AAg6AHIAAAAIAAAAQA6gHA7AAIAAAAIAAAAQBDAABHAKIADAAIAAAAIAGABIAEABIgDAVIgHgBgAgEgIQAWAAAZADIAGABIgGgBQgZgDgWAAIgDAAIgCAAIAAAAIgBAAQgYAAgXAEIgDAAIADAAQAXgEAYAAIABAAIAAAAIACAAIADAAgAhBgQIAEgBIACAAIABAAIABgBIAEAAQAVgFAWAAIABAAIAAAAIACAAIACAAIACAAQARAAATADIALACIgLgCQgTgDgRAAIgCAAIgCAAIgCAAIAAAAIgBAAQgWAAgVAFIgEAAIgBABIgBAAIgCAAIgEABgAARgqIAFABIgFgBIgCgBIgBAAQgPgDgSAAIgBAAIAAAAQgUAAgUAEIgDABIADgBQAUgEAUAAIAAAAIABAAQASAAAPADIABAAIACABIAAAAgAATg3QgqgJgsAJQAWgFAWAAQAWAAAUAFg");
	this.shape_1.setTransform(0,-0.2);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-16.1,-13.8,32.3,28.4);


(maleLib.Eyes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_56 = function() {
		///*
		//js
		//this.play(0);
		//*/
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(56).call(this.frame_56).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AA9gPQAEgBAFgBQAOgDATADQAEAAAEABQAFABAGABQAIASgKAPIhRgCIgCgRQAJgKAPgFgABngRQABAEAAAEQAAAJgGAEQgHAHgJAAQgJAAgGgHQgHgEAAgJQAAgDABgDAg7gOQgRgGgYADQgFAAgEABQgGABgGABQgIASAKAPIBSgCIACgRQgJgJgPgFQABADAAADQAAAIgHAGQgGAGgJAAQgJAAgGgGQgHgGAAgIQAAgEACgF");
	this.shape.setTransform(0.1,1.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCE91").s().p("AAHAAIAAAAIgDAAIgJABIgBAAQAGgDAHACg");
	this.shape_1.setTransform(3.4,-3.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000FF").s().p("AhgAJQgHgGABgHIABgKQAYgDARAGIABAHQAAAHgGAGQgHAHgJAAQgJAAgGgHgABCAIQgGgGAAgHIAAgGIAJgCQAPgDATACIABAJQgBAHgGAGQgHAHgJAAQgIAAgHgHg");
	this.shape_2.setTransform(0.2,0.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAnAQIgCgQQAJgKAPgFIgBAGQAAAJAHAEQAGAHAJAAQAJAAAHgHQAGgEAAgJIgBgJIAIABIALADQAIASgKAPgAh5gOIAMgDIAJgBIgCAKQAAAIAHAFQAGAHAJAAQAJAAAGgHQAHgFAAgIIgBgHQAPAFAJAKIgCAQIhSADQgKgPAIgSg");
	this.shape_3.setTransform(0.1,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AA9gPQAEgBAFgBQAOgDATADQAEAAAEABQAFABAGABQAIASgKAPIhRgCIgCgRQAJgKAPgFgABngRQABAEAAAEQAAAJgGAEQgHAHgJAAQgJAAgGgHQgHgEAAgJQAAgDABgDAhkgRQgFAAgEABQgGABgGABQgIASAKAPIBSgCIACgRQgJgJgPgFQgRgGgYADgAg7gOQABADAAADQAAAIgHAGQgGAGgJAAQgJAAgGgGQgHgGAAgIQAAgEACgF");
	this.shape_4.setTransform(0.1,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,1,1).p("ABtgHQAIgBAIAAQADANgIAMIhRgDIABgFQAOgGANgDQASgIAYABIAAAAQAAAHgGAHQgGAGgKAAQgJAAgGgGQgDgEgCgDAAoAJIACgJAB3gQQAFAEABAEAgoAJQgOgGgNgDQgRgIgZABQAAAHAHAHQAGAGAJAAQAJAAAGgGQAEgEABgDAgoAJIgCgJAh8gIQgBACAAABQAAAFAAADQABAHAEAHIBSgDIgCgFAhtgHQgHgBgIAAAh2gQQgFAEgBAE");
	this.shape_5.setTransform(0.1,1.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAnAKIABgFIAbgHQACACADADQAGAGAJAAQAKAAAGgGQAGgFAAgJIAAAAIAQgBQADANgIAMgAh9AAIAAgJIABgDIAPABQAAAJAHAFQAGAGAJAAQAJAAAGgGQAEgDABgCQANACAOAFIACAFIhSADQgEgHgBgGg");
	this.shape_6.setTransform(0.1,1.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0000FF").s().p("ABIAEQgDgDgBgCQARgKAYABIAAABQABAJgHAEQgGAHgJAAQgJAAgHgHgAhmAEQgGgEAAgJQAYgCASAKQgCACgEADQgFAHgKAAQgJAAgGgHg");
	this.shape_7.setTransform(0.1,1.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("AAmACQAWAKgDgFAAvgGQgEgHgHANQAvgJApABAgugGQAEgHAHANQgvgJgpABAglADQgWAJADgE");
	this.shape_8.setTransform(0.3,3.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,1,1).p("AB9gIQADANgIAMIhRgDIABgFIACgJABtgHIAAAAQAAAHgGAHQgGAGgKAAQgJAAgGgGQgDgEgCgDABtgHQAIgBAIAAAAoAJQAOgGANgDQASgIAYABAB3gQQAFAEABAEAh8gIQgBACAAABQAAAFAAADQABAHAEAHIBSgDIgCgFIgCgJAhtgHQAAAHAHAHQAGAGAJAAQAJAAAGgGQAEgEABgDQgRgIgZABQgHgBgIAAAgoAJQgOgGgNgDAh2gQQgFAEgBAE");
	this.shape_9.setTransform(0.1,1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_4}]},48).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_9}]},3).to({state:[{t:this.shape_6},{t:this.shape_7},{t:this.shape_9}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.5,-3.7,27.3,7.9);


(maleLib.BackHand = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAXj4QANAPAKAdIARBFQABAGABAGQABAbAZA/AgPhOQAAgEABgEIANgpAApAhQgPgGgaAWIAAABIgBABQgBACAAADQgJApALApIgggmQgGgegQgeQAXg0AQhCQgLA5BDA2gABzCYQgpABgMhKQgBgCADgEQACgEgNgaQgFgIgHgCAg2B8IApArIAiAFAg2B8IAmA5IA3AbAhSBgIARAiIAMAYIAAABIABAEIAYAdIA9A5IACAFQASgIgLgdIgDgFAAACKQAAAAAAABIAAAAQAUAFAKAZQgCABgDABQgCAAgCABQgCAAgBAAQAVAKAAAaABagiQACBaAYBdAhSBgIgdg8IgEAAIAAgBIA6jbAhSBgIAcAc");
	this.shape.setTransform(6,18.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCE91").s().p("AAgDzIg8g5IgXgdIgCgEIAAgBIgMgYIAMgGIAoArIAiAFIgDAAQAWAKgBAaIADAFQALAdgRAIgAgQCzIA3AbIg3gbIglg5gAgNClIgogrIgdgcIgdg8IgDAAIAAgBIA5jbQACgFAvgtQAeggAYA+IARBGIACALQABAcAZA+IgBgBQACBaAYBdIgBADQgpABgMhKQgBgCADgEQACgEgNgaQgFgIgHgCQg5guAAgyIABgPQgQBCgWA0QAQAeAGAeIAfAmIgfgmQgGgegQgeQAWg0AQhCIgBAPQAAAyA5AuQgPgGgaAWIAAABIgBABIgBAFQgJApALApIAAABIAAAAQAUAFAKAZIgEACIgFABgAgOhYIgBAIIABgIIANgpg");
	this.shape_1.setTransform(6,18.7);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-6.6,-7.4,25.2,52);


(maleLib.Arm = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACYhaQgCgKgGgMACYhYIAAgCIAphUACOgDIADgHQAMgkgDgjQgBgEgBgFACOgBQgDAGgFAKQgYAphHA3Qh4BRgFBsAA5krIhNCgIgBACIABgCAjAEiICrmr");
	this.shape.setTransform(0.3,-11.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCE91").s().p("AjAEPIAAgCICrmqIACgCIBMigQB2gFAPCAIADABIgoBVQgDgLgGgLQAGALADALIgBABIACAHQADAkgMAkIgCAHIgBABQgDAJgFAJQgYAohHA2Qh4BRgFBtQgiAogaAAQgcAAgSgxgAgUifIABAAIgCACg");
	this.shape_1.setTransform(0.3,-9.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-20,-42.8,40.7,65.2);


(maleLib.Abdomen = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AABimQAFgBAGAAQARAAANAHQAFADAFAEQALAJAEAMQACAGAAAHQAAARgMAMQATAAASgBQgBAhgIAXAAAimIABAAAgNihQAHgDAGgBQAAgBAAAAIAAgJIABAJABZihQACAOABANQACAXAAAUAA5haQgCACgDADQgQAOgYAAQgVAAgRgOQgDgDgDgDQgKgMAAgQQAAgIACgHQAEgKAKgJQAGgFAHgDAAqigQAYAAAXgBQAPgBAOgBQACAOABAMQADAYgBAUQAcgDAagEQBBgKA7gSQgBAOgCAPIAAAAQAAABAAACQgBABAAACQgCAMgEANAEwjcIABAAIABAAIAAAAIgCAAIgXAUQAHAKAEALQAAABABAAQAIAXAAAaQAAABAAAAAExjcIgBAAAExjdIAAABAB2ijQBBgFA2gQQASgFAQgGIAGgBIAEgEAEcAZIAAgBQAAAAABgBQAAAAAAAAQATgXANgXIAChBQgCgEABgDQABgIACgHQAJgugJghQAAgBAAgBQgFgOgHgMAAMDhQABgBACAAQBFgZAigiAAADkIAAgBQgqgVglgYAAMDhQgBAAgCABQgCABgDABQgBAAgBAAQABAAAAAAQAFgCAEgBgACzhSIAMA0IBRAsAB7hdQAAAigIAYAk4giIgBgrQAAgBAAgBQgFgQgCgQQgIgvAGgzIAAgBQABgIABgJIAEACIAeAbIAGAGQBTAVBnAHQAAACAAACQgBAKgBAKQgCAYABAUQABAdAHAUAkmiAIAHhBIABgFAkmiAQAEABAEABQA7AMA4AJQAmAFAkAEAhAiiQASAAATABQAHAAAHAAAheikQAPABAPABQgBADAAADQgBAKgBAKQgBAXAAAUQATABARABAgGDeQgVgOgKgSAithcIgKBBIhPAkAhEhdQACAbAHATAkYhNIgOgz");
	this.shape.setTransform(0.4,57.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AAEDjIAFgCQgBABgCADgAAADjIAAgBIAAABIAAAAIAAgBIAAgCIgGgDQgVgOgKgSQAKASAVAOIgGgDQgigSghgTQg7gjgvgmQg2grgkgtIgBgBIgBgBQgVgZgOgcIgBgrIAAgCQgFgQgCgQQgIgvAGgzIAAgBIACgRIAEADIAeAaIgBAFIgHBBIAIACQA7AMA4AJQAmAFAkAEQgBgUACgYIACgUIAAgEIAeACIgBAGIgCAUQgBAXAAAUIAkACIAGAGQARAOAVAAQAYAAAQgOIAFgFIAlgBQAAgUgCgXIgDgbIAdgCIADAaQADAYgBAUQAcgDAagEQBBgKA7gSIgDAdIAAAAIAAADIgBADIgGAZIAGgZIABgDIAAgDIAAAAIADgdIAAgBQAAgagIgXIgBgBQgEgLgHgKIAXgUIACAAIADADQAHAMAFAOIAAACQAJAhgJAuIgDAPQgBADACAEIgCBBQgNAYgTAWIAAAAIgBABIAAABQg6BHhsBEQgiAjhFAZIgDABIgJADgAC/gfIBRAsIhRgsIgMg0gAi3gcIhPAkIBPgkIAKhBgABzgkQAIgYAAgiQAAAigIAYgABVgkQAIgXABghQgBAhgIAXgAg7gwQgHgTgCgbQACAbAHATgAhZgwQgHgUgBgdQABAdAHAUgAkYhOIgOgzgAExjdIAAgBIABABg");
	this.shape_1.setTransform(0.4,57.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ABLA4QAAgHgCgGQgDgMgLgJIgKgHIAvgBIADAbQACAXgBAUIgkABQALgMAAgRgAg9BSQgBgUACgXIACgUIAAgGIgdgCQhogHhTgTIgGgGIgegbQE8hKExBPIAAAAIgXAUQAGAKAFALIAAABQAJAVgBAaIAAABQg7AShAAKQgbAEgbADQAAgUgCgYIgDgaQBAgFA3gOIAigLIAGgBIAEgEIgEAEIgGABIgiALQg3AOhAAFIgdACIgvABQgOgHgQAAIgMABIgCgJIACAJIgBABQgGABgHADIgOAAIglgBIAlABIAOAAQgGADgGAFQgKAJgEAKQgDAHAAAIQAAAQALAMIgkgCgAikBGQg4gJg7gMIgIgCIAHg/IAGABQBTATBoAHIgBAEIgBAUQgCAYABAUQglgEglgFg");
	this.shape_2.setTransform(-0.3,40.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EDEDED").s().p("AgmAhIgHgGQgKgMAAgPQAAgGACgHQAFgLAKgIQAFgFAHgDQAHgEAIgBIAAAAIABAAIAKgBQAQAAAOAHIAKAHQALAJADAMQACAGAAAFQAAAQgMANIgEAEQgRAOgXAAQgVAAgRgOg");
	this.shape_3.setTransform(1.7,45.8);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-33.2,31.6,67.3,50.1);


(maleLib.Tween1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new maleLib.Watch();
	this.instance.setTransform(1.8,-19.2,0.699,0.699,27.3,0,0,8.2,5.4);

	this.instance_1 = new maleLib.Hand();
	this.instance_1.setTransform(13.1,-18.8,1,1,0,3.9,-176.1);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-13.6,-25.8,27.3,51.9);


(maleLib.MaleDefault = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	};
	this.frame_34 = function() {
		this.stop();
	};
	this.frame_69 = function() {
		this.gotoAndStop(0);
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(35).call(this.frame_69).wait(1));

	// Eyes
	this.instance = new maleLib.Eyes();
	this.instance.setTransform(-26.4,-134.2,1,1,-3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:5.1,x:-23,y:-134.3},5,cjs.Ease.get(-1)).to({rotation:0.9,x:-18.1},6,cjs.Ease.get(1)).to({rotation:0.9},12).wait(13).to({rotation:5.1,x:-23},6,cjs.Ease.get(-1)).to({rotation:-3.2,x:-26.4,y:-134.2},5,cjs.Ease.get(1)).wait(1));

	// Mouth
	this.instance_1 = new maleLib.Mouth();
	this.instance_1.setTransform(-24.8,-111.3,1,1,-3.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:5.1,y:-111.4},5,cjs.Ease.get(-1)).to({rotation:0.9,x:-18.3},6,cjs.Ease.get(1)).to({rotation:0.9},12).wait(13).to({rotation:5.1,x:-24.8},6,cjs.Ease.get(-1)).to({rotation:-3.2,y:-111.3},5,cjs.Ease.get(1)).wait(1));

	// Head
	this.instance_2 = new maleLib.Head();
	this.instance_2.setTransform(-2.7,-94.3,1,1,-3.2,0,0,21.2,30.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:30.8,rotation:5.1,x:-5.4,y:-91.6},5,cjs.Ease.get(-1)).to({rotation:0.9,x:2.6,y:-92.9},6,cjs.Ease.get(1)).to({rotation:0.9},12).wait(13).to({rotation:5.1,x:-5.4,y:-91.6},6,cjs.Ease.get(-1)).to({regY:30.9,rotation:-3.2,x:-2.7,y:-94.3},5,cjs.Ease.get(1)).wait(1));

	// Torso
	this.instance_3 = new maleLib.Torso();
	this.instance_3.setTransform(-25.1,-39,1,1,0,0,0,-0.1,-6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5).to({rotation:3.2,x:-22.4,y:-39.1},6,cjs.Ease.get(1)).wait(25).to({rotation:0,x:-25.1,y:-39},6,cjs.Ease.get(-1)).wait(6));

	// Abdomen
	this.instance_4 = new maleLib.Abdomen();
	this.instance_4.setTransform(-24.8,19,1,1,3.5,0,0,0.4,56.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:3.3,x:-24.9},5,cjs.Ease.get(-1)).to({rotation:3.5,x:-24.8},6,cjs.Ease.get(1)).wait(25).to({rotation:3.3,x:-24.9},6,cjs.Ease.get(-1)).to({rotation:3.5,x:-24.8},5,cjs.Ease.get(1)).wait(1));

	// Rshoulder
	this.instance_5 = new maleLib.Shoulder();
	this.instance_5.setTransform(-67.6,-49.1,1,1,-10.5,0,0,2,-22);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regY:-21.9,rotation:1.2,x:-72.2,y:-48.7},4,cjs.Ease.get(-1)).to({regY:-22,rotation:-3.5,x:-70.3,y:-48.8},1).to({rotation:4,x:-68.7,y:-51.4},6,cjs.Ease.get(1)).wait(25).to({rotation:-3.5,x:-70.3,y:-48.8},6,cjs.Ease.get(-1)).to({regY:-21.9,rotation:1.2,x:-72.2,y:-48.7},1).to({regY:-22,rotation:-10.5,x:-67.6,y:-49.1},4,cjs.Ease.get(1)).wait(1));

	// LShoulder
	this.instance_6 = new maleLib.Shoulder();
	this.instance_6.setTransform(18,-48.9,1,1,0,10.2,-169.8,1.9,-22.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({scaleX:1,scaleY:1,skewX:10.1,skewY:-169.9},5,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,skewX:9.7,skewY:-170.3,x:22.6,y:-45.8},6,cjs.Ease.get(1)).wait(25).to({scaleX:1,scaleY:1,skewX:10.1,skewY:-169.9,x:18,y:-48.9},6,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,skewX:10.2,skewY:-169.8},5,cjs.Ease.get(1)).wait(1));

	// LHand
	this.instance_7 = new maleLib.Tween1("synched",0);
	this.instance_7.setTransform(26.6,40.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({startPosition:0},5,cjs.Ease.get(-1)).to({rotation:-5.5,x:28.5,y:44.2},6,cjs.Ease.get(1)).to({startPosition:0},12).to({startPosition:0},1).to({startPosition:0},12).to({rotation:0,x:26.6,y:40.6},6,cjs.Ease.get(-1)).to({startPosition:0},5,cjs.Ease.get(1)).wait(1));

	// LArm
	this.instance_8 = new maleLib.Arm();
	this.instance_8.setTransform(22.7,-0.2,1,1,0,16.4,-163.6,-1.7,-2);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(5).to({skewX:21.1,skewY:-158.9,x:24.4,y:2.8},6,cjs.Ease.get(1)).wait(25).to({skewX:16.4,skewY:-163.6,x:22.7,y:-0.2},6,cjs.Ease.get(-1)).wait(6));

	// RArm
	this.instance_9 = new maleLib.Arm();
	this.instance_9.setTransform(-75.3,1,1,1,-14.5,0,0,-1.8,-1.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({rotation:-1.8,x:-89.1,y:-4.5},4,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,rotation:0,skewX:72.7,skewY:-107.3,x:-97.7,y:-14.3},1,cjs.Ease.get(-1)).to({regY:-2,scaleX:1,scaleY:1,skewX:103.7,skewY:-76.3,x:-104.1,y:-30.9},6,cjs.Ease.get(1)).wait(25).to({regY:-1.9,scaleX:1,scaleY:1,skewX:72.7,skewY:-107.3,x:-97.7,y:-14.3},6,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,rotation:-1.8,skewX:0,skewY:0,x:-89.1,y:-4.5},1,cjs.Ease.get(1)).to({rotation:-14.5,x:-75.3,y:1},4,cjs.Ease.get(1)).wait(1));

	// RHand
	this.instance_10 = new maleLib.Hand();
	this.instance_10.setTransform(-92.8,24.2,1,1,-10.2);

	this.instance_11 = new maleLib.BackHand();
	this.instance_11.setTransform(-109.5,7,0.998,0.998,0,20.9,-159.1);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({rotation:-4.2,x:-111.6,y:14.9},4,cjs.Ease.get(-1)).to({_off:true,scaleX:1,scaleY:1,rotation:0,skewX:20.9,skewY:-159.1,x:-109.5,y:7},1,cjs.Ease.get(-1)).wait(37).to({_off:false,scaleX:1,scaleY:1,rotation:-4.2,skewX:0,skewY:0,x:-111.6,y:14.9},1,cjs.Ease.get(1)).to({rotation:-10.2,x:-92.8,y:24.2},4,cjs.Ease.get(1)).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(4).to({_off:false},1,cjs.Ease.get(-1)).to({skewX:76.9,skewY:-103.1,x:-122.2,y:-11.2},3,cjs.Ease.get(0.3)).to({scaleX:1,scaleY:1,skewX:58.2,skewY:-121.8,x:-125.2,y:-18.6},3,cjs.Ease.get(1)).wait(25).to({scaleX:1,scaleY:1,skewX:76.9,skewY:-103.1,x:-122.2,y:-11.2},3,cjs.Ease.get(-1)).to({skewX:20.9,skewY:-159.1,x:-109.5,y:7},3,cjs.Ease.get(-0.3)).to({_off:true,scaleX:1,scaleY:1,rotation:-4.2,skewX:0,skewY:0,x:-111.6,y:14.9},1,cjs.Ease.get(1)).wait(5));

	// LLeg
	this.instance_12 = new maleLib.Leg();
	this.instance_12.setTransform(-0.7,104.7,1,1,-5.5,0,0,15.9,11.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({x:-0.8,y:104.8},5,cjs.Ease.get(-1)).to({x:-0.7,y:104.7},6,cjs.Ease.get(1)).wait(25).to({x:-0.8,y:104.8},6,cjs.Ease.get(-1)).to({x:-0.7,y:104.7},5,cjs.Ease.get(1)).wait(1));

	// RLeg
	this.instance_13 = new maleLib.Leg();
	this.instance_13.setTransform(-41.7,192,1,1,0,0.7,-179.3,15.2,97.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(48));

	// Rfoot
	this.instance_14 = new maleLib.Foot();
	this.instance_14.setTransform(-44.8,203.9,1,1,0,0,180,0,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(48));

	// LFoot
	this.instance_15 = new maleLib.Foot();
	this.instance_15.setTransform(10.7,202.7,1,1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(48));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102.6,-163.6,153.8,381.5);


// Open mouth and hand gesture
(maleLib.open = function(instance) {
	instance.gotoAndPlay(0);    // Begin gesture
	instance.instance_1.play(); // Open mouth
});

// Close mouth and hand gesture
(maleLib.close = function(instance) {
	instance.gotoAndPlay(35);           // End gesture
	instance.instance_1.gotoAndStop(0); // Close mouth
});


// stage content:



(maleLib.MaleDefaultInit = function() {
	this.initialize();

	// Layer 1
	this.instance = new maleLib.MaleDefault();
	this.instance.setTransform(145,210.2,1,1,0,0,0,-26.6,31.6);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(470,215,153.8,381.5);

})(maleLib = maleLib||{}, images = maleImages||{}, createjs = createjs||{}, ss = maleSs||{});
var maleLib, maleImages, maleCreatejs, maleSs;

/******************* FEMALE AVATAR START *************************************************/

var femaleAvatar = (function (femaleLib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
femaleLib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};

// symbols:
(femaleLib.Torso = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AEVAEIADgEQgJAJgMAAQgKAAgIgGAEdgkQAvAHApgFQgdA4hDgSAEdgkQADAEABAFQAAADAAADQAAANgMAMADtgpQAAgBABgBQAJgJAMAAQAMAAAJAJQADAEACADADtgpQgwgBgsgIQATAvAsAFQAPADASgCQgCgCgBgBQgIgHAAgOQAAgHACgGQACgDADgEgAHSAcIgCACIgTATIgEAFAnRAfIAUAPIAIAG");
	this.shape.setTransform(3.1,-13.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EDEDED").s().p("AgRAZIgCgDQgJgJAAgNQAAgGACgFIAFgIIACgCQAIgJALAAQAMAAAJAJIAFAHQACAFABAFIAAAEQAAAMgLAOIADgEQgJAJgMAAQgJAAgIgGgAASAaQALgOAAgMIAAgEQgBgFgCgFQAvAIAogFQgVApgsAAQgOAAgQgEgAgxAYQgtgHgSgtQAsAJAvAAIgFAIQgCAFAAAGQAAANAJAJIACADIgPABIgRgCgAgVgTIAAAAg");
	this.shape_1.setTransform(29.1,-15.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FDCF88").s().p("AiJCPQgfg/gJgWQgKgXgCgZQA3giAPgfIABgCIgEi6IAAgBIgBgWQBFg7AbABIAeABIAggBQAbgCBAA8IgBAVIAAACIgDC6IAAACQAPAgA0AiQgHBsiuDOQhzh3geg/gACUAvQg0Acg3APQgBAAAAAAQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIADADIAEAAIBrgqIACgDIABgEIgDgDIgCAAIgBAAgAiUAvQgBAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABIAEADIBrAqIADAAIADgDIgBgEIgCgCQg6gOgxgdIgCAAIgCAAg");
	this.shape_2.setTransform(2.9,-63.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("AAHAUQgNgWgOgSIAEgEIAhAjIAEAEQgJAFgBAFIgEgFg");
	this.shape_3.setTransform(0.9,-31.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("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");
	this.shape_4.setTransform(3,4.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000066").s().p("AAfIcQgFgFAAgHQAAgIAFgFIABAAQAFgFAHAAQAIAAAFAFQAFAFAAAIQAAAHgFAFQgFAGgIAAQgHAAgGgGgAAfE+QgFgFAAgIQAAgHAFgFIABgBQAFgFAHAAQAIAAAFAFQAFAGAAAHQAAAIgFAFQgFAFgIAAQgHAAgGgFgAAfBvQgFgFAAgIQAAgHAFgFIABgBQAFgFAHAAQAIAAAFAFQAFAGAAAHQAAAIgFAFQgFAFgIAAQgHAAgGgFgAAfheQgFgFAAgHQAAgIAFgFIABAAQAFgFAHAAQAIAAAFAFQAFAFAAAIQAAAHgFAFQgFAGgIAAQgHAAgGgGgAHllnQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAgBQAKgEAGgxIAGACIACACIABgBQAaAJASAMQAEAhgLAZQgigLgegOgAormIQAagNAbgKIADAaQACAOAEAHIgBABQAAAFAHAAQACAAAHgEIABADQgiAQglAMQgLgZAEgggAnVlzIACgBIACAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAIABgFQAAgFgEgMIgGgQIgEgRIAAgBIADgDQAEAAABgDQALgIAUgJQARAnAGAJIgBABIABADIABABQAAABgBAAQAAAAAAABQgBAAAAABQAAAAAAABIAAAAQgZAPgbANIgCgEgAHhlwIABgDIABgBIgBAEgAGdmMIABAAIAEgBIAAgDIAAgCQAEgLAPgZIAGgLQATAIAPALIgDAEIgCARIgGAQQgDAIgBAHQgBAAgBAAQAAABgBAAQAAABAAAAQAAABAAABQAAABADAEQgZgNgYgOgAFXm+IABgEIADABQABADADACIAJgPIAMgQIAMgQQASALAPANQgGAGgGAKQgMAVgBAKQgFgBAAAFIALAKIgBABQgdgUgZgVgAmFmeIgBgEQgJgUgJgRIgHgMQATgQATgMIAQAVIAGAQIAFAIIABADQAAAAAAAAQAAABABAAQAAAAAAABQABAAABAAIgCAEQgVAQgWAPIACgEgAGSmfIABAAIgBAAgAEZn8QAPgWAagOQAXARAPASIgIAIQgXAXAAAKIABADIAAACQAAABAFAFIgBAEQgdgagYgdgAlLnMIABAAIAAAAgAlFnRQgKgSgLgPQgHgKgEgEQAQgSAUgPQAaAOAPAWQgUAYgXAWIgDABIABgDgAFRnSIAAgBIABABIgBAAgAlSnUIAAgBIABABIgBABIAAgBg");
	this.shape_5.setTransform(3,-11);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AB4PGIgBgBQhXhoggj9QgfD9hWBoIgCABIgCABIgHgBQkcgRiIi7QgBgEgEgEIACgGIABgCIABAAQCFiXBBjpIAAAAQAVhIgrhXQg8hBgbi3IAAgBIgBgDQgBAAAAgBQAAAAAAgBQAAAAAAgBQABgBAAAAIASgjQAqhiAPiiQAAAAABAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABIABADQgSDCgzBoQgFgBATBVQAUBXAXAmQAXAlAXAuQAXAugXBMQhBDsiHCZQCGC6EYAQIABAAQAAABABgBQAAAAAAAAQABAAAAgBQAAgBAAAAQBbhsAbkPIgTieIAAgBIADqSIAFgOQAHgNgCgHIgCgJIgCgCQgCgBgcgsQgdgsg0AGQg1AEgaAyIgaAwIgDABIgDgCIgCgCQghitANi2IgJAMIAAAAQgcAighAdIgBAAIAAABIgBABQgdAYghAVIgBABQghAUgnASIgBABQglARgoAOIgGACQgLAFgDAAQAHC9BgB/QAAAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCADIAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAIgBgCQhhh/gHi/IgBAAIAAgHIAQgJIADgBQgNgdAGglIABgDIACgBQAbgKAagMQACgKASgGQAMgGAGADIAbgQQAAgEADgEQABgBAAAAQAAgBAAAAQABAAAAgBQABAAAAABIAKgGIAFgCQAGgDACACIAbgVQAAgGALgHIAFgCIADgDIAFgBQATgSATgTIACgBIAEAAQAeAPARAXIACgDIAAABIAMgQIgBgBQAHg6AKg8IAAgBQAggzBLgyIADADIAAgPQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAIAAgBIgCABIgCgUQAAgBABgBQAAAAAAgBQAAAAAAgBQABAAAAgBQA2g6BEgCQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAABQAAACAKABIADABIAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAgBABAAQAAgBAAAAQAAgBAAAAQABAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQBEACA2A6IABACIAAADIgBAUIABABQBLAxAgA0IAAABQALA8AGA7IABAOIAMAQIACADQARgXAegPIADgBIADACQARARASARQADgDAMAIIAIAGQABAAAAAAQAAAAABABQAAAAAAAAQAAABAAAAQAGAFAAADIgBAEIAaAUQAEgDAGACQAEABAFAEIAGAFIAFAHIACAEIAcAQQAGgFAOAIQALAJADAFQAZALAaAKIABABIABADQAGAlgNAdIgBAAIAEABQAEABAGADIABgBIACAAIAEACIAAABIAAAHIAAACIAAAAQgJC/hgCBIgDACQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAIAAgBIACgCIgDAAQgBgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAIAEgGQBbh+AHi5IgGgCIgOgEIAAAAQgogOglgRIgBAAIAAgBIgBAAQglgSgigUIgBAAIAAgBQghgVgcgYIgDgBQgggdgbghIgBgBIgCgBIgJgMIABAMQALChgaCbIgCAIIgEATIgBACIgCACIgEgBIgOgWIgRgZQgXgkgogHQgLgCgNABQghABgfAgQgHADgJAHQgaAUgIAUQgEACgCAJIgCgCIgBAAQgEAMgCAOIgDKRIASCPIAAABQAAAAABABQAAAAAAAAQAAABAAAAQABAAAAABQAeEZBeBuQgBABAAAAQAAABAAAAQAAAAABABQAAAAABgBIAAAAQEYgQCGi6QiHiZg7jiQgPg5ANg8IACgJQAGgZALgaIAYgjQAXghAliwQg3hrgTjCQAAAAABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQAAAAABAAIAEACQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAAAQAQClAtBiQAHARAJAPIAAAEIgCADIAAABQgbC3g7BBQglBYAUBRQA6DeCECXIAFAFIADAFIAAABQgEADgCADQiIC7kcARIgIABIgCgBgAG7hQIAEgFgAm0hSIgHgGgAAAkYIAAgBQAJgLAcghIgLAMIgYAcIAAgBIgCAGgACMlyQAtALAuBFIABACIACACIAAgDIAAgBQAIgoAFgpQAPiFgMiLIAAgBIgBgLQgEg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");
	this.shape_6.setTransform(3,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFF8F6").s().p("AHSBHIgEgEQgDgDAAgCQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQABgHADgIIAGgQIACgRIADgEIABgCIAAgCIAAgBQALADAIAHIAGAFIAAAEQgGAxgKAEQAAAAAAABQAAABAAAAQgBABAAAAQgBABAAAAIgDAAQgIAAgIgHgAHiBBIgBADIABABIABgEIgBAAgAnuBFIABgBQgEgGgCgPIgDgZIAAgEIAFgGQAJgKAHAAIADABIACAEIAAACIAEARIAGAQQAEALAAAGIgBAFQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAAAAAIgCgBIgCABIgJAGQgHADgCAAQgHAAAAgFgAGdApQgFgCgKgJIgLgJQAAgFAFAAQABgKAMgTQAGgKAGgFIADgEQAJADAHAHIAJAJIgCADIgGAKQgPAYgEALIAAABIAAAEIgEABIgBAAgAGSAWIABgBIgBAAgAmeAkIgBgCIABgBQgGgKgRglIgCgFQAFgCAFgGQAFgDAIgBIABACIAHAMQAJARAJATIABAEIgCAEIgBAAIgJADQgJAEgDAEIgBgCgAFbgKIgDgBQgEgCgEgEIgBgBQgFgFAAgCIAAgBIgBgEQAAgJAXgYIAIgIIAEgDIAEABQAHACADAEQAEAIAEADIgCAEIgMAQIgMAPIgJAPQgDgCgBgCgAFRgcIABABIgBgBgAldgJIgBgCIgFgJIgGgPIgQgVIgCgDIAFgFIALgGIAGgDQAEAEAHAKQALAOAKASIgBADIgEADIAAgBIgBABIgHAFQgGAFgCAFQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBgAlSgeIAAABIABAAIgBgBgAG7gbQAIgJAAALIgCAFIgGgHgAG1ggQgFgEgEgBQACgBAEACQAJADAAAGIgGgFgAmzgiQAEgFAGAAIABAAIAAAAIACABIgGACIgKAGIADgEgAl3hKQADgDAEAAIgEACIgEACIABgBg");
	this.shape_7.setTransform(3,-54.8);

	this.addChild(this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54.8,-96.7,115.7,193.5);


(femaleLib.Sleeve = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AhahHQAwBlCFAq");
	this.shape.setTransform(-14,64.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCF88").s().p("AAQCwQhMgshbg2IgCgBIADgEIAGgfIgCgCIADgGIADgHIAEgMQAHgVA2heIAwhMQAuBnCHApIh2DLQgDAGgJAAIgIgBg");
	this.shape_1.setTransform(-20.3,74.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAdFsQghgGgfgJQiGgqgxhnIgFgMIAAAAIgDgLIAAgCIABAAIgBgCIgBgFIDkoMQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAIgBgCQAAgBgBAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQDzCBgcCKIAAABIi/HHIgCACIgCABIgBAAgAAKlcIjkIMIAHAUQAvBnCGAoQAbAIAdAGIC+nDIgBABQAZiCjlh7IgBAAIAAACg");
	this.shape_2.setTransform(-1.3,36.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AgdFSQiGgogvhnIgHgUIDkoMIABgCQDlB7gZCBIABAAIi+HDQgdgGgbgIg");
	this.shape_3.setTransform(-1.4,36.6);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-35.7,0,57.4,92.5);


(femaleLib.Mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_19 = function() {
		this.gotoAndPlay(1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgBAWQg3gFgZgdIABgBIAAAAQAhgIAXAAQAYAAAAAEIAAgEIAZABQAYAAAgAHIABABQgZAeg2AEg");
	this.shape.setTransform(-0.1,-0.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B25900").s().p("ABXAPIgCgBIgCgBIAAAAIAAABQgigKguABIgDAAIAAABIgCgBQgugBgiAKIAAgBIgCABIgCABQgJACgHgCIAMgGIABAAIADgCIAAAAQAdgTAcgDQANAGANAAIABAAIABAAIABAAIABAAQAOAAAPgGQAcADAdATIAAAAIADACIABAAIAMAGIgIABIgIgBg");
	this.shape_1.setTransform(0,-3.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC6600").s().p("AgBAgQg3gFgmgzIgBgBIgEgFIAEABIAIgCQAZAiA9AGIAAAAIABgBIAAgCIABACIACABIAAAAQA8gGAZgiIAIACIAEgBIgEAFIAAABQgoA0g4AEg");
	this.shape_2.setTransform(-0.1,1.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgeA0QgdgFgYgfIgYgdQAAAAgBgBQAAAAAAAAQAAAAgBAAQAAgBAAAAIgBAAIgGgBIAAADIgBABIgCABIgBgBIgBgBIAAgHIABgCQAEgLAFABIACABIABABIgBACIgCABQgBABgCAEIAFAAIAQgIIABAAIAAAAQAggZAfgCIACABQAMAFAMABIABABIABgBIABAAIABAAQAOgBAOgFIABgBQAfACAgAZIASAIIAEAAQgCgEgBgBIgCgBIgBgCIABgBIACgBQAFgBAEALIABABIAAACIAAAGIgBACIgCAAIgBgBIgCgCIAAgCIgFABQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABgBAAIAAAAQgqA9ggAEIghAFIgegFgAhfgHIABABQAmAzA3AEIABABIAAgBQA4gDAng0IABgBIAEgGIgEABIgIgBQgZAig8AGIAAAAIgCgCIgBgCIAAgBQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAABAAQA2gFAZgeIABAAIgCAAQgggIgYAAIgZAAIAAADQAAgDgYAAQgYgBggAJIgBAAIgBAAQAaAeA3AFIABABIAAABIAAACIgBACIgBAAQg8gGgZgiIgIABIgEgBIAEAGgABTgVIACABIACABQAJACAHgCIgMgFIgBAAIgDgDIAAAAQgdgVgcgCQgPAFgOAAIgBAAIgBAAIgBAAIgBAAQgNAAgNgFQgcACgdAVIAAAAIgDADIgBAAIgMAFQAHACAJgCIACgBIACgBIAAABQAigKAuABIACABIAAgBIADAAQAugBAiAKIAAgBg");
	this.shape_3.setTransform(0,0.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AAAAAIAAAAQAAAAABAA");
	this.shape_4.setTransform(7.8,-1.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4C0000").s().p("AgCAUIAAAAIgFgBQghgCgmgfIACgBIgBgBIADAAQBLgGBLAHIABAAIgBAAIABAAIAAAAIACABQgiAcgfAFIgGAAIgIABIgCAAg");
	this.shape_5.setTransform(0,-0.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhLAFIACgBIAJgDQAdgIAUAEIAHABIAAABIADABIAFAAQAHAAAAgBIAAgBIAIgBQAVgEAfAJIAJADQhMgFhLAFg");
	this.shape_6.setTransform(0,-2.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CC6600").s().p("AgCA2QgSAAgPgGQgjgPgTgmIgCgEIAFABQAaAZAfAFQAVAEAIAAIACAAIAcgEQAfgFAagZIAFgBIgBAEQgUAmgjAPQgPAGgSAAIgFAAgABTgTQgmgPgtACIgBAAIgEAAQgTgBgRADQgVADgUAIIgCAAIgGgBIAFgFQAXgUAcgIQANAJAOgBIAHAAIAIAAQAOABANgJQAcAIAXAUIAFAFIgGABg");
	this.shape_7.setTransform(0,-0.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgJBEQgBgBgBAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQgPgCgYgLQgegPgVg1IAAAAIgCgBIADgEIABgGIAAAAQAdghAlgJIACAAIACABQAKAIATAAIAEAAQAUAAAJgIIACgBIACAAQAmAJAcAhIABAAIAAAAIABAAIACgBIAAADIADAHIgGACIAAAAQgTA1geAPQgUAIgNAEIgCACQgEAEgGAAQgLAAgFgCgAhagKQATAmAjAPQAPAGASABIAEAAQATgBAOgGQAkgPATgmIACgEIgFABQgaAZggAFIgcAEIgBAAQgIAAgVgEQgfgFgbgZIgEgBIACAEgAhNgSIgCABQAlAfAhADIAGAAIAAAAIADAAIAHAAIAGgBQAfgFAigcIgCgBIAAAAIgBAAIgJgEQgfgKgUAEIgIABIAAABQAAABgHgBIgGABIgDgBIAAgBIgHgBQgUgEgdAJIgJAEIgBABIgDAAIABAAgABSgYIABAAIAHgBIgFgFQgXgUgcgIQgNAJgOgBIgHAAIgJAAQgNABgOgJQgbAIgYAUIgEAFIAFABIADAAQATgIAWgDQARgDASABIAFABIACAAIAJgBQAnAAAiANg");
	this.shape_8.setTransform(0.1,0);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CC6600").s().p("AgTAgQgVgCgxgdIBAgEQASAKAVgDQABAAAAAAQABAAAAAAQAAAAABgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAgBAAQgKACgFgEIAEACIBYADQghAegZADQgQACgOAAIgVgCgAglgeQAUAGARgBQARgBASgHQAlALAMALIhSgEIgBAAIhXAIg");
	this.shape_9.setTransform(0,-0.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgPArQgagEgfgTQgegSAAgCIAAAAIgEAAIgCAAIgJgHIgDgDIADAAIADAAIAFAAIAEAAIADABIABAAQAagTAngOIADAAQASAIAPAAQAQgBATgJQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABABQAuAPAVARIACAAIAFgBIAAAAIABADIACAAIAFgBQgCADgGADQgGADgBgBIgBABIgBACQgnAlgcAGQgPADgOAAQgLAAgMgDgAhWAAQAwAcAVADQAXACAcgDQAagDAggdIhXgEIgFgCQAGAEAKgBQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAgBAAQgUADgSgKgAhTgJIBXgIIAAAAIBTAEQgNgLglgKQgSAHgSAAQgQABgUgGgAB1gPIABAAIgBAAg");
	this.shape_10.setTransform(-0.2,-0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},9).to({state:[{t:this.shape_10},{t:this.shape_9}]},4).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-5.7,24.6,11.6);


(femaleLib.Leg = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#676767").s().p("AjHUeQAppvgQk0QAYjohs0TIAAgBIAAgEIAAgBQDxlGEUBdIAAACIAAAAQh/fHBIK7QheBXhUATIAAAAQgaqXAlrfIAEhEQAkn/gVoSQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBgBQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAVISgkH+IgEBEQgjLgAYKXIABACIgOACIgTABQhkAAhThmg");
	this.shape.setTransform(26.8,115.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjLUoIAAAKQgBAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAIABgRIADAAIgCgBIgBgEIAAAAQAppwgPk0IAAAAIAAgBIgCgXQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBIADgBQAPkRhlzNIAAgGQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQABAAAAABIACADIAAAAIAAAFIAAAAQBrUUgXDoQAPEzgpJwQBdBxBugMIANgCIAAgCQgYqYAjrfIAEhEQAkn/gVoRQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQABAAAAABQAVIRgkIAIgEBEQgjLeAYKYIAAAAQBUgUBehXQhIq6B//HIAAAAIAAgCIABgRQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQABABAAAAIgBALIABABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABIgDABQh+fHBIK5IAAAAIAAABIABAEQAAAAAAABQAAAAAAABQgBAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAIgBAAQhsBiheALIgVABQhkAAhUhig");
	this.shape_1.setTransform(27,116);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-0.1,-25.8,54.4,283.8);


(femaleLib.Hand2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#B38238").ss(0.3,1,1).p("ABUjAQgLAUgJAUQASgKAJgSAhMgyQAHAXAFAVIABABQABAFACAFQAEASADARQABAGAAAGAAjA/QABAQgDAQQAAABAAABQAEAFACAFQACAIACAIQAHAggBAjIgBABIACACABLAEQAAgBABgBQAHgNAOgDAgJCLQgGg3gRgwIgShPABAiYQgOAcgHAcAhggyIARAx");
	this.shape.setTransform(8.4,37.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCF88").s().p("AgMEOIgBgEIgEgEQgGg4gRgvIgShSIASBSQARAvAGA4QgPgtgcgqIgCgNIgHgjIgDgMIAAAAQgFgVgIgYQAIAYAFAVIAAAAIADAMIAHAjIACANIgcg4IgQgxIAQAxIgpgwQgdjRBAhpIAAgBQBDhMAegVIBpCGIAAABIABABIAEAEQApBWgXBbQgLA+AEA1IAAABQAIARgEAMQgCAoAHAdQgyAMgRhMIABgCQAKgigMgSQgRghgOgOQAIgaANgdQgNAdgIAaQgFAZgNAPQAIAwgHAZQAIAXABAXIABACQAkATgFAhIgcgJIAFARQAGAcAAAeIAAAIIgBACQgDAZgaADQgJgrgOgdgAAZDcQAEAFABAEQgBgEgEgFIAAgCQACgOAAgNIAAgFIAAAFQAAANgCAOIAAACIAAAAgABDB8QAIgOAOgEQgOAEgIAOgAA3geQATgJAJgTQgJATgTAJQAJgTAMgUQgMAUgJATgAApE7IAAgDIAAgIQAAgegGgcQAzA2gbAgg");
	this.shape_1.setTransform(9.2,25.6);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-4.7,-8.6,27.9,68.5);


(femaleLib.Hand = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#B38238").ss(0.3,1,1).p("ADriHQgUgDgSAUQghBAgvA2AgcgnQABgBABAAQAYgFAMAMQABABACAAQAvAUBUhLAggAmQAOAMANAOQABgBACAAIABAAQAYAAANAMQAEACACAFAAxArQgfAGgUANQACAAgBABAAAAZQgTAFgNAIAAkBLQAFgCAPgIQAQgIAQAEAhtBJQAKAEAJAGQAbgOAJAEQgIgKgHgIQgEgFgFgEQAEgHAFgEQAOgLAXAOAiDBAQAKADAMAGAhFA3QgEAAgDABQgUAEgNANAhDCBQgIgCgIgCQgcgHgagGIgbgVAiwCIQgJgBgJgBQgUgCgUgBAABB2QgSgMgWgJQgJgOgGgK");
	this.shape.setTransform(-16.7,16.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCF88").s().p("AkNCOIgMAAQAIglAygDQALgBAMABIgegUQAFgGAGgDQATgKAiAMQARgUAkgVIABAAIABgBIACgBQAsgXACgiIAAgDIACgBIABAAIAAAAIALgBIAAAAIABAAQAOAAAKAHIAAAAIAAAAIABABIADABQAKAEAKAAIAAAAIACAAQApgCA+g2IAEgDIgEADQg+A2gpACIgCAAIAAAAQgKAAgKgEIgDgBIgBgBIAAAAIAAAAQgKgHgOAAIgBAAIAAAAIgLABIAAAAIgBAAIgCABQgTADgaAOQgZAWglANQgbAGgQgBQgbgDADgaQAQgFAPgIQAkgTAcgaQAxgJAvg5QAzhCB/ACIADAAQA0gHAdANIBGANQACAngnAyIgBABIisDAIhaAbIgSgLQgUgMgWgJIgPgYIAPAYQAWAJAUAMQgnADgfAIIgQgEIg2gNIgcgVIAcAVIA2ANQgXAAgZAFIgBAAQgQADgQAGIgMgCIAAgBIgSgCQgUgCgUgBQAUABAUACIASACIgUAMQgYAPgVARQgVgVAcgcgAiQBUQAKAEAJAGIAAAAIADgCIAAAAIADgBQANgGAIgBIAEAAIAAAAIAEAAIABAAIgPgSIgJgJQAEgHAFgEIAAAAIACgBQAFgEAHAAIAAAAIAAAAQAKAAALAGIABABIABABIgBgBIgBgBQgLgGgKAAIAAAAIAAAAQgHAAgFAEIgCABIAAAAQgFAEgEAHIAJAJIAPASIgBAAIgEAAIAAAAIgEAAQgIABgNAGIgDABIAAAAIgDACIAAAAQgJgGgKgEQANgNAUgEIAHgBIgHABQgUAEgNANIgWgJIAWAJgAAHBdQgDgFgDgCIAUgKQAKgFALAAIABAAIAAAAIAKABIgKgBIAAAAIgBAAQgLAAgKAFIgUAKQgLgMgaAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQgBAAAAAAQAWgNAdgGQgdAGgWANIAAABIgEABIgagaQANgIAUgFQgUAFgNAIIAaAaIAEgBIABAAQAaAAALAMQADACADAFgACihrQghBAgwA2QAwg2AhhAIABgBIABgBQAOgPAQAAIAAAAIAAAAIAEAAIABAAIABAAIgBAAIgBAAIgEAAIAAAAIAAAAQgQAAgOAPIgBABIgBABIAAAAgAjTCTIAAAAgAh2CIIAAAAgAggCBIAAAAgAglBKg");
	this.shape_1.setTransform(-13.2,15.1);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-41.8,-4,57.3,38.3);


(femaleLib.Hair = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#593922").s().p("AkiFaIgCgEIAAABIg4h8IgBgCQh4kRCJipIAAAAQCEi3DJA1IABAAQAAAAABABQAAAAABAAQAAAAAAAAQABAAAAAAQDEg2CDC3IABAAQCJCph4EQQgXA0gZAtIAWhbIAIgfQAhh2gqh8IgBgBQhejbjggPQgBAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBABIAAAAIAAAAIgDgCQjgAPhfDbIAAABQgrB8AiB2IAIAfIAwCSIgPgWg");
	this.shape.setTransform(0.4,23.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAIHYQi5gah5i9IAAgBIgDgDIAAgBIg4h8IAAAAIgBgCIAAAAQh7kYCNisIABAAQCHi8DOA2IAAAAIADABQDIg3CIC8QCNCsh7EXQgfBGghA4IgBABQh4DAigAaIgCABIgDACIgBgBgAkTERIgwiSIgIgfQghh0Aqh+IAAgBQBfjbDhgPIACACIAAAAIAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABgBAAAAQDgAPBfDbIAAABQArB+giB0IgIAfIgWBbQAZgtAXg0QB4kQiJipIgBAAQiDi3jDA2QgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBIgBAAQjIg1iFC3IAAAAQiJCpB4ERIABACIA4B8IAAgBIADAEIAOAWIAAAAg");
	this.shape_1.setTransform(0.4,33.1);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-41.2,-14.2,83.3,94.6);


(femaleLib.Foot = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("AhDAJIgCgDQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAIADgCQA+gQBHAOQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCAEIgEAAQhFgMg7APIgCAAIgCAAg");
	this.shape.setTransform(8.4,29.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FDCF88").s().p("AhWBQIAAgBIgPifQBWgQBEAgIAAADIAxCTQhagVhiAPg");
	this.shape_1.setTransform(4,12.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AjDAvIgHimIADgTQAmhGAngSQAlgRAnAiQBOBIADAEIAAgBIADAHIAAABQBMCdBOBdIgBABQAAABAAAAQgBABAAAAQAAABABAAQAAABAAAAQANAggBAWIAAABQgCAggkAJIgDABQiig2jCA9QgMhYALhigAhLB4IgDACQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABIACADIAEAAQA7gRBFAOIAEAAIACgEQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQgggGgdAAQglAAgjAKgAA1ApIADgBIADgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIABgCIABgEIgyiUIgBgCIAAgDIgDgDQhJgjhbARQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAABAAAAQAAABAAAAIAAABQAAAAgBABQAAAAAAABQAAAAAAABQgBAAAAABIAPCfQAAABABAAQAAAAAAABQAAAAAAAAQABABAAAAIgBAEIACADQABAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQAsgIArAAQA3AAA1AOg");
	this.shape_2.setTransform(9.3,17.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ACnEEIgBgDIgBAAIllADIgBAAIgGAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAIgFgbIAAgBQgMhbALhnIgHilIAAgBIADgUIAAgBQAphMAqgSQAqgUAsAnQBRBJACAEIAEAIIAAABQBNCeBOBdIABAEQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAIgBAAQANAggBAXIAAABQADBFgZAMQgYALAAACIAAABIAAgBgAh6j0QgnASgmBGIgDATIAHCmQgLBiAMBYQDCg9CiA2IADgBQAkgJACggIAAgBQABgWgNggQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBIABgBQhOhdhMidIAAgBIgDgHIAAABQgDgEhOhIQgagXgZAAQgNAAgMAGgAA1AXQhbgXhoARQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAIgCgDIABgEQgBAAAAAAQAAAAAAgBQAAAAgBgBQAAAAAAgBIgPifQAAgBAAAAQABgBAAAAQAAAAAAgBQAAAAABgBIAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAAAAAQABAAAAgBQBbgRBJAjIADADIAAADIABACIAyCUIgBAEIgBACQABAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAIgDADIgCABIgBAAgAAyAMIgxiTIgBgDQhEgghWAQIAPCfIAAABQArgGApAAQA3AAAyAMg");
	this.shape_3.setTransform(9.3,19.5);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12.1,-6.7,42.8,52.3);


(femaleLib.Face = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AABAAQgBAAAAAA");
	this.shape.setTransform(1.1,4.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DBAF7B").s().p("AFAATQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAgBgBAAQgGgFgGgBQARgdATgUQAHAlgTAeIgJALQACgMgDgJgAlJAdQgTgeAHgmQATAVARAdQgGAAgGAGQgBAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAABQgDAIACAMg");
	this.shape_1.setTransform(0.5,-6.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCE91").s().p("AhYF4IgXgQQgRgLgPgNQg1gwgnhCQgUgjgOgsQgQg1gFhAIgCgaIgBglQgBijBThxQBThwB5AAIAHABIAAAAIAIgBQB6AABSBwQBUBxgBCjQgBChg5BiQg5BjhaA3QhJAtgRAFQgQgFhIgtgAgeCjQAOAOAPACIABAAIAAAAIAAAAQAQgCANgOQALgLAOAAIAAABIABgBIAAgBIAAgDIAAgDIgBAAQgPACgNAGIgDACIgBABQgKAFgKACQgLgBgNgHIgBAAIgEgCQgMgHgQgBIAAgBIgBAAIAAABIAAACIAAADIABACIAAAAIABAAQAOAAAKALgAA6CTIACABIACAAIAAgBIABAAIACgCIADgCIAAAAIgBgDIgBgDIAAgCIgBgBIAAgBIgBgDIgBgCIgBgBIAAAAIgBgCIgBgBIgBgBIgBgDIgBgBIgCgCIAAgBIgBgBIgBgCIgCgDIgDgCIAAABIgCABIgBACIAAACIABABIABABIABAAIAAABIACACIABAAIACADIAAABIABACIABABIABABIAAADIABADIABACIAAACIAAADIAAAFIAAAAIAAACgAg0BuIgBADIgBABIgCACIAAAAIgCADIAAABIgCACIgBACIAAABIgCABIAAABIAAAAIgBACIgBADIgBACIAAABIgBACIAAADIgBACIAAABIACABIADACIABABIAAAAIABAAIACgBIABgBIgBAAIAAgFIABgDIAAgCIAAgDIABgDIABgCIAAgBIABgBIACgDIAAAAIACgDIAAgBIACgCIABAAIABgBIABgBIAAAAIAAgDIAAgCIgCAAIAAgBIgEACgAD4hwQhfg6hTAZIgFAeQAhgTAsAAQAuAAA8AWgAj+hwQB0grBDAoIgFgeQgZgIgaAAQg9AAhCApgAEWC+QgDgIAAgNIABgLIACgGIAAAAIABgDIAAgBIAHgZIAAgBIABAAIACgGIADgPIAFgTIACAAQAGgEAIADQAGAUgIAKQgJALABACIACACIADABIADgCIAbgfIABgCQAPgqgCgqIALgNQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAIgDADQgBAKgLADIgqA6QABgOgBgMIAAgEIAAgGIABAAIABAAIADgCQAJgQAKgJIAAgBQAOgQAOgKQAQgDADANIgfB3QgdAngVAvQgHAFgEAAIgCgBgAkiC6QgVgvgdgnIgfh4QADgMAQACQAOALAOAPIAAABQAKAKAJAPIADACIACAAIAAAGIAEAjIgug+QgLgDgBgLIgDgCQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQAAABAAAAQgBABAAABQAAAAAAAAQAAABAAAAQAAABABAAQAAABAAAAIALANQgCAqAPAqIABABIAbAgIADABIADAAIACgDQABgCgJgLQgIgKAGgTQAIgDAGADIACABIABAAIACgBQADAWAFAUIAHAYQAAABAAAAQAAAAAAABQAAAAAAABQABABAAABQACADABAOQAAANgDAIIgCABQgEgBgHgEgAkvAHIABAAIAAABIgBgBg");
	this.shape_2.setTransform(0.5,-12.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAAG0QgQgEhOgvQgSgMgQgNIgPgLQg7gxgphJQgLgSgIgUIgEgIQABAJgDAFQgDAHgJgBQgHgBgKgHIgBgCQgUgsgfgqIAAgBIggh7IAAgDQAFgXAbAFIACABQAPAMAPARIAPAJIgBgkQgBinBVhzQBWh0B+AAIAHABIAIgBQB/AABVB0QBWBzgBCnQAAAcgCAZQAEgOAIgKIADgBQAPgSAPgLIACgCQAbgFAFAYIAAADIggB6IAAABQgfArgUAsIgBACQgKAGgHABQgJACgDgIQgDgEABgIQgKAYgMAUQg6BlhbA5QhOAvgRAEIgBAAgAjTk5QhTBxABCjIABAlIACAaQAFBAAQA1QAOAsAUAjQAnBCA1AwQAPANARALIAXAQQBIAtAQAFQARgFBJgtQBag3A5hjQA5hiABihQABijhUhxQhShwh6AAIgIABIAAAAIgHgBQh5AAhTBwgAEtAfIAAAEQgEAugKApIgBAAIAAABIgHAZIAAABIgBADIAAAAIgCAGIgBALQAAANADAIIACABQAEAAAHgFQAVgvAdgnIAfh3QgDgNgQADQgOAKgOAQIAAABQgKAJgJAQIgDACIgBAAIgBAAIAAAGgAlzgUIAfB4QAdAnAVAvQAHAEAEABIACgBQADgIAAgNQgBgOgCgDQAAgBgBgBQAAgBAAAAQAAgBAAAAQAAAAAAgBIgHgYQgFgUgDgWIgCABIgBAAIgCgBQgGgDgIADQgGATAIAKQAJALgBACIgCADIgDAAIgDgBIgbggIgBgBQgPgqACgqIgLgNQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIADACQABALALADIAuA+IgEgjIAAgGIgCAAIgDgCQgJgPgKgKIAAgBQgOgPgOgLIgFAAQgLAAgDAKgAlJBYIAJAKQgCgLADgJQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABAAQAGgFAGgBQgRgfgTgVQgHAmATAggAkuAIIAAgBIgBAAIABABgAAACzIAAAAIgBAAQgPgCgOgOQgKgLgOAAIgBAAIAAAAIgBgCIAAgDIAAgCIAAgBIABAAIgBABIABAAQAQABAMAHIAEACIABAAQANAHALABQAKgCAKgFIABgBIADgCQANgGAPgCIABAAIAAADIAAADIAAABIgBABIAAgBQgOAAgLALQgNAOgQACIAAAAgAAECrIADAAIgDAAgAA8CUIgCgBIAAgCIAAAAIAAgFIAAgDIAAgCIgBgCIgBgDIAAgDIgBgBIgBgBIgBgCIAAgBIgCgDIgBAAIgCgCIAAgBIgBAAIgBgBIgBgBIAAgCIABgCIACgBIAAgBIADACIACADIABACIABABIAAABIACACIABABIABADIABABIABABIABACIAAAAIABABIABACIABADIAAABIABABIAAACIABADIABADIAAAAIgDACIgCACIgBAAIAAABIgCAAgAg+CTIAAAAIgBgBIgDgCIgCgBIAAgBIABgCIAAgDIABgCIAAgBIABgCIABgDIABgCIAAAAIAAgBIACgBIAAgBIABgCIACgCIAAgBIACgDIAAAAIACgCIABgBIABgDIAEgCIAAABIACAAIAAACIAAADIAAAAIgBABIgBABIgBAAIgCACIAAABIgCADIAAAAIgCADIgBABIAAABIgBACIgBADIAAADIAAACIgBADIAAAFIABAAIgBABIgCABIgBAAgAExB+IgCgCQgBgCAJgLQAIgKgGgUQgIgDgGAEIgCAAIADgPIABgGIAqg6QALgDABgKIADgDQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAIgLANQACAqgPAqIgBACIgbAfIgDACIgBAAIgCgBgAEyBHQAGAAAGAGQABAAAAAAQAAAAAAAAQABABAAAAQAAAAAAABQADAIgCAMIAJgKQATghgHglQgTAVgRAfgABBhzIAFgeQBTgZBfA6Qh0grhDAogAhMiRIAFAeQhDgoh0ArQBfg6BTAZg");
	this.shape_3.setTransform(0.5,-12.3);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-37.8,-56,76.6,87.3);


(femaleLib.Eyes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACwgYQgLgIgPAAQgRAAgLAKQgCABgCABQgIAKAAAKQAAAPAMAJQALALARAAIAAAAQARAAALgLQAMgJAAgPQAAgMgMgKIAAgBQgBgBgBAAgACDgPQgIAIAAAHQAAAKAIAHQAIAHAMAAQALAAAIgHQAIgHAAgKQAAgHgIgIQgIgGgLAAQgMAAgIAGgAivgaQALgIAPAAQARAAAMAKQABABACACQAIAJAAAMQAAANgLAKQgMAKgRAAQgQAAgMgKQgMgKAAgNQAAgOAMgKQABgBABgBgAipgQQAIgHAMAAQALAAAIAHQAIAHAAAJQAAAIgIAHQgIAHgLAAQgMAAgIgHQgIgHAAgIQAAgJAIgHg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF8F6").s().p("ACWAfIAAgBQARAAALgKQAMgKAAgNQAAgOgMgKIAAgBIABgBQAQADAUAHIAAAJQAAAMgMAMIgCACQgPAPgkAAIAAAAgACMAfQgggCgPgPQgGgGgDgIQAFgEAGgGQALgJAMgFQgIAJAAAMQAAANAMAKQALAKARAAIAAABIgKAAgAiVAdQARAAAMgLQALgKAAgMQAAgNgIgJQANAFAKAKQAGAFAFAGQgDAGgGAHQgPAPggABIgKABgAjIAOIgCgBQgMgMAAgMQgBgFABgFQAUgGARgEIAAACQgMAKAAAPQAAAMAMAKQAMALAQAAIAAABQgkgBgPgPg");
	this.shape_1.setTransform(0,0.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("ACDARQgIgHAAgKQAAgHAIgIQAIgGAMAAQALAAAIAGQAIAIAAAHQAAAKgIAHQgIAHgLAAQgMAAgIgHgACTAAIAAABIAAABIAAABIACABIABAAIAAgBQAAAAABAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQgBAAAAgBQAAAAgBAAQgBAAAAAAIgCAAgACFgGIABADQACACADAAIAFAAQAAgBABAAQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgGgGgBIgBAAQgGAAAAAGgAipAPQgIgHAAgIQAAgJAIgHQAIgHAMAAQALAAAIAHQAIAHAAAJQAAAIgIAHQgIAHgLAAQgMAAgIgHgAiWAAQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIAAABIABAAIACgBIAAgBIAAAAIAAAAIAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQAAAAAAAAgAiLgOQgGABAAAGQAAABAAAAQAAABAAAAQABABAAAAQABAAAAABIAFAAQADAAACgCIABgDQAAgGgGAAIgBAAg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3EFEFF").s().p("ACUAKIgBgBIAAgBIAAgBIAAgBIAAAAIABAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAIAAABgAiVAIIAAgBQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAIABAAIAAAAIABABIAAABIgBABIgBABgACGABIgBgBQAAgHAGABQAHABAAAFQAAAAAAAAQAAAAgBABQAAAAAAABQgBAAAAABIgFAAQgDAAgCgCgAiPABQgBgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAgBQABgGAGgBQAHgBAAAHIgBACQgCABgEAAg");
	this.shape_3.setTransform(0.1,-0.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("ACQApQgogEgVgRIgGgHIgDAAIgDACIgDABIgCgCIABgEIAGgIIAAAAIAGgGQAug2BfAgQAMAFAEgHIAEgGIABgBQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgDAIQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgEAEgJAFIAAAIQAAANgLALIgEAEQgTAPgxACgAB6gWIgEADQgMAFgLAKQgGAEgFAFQADAIAGAHQAPAPAgABIAKABQAkgBAPgOIACgCQAMgNAAgLIAAgKQgUgGgQgDIgDgBQgLgIgPAAQgRAAgLAKgAiPAnQgxgCgSgPIgFgEQgLgLAAgNIAAgIQgJgEgEgFIgCgDIgDgJQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAIACAAIABADIAEAGQAEAGAMgFQBfggAuA2IAGAGIAAAAIAGAJQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAAAIgCACIgDgBIgDgCIgDABIgGAGQgVARgoAEgAivgaIgCABQgRADgUAHQgBAEABAFQAAAMAMAMIACACQAPAOAkABIAAAAIAKgBQAggBAPgPQAGgGADgIQgFgFgGgFQgKgKgNgFIgDgDQgMgJgRAAQgPAAgLAHg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0000FF").s().p("ACWAjQgRAAgLgLQgMgJAAgPQAAgKAIgKIAEgCQALgKARAAQAPAAALAIIACABIAAABQAMAKAAAMQAAAPgMAJQgLALgRAAgACDgPQgIAIAAAHQAAAKAIAHQAIAHAMAAQALAAAIgHQAIgHAAgKQAAgHgIgIQgIgGgLAAQgMAAgIAGgAixAXQgMgKAAgNQAAgOAMgKIACgCQALgIAPAAQARAAAMAKIADADQAIAJAAAMQAAANgLAKQgMAKgRAAQgQAAgMgKgAipgQQgIAHAAAJQAAAIAIAHQAIAHAMAAQALAAAIgHQAIgHAAgIQAAgJgIgHQgIgHgLAAQgMAAgIAHg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,1).p("ACwgYQgLgIgPAAQgRAAgLAKQgCABgCABQgIAKAAAKQAAAPAMAJQALALARAAIAAAAQARAAALgLQAMgJAAgPQAAgMgMgKIAAgBQgBgBgBAAgACDgPQgIAIAAAHQAAAKAIAHQAIAHAMAAQALAAAIgHQAIgHAAgKQAAgHgIgIQgIgGgLAAQgMAAgIAGgAipgQQAIgHAMAAQALAAAIAHQAIAHAAAJQAAAIgIAHQgIAHgLAAQgMAAgIgHQgIgHAAgIQAAgJAIgHgAivgaQALgIAPAAQARAAAMAKQABABACACQAIAJAAAMQAAANgLAKQgMAKgRAAQgQAAgMgKQgMgKAAgNQAAgOAMgKQABgBABgBg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,1,1).p("AB6gFQAAADAAACQAAAIAIAHIAAAAACpAPQAHgHAAgIQAAgIgFgGAC6AJQADgFAAgEQAAgGgCgFABsAAQABAHADAHAi5AJQgDgFAAgEQAAgGACgFAioAPQgHgHAAgIQAAgIAFgGAh5gFQAAACAAADQAAAIgIAHIAAAAAhrAAQAAAHgEAH");
	this.shape_7.setTransform(-0.1,0.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AidAcIgOgCIAAAAIgDAAIgBAAIAAgBIgBAAIgBAAIgFgBIgugUIABgCIAEADIgEgFIAAAAIgBAAQgOgPAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAABgBAAQAAAAgBABIAQALIAAAAIAAgEIAEgHIAEgGQAEgFgEAGQgDAFACADQACADAEgCIgBACQAWgJAJAAQAKAAgBABIABABIACgBQAXgBAUAJIgBAAIAGACIAAAAQASAFARALIADgEIgCAEQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAgBQAAAAABgBIABgCIABAAQgBADABADIgCAEIAEAEQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABIABAGIgBACIgFgCIgEgDIgBABQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAIhKACIAAAAIgBAAgAi6gIQgOACgPAGQANAHARAFIAFACIACABIADABIABAAIAAABIACAAIABABQAOAFAOgCIAKgDIAEAAIAAAAQAFgCAGABIABgBIAAABIAGAAIAZgBQgKgJgLgFIgDgCIgCAAIgCAAIAAAAIgCAAQgDgCgEAAIgCAAIAAgBIgBAAIAAAAIgDgDIAAgBIgEgCIgBgBIgIgBIgCAAQgLgCgJABIgGABIgIACIAAAAIgIABgABTAaQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAgBgBIAAgBIgEADIgGACIAAgCIABgGQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBIAFgEIgBgCIABgBIAAgHIACADQAAAAABAAQAAABABAAQAAAAABAAQAAAAAAAAIAEgBIAAAAQARgLASgFIAAAAIAFgCIAAAAQAUgJAXABIACABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBgBQAAgBAJAAQAKAAAWAJIgBgCQADACACgDQADgDgEgFQgCgGADAFIAEAGIADAHQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABIABAAIAQgLQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAABgNAPIgCAAIAAAAIgEAFIAEgDIABACIguAUIgGABIgBAAIAAABIgEAAIgBAAIgNACgACCASIABAAIACAAIAKADQAPACAOgFIABgBIACAAIABgBIAAAAIADgBIABgBIAGgCQAQgFANgHQgPgGgOgCIgHgBIgIgCIgGgBQgJgBgLACIgCAAIgJABIAAABIgEACIAAABIgEADIAAAAIgBAAIAAABIgBAAIgHACIgCAAIAAAAIgCAAIgBAAIgEACQgLAFgKAJIAZABIAGAAIgBgBIACABIACAAQAFAAAEABgAByADIABAAIgBABgAhyADIAAAAIAAABgAByACIACAAIAAAAIgCABIAAgBgAhzACIgBAAIACAAIAAABgAhCgEIAAgBIAAABg");
	this.shape_8.setTransform(-0.1,-0.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3EFEFF").s().p("ACSAGIgBgBIAAgBIABgBIAAgBIABAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAIAAAAIgBABIgBgBgAiTAGIAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAIABAAIAAABIABABIAAABIgBABIgBABgACEAAIAAgDIALgDIABABIAAADIAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAIgEAAQgEAAgCAAgAiNAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAgBgBAAIAAAAIABgEIAAAAIANADIgBADQgCAAgEAAg");
	this.shape_9.setTransform(-0.1,-0.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000066").s().p("ACPARIgKgDIgCAAIgBAAIAAAAQgJgHABgIIAAgEIACgBIABAAIAAgBIABAAIAAAAIAEgDIAAgBIAEgCIAAgBIAJgBIACAAQALgCAJABIAGABQAFAGAAAIQAAAIgIAHIAAAAIAEAAQgKADgKAAIgJAAgACSgCIAAABIgBABIAAAAIABAAIABABIABgBIAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAgBAAIgBAAIgCgGIAAAAIAAgDIgBgBIgLADIAAADQACACAEAAIAEgBgAirANIAEABIAAAAQgIgHAAgIQAAgIAFgGIAGgBQAJgBALABIACABIAIABIABABIAEACIAAAAIADAEIAAAAIABAAIAAAAIACABIACAAIABAFQgBAIgHAHIgBAAIAAAAIgEAAIgKACIgIABQgKAAgKgEgAiUAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAIAAAAIABABIABgBIABAAIAAAAIgBgBIAAgBIAEgDIAEABQAEAAACgCIABgDIgNgDIAAAAIgBAEIAAAAIgBAGIgBAAQgBAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAgACxALIACAAIgDABgAiyALIACAAIABABIgDgBg");
	this.shape_10.setTransform(-0.1,0.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0000FF").s().p("ACoAPQAIgIAAgHQAAgIgFgGIAIACIAHABQACAFAAAGQAAADgCAGIgGACIgBAAIgCAAIgBACIAAAAIgBABIgCAAIgBABIgEAAgAB3AOIgCgBIABABIgGAAQgDgHgBgHIAEgBIABAAIACgBIAAABIACgCIAFgCIAAAFQgBAHAJAIIAAAAQgFgCgGABgAByAAIABAAIgBAAgAByAAIACAAIAAAAIgCAAIAAAAgAiAAPQAHgIABgHIgBgFIAFACIACACIAAgBIACAAIACABIADABQAAAHgEAHIgGAAIAAgBIgBABQgGgBgFACgAhyAAIAAAAIAAAAgAhzAAIABAAIAAAAIgCAAIABAAgAirAOIgBAAIgCAAIAAgBIgBAAIgBgCIgCAAIgCAAIgFgCQgCgFgBgEQAAgGACgFIAIgBIAAAAIAIgCQgFAGAAAIQAAAHAIAIIAAAAg");
	this.shape_11.setTransform(-0.1,0.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("ABKAaIgFAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQgBgBACgFIACgDIABAAQABgQAUgNQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABABIAAAAIgGACQgHADgBAYQBIgQA3ABIAEAAQAEgWgIgEIgGgDIABgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAOALAGAJIAIgEIAIgGQAHgGgCAGIgEAKIgEAFIgIAMIgQAHQAAgCgegCQgegDgoAJQgnAJAHAFgAhyARQgogJgeADQgeACAAACIgQgHIgIgMIgEgGIgEgJQgCgGAHAGIAIAGIAIAEQAGgKAOgKQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAIABAAIgFADQgIAFAEAWIAEAAQA3gBBIAPQgBgXgIgDIgGgCIABAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAUANABARIABAAIACADQACAFgBABQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAIgGAAIgIAFQAHgGgngIg");
	this.shape_12.setTransform(-0.2,0.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,1,1).p("AB6gFQAAADAAACQAAAIAIAHIAAAAAC6AJQADgFAAgEQAAgGgCgFACpAPQAHgHAAgIQAAgIgFgGABsAAQABAHADAHAi5AJQgDgFAAgEQAAgGACgFAioAPQgHgHAAgIQAAgIAFgGAh5gFQAAACAAADQAAAIgIAHIAAAAAhrAAQAAAHgEAH");
	this.shape_13.setTransform(-0.1,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},36).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},2).to({state:[{t:this.shape_12}]},3).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_13}]},4).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.5,-4.5,49.1,9.1);


(femaleLib.Bangs = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#593922").s().p("AEtBzQgSg+hagkQhbgjgPhVIgCgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAIgEABQAAABgBAAQAAAAAAABQAAAAAAAAQAAABAAAAQgLAoAVA+Qg5gQgUjBIAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIgEgCQgBAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAQAAABAAAAIAAABQACCkhLBUIAmikQAAAAAAgBQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBABAAAAIgCACIgBABQgxBshaAiQhaAkgUA/QgVA/AMBPQgRgmgWgeIgBgDIAAgCQgXhsArhyIAAAEQBkjSDggIIAAAAIABAAQDgAIBkDSQArBugWBuIAAAAIgCAEQgWAdgRAmQANhOgRg+g");
	this.shape.setTransform(0.5,26.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AEVEzQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBIACgEIAAAAIADgIIgBAAIACgFIAAgBQAih/gYhDQgYhDhRgfQhRgigThJQAEAoAIAWIAIAVIAIAKQAJAJgsgWQgsgXgZiCQgHB5gmAqQgoAogCAAQgCAAgEAGQgEAHAAgHIACgOIAgiIQgpBShUAjQhVAggXBFQgYBEAiB/IAAABIACAFIAAAAIACAHIABABIABADQAAABAAAAQAAABAAAAQAAAAAAABQAAAAAAABIgCADIgFAAIgDgCIgBgEIAAgBQgDgEAAgEIAAAAIgCgFIAAgBQgYhSgog2IAAgBIgCgFIgBgBIgBgCQgWhvAshwIAAgBQBojYDmgIIAAAAIABAAQDmAIBoDYIAAABQAtBxgYBwIAAABIgCAFIgBABIgBABQgnA2gYBQIAAABIgBAFIAAABIgDAIIAAAAIgCAEIgCADIgDABIgBgBgABViVIACADQAPBVBbAlQBaAiASA+QARA+gNBPQARgmAWgeIACgDIAAgBQAWhtgrhvQhkjSjggIIgBAAIAAAAQjgAIhkDSIAAgDQgrBxAXBtIAAABIABADQAWAeARAmQgMhOAVg/QAUg/BagiQBaglAxhrIABgBIACgDQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAABAAQAAAAABABQAAAAAAAAQAAABABAAQAAABAAAAQAAAAAAABQAAAAAAABIgmCmQBLhXgCikIAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAIAEABQAAABAAAAQABAAAAABQAAAAAAAAQAAABAAAAIAAABQAUDAA5AQQgVg9ALgoQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAIAEgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAg");
	this.shape_1.setTransform(0.5,30.8);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-36,0,73,61.6);


(femaleLib.Arm = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FDCF88").s().p("AlAEkQFTo2CugnIB7CjQAKANgMAQIn0GsQgyAHgfAAQg2AAABgWg");
	this.shape.setTransform(-33.3,13.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-65.4,-18,64.3,63);


(femaleLib.Abdomen = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AFFlqQDUEigHGtQAAABAAABQgBACgBACAoPFrQgBgCgBgCQAAgBAAgBQgHmtDUki");
	this.shape.setTransform(0,-12.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgEBYIgDgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIABgBIgCgBIg2guQg2gshJgeQhIgfgHABQgIAAABgCQABgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQCTAvBxBeIARgJQAWgKAZgRQBKgsAXgeIAZghQABgBAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgZAhgiAeQBIgrBNgkQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAgBABQgBACgHACQgHABgpAXQgqAVgsAcIgpAXIAAgBIghAYIAAABIgpAaQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAIgCADIgPAMIgDADIgDABIgBAAgAgDBJIACADIACgDIgFgBIABABg");
	this.shape_1.setTransform(0.5,42.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AnjErIAAgSIgEAAIghguIgEAHIgCgEIAAgCQgHmtDUkhQFKhAE6BBQDTEhgHGsIAAACQi/EmlFgTIAPgMIACgDQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIApgaIAAgBIAhgYIAAABIApgZQAsgcAqgVQApgXAHgBQAHgCABgCQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQhNAkhIArQAigeAZghQAAAAAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAgBgBABQAAAAgBAAQAAABgBABIgZAhQgXAehKAuQgZARgWAKIgRAJQhxhgiTgvQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAAAABQgBAAAAABQgBACAIAAQAHgBBIAfQBIAeA3AuIA2AuIgCAEIgrABQkJAAisjYgAADH2IgBgBIAHABIgEADIgCgDg");
	this.shape_2.setTransform(-0.3,-0.1);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-54,-51.6,108.1,103.3);


(femaleLib.FemaleDefault = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	};
	this.frame_34 = function() {
		this.stop();
	};
	this.frame_69 = function() {
		this.gotoAndStop(0);
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(35).call(this.frame_69).wait(1));

	// Bangs
	this.instance = new femaleLib.Bangs();
	this.instance.setTransform(285.5,-194,1,1,-1.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-2.8,x:273.1,y:-193.7},11,cjs.Ease.get(-1)).to({x:282.5,y:-194},12,cjs.Ease.get(1)).to({scaleX:1,scaleY:1,rotation:-5,x:280.9,y:-193.7},5).to({scaleX:1,scaleY:1,rotation:0,x:289.3,y:-194.5},6).wait(1).to({rotation:-2.8,x:282.5,y:-194},11,cjs.Ease.get(-1)).to({x:273.1,y:-193.7},12,cjs.Ease.get(-1)).to({rotation:1.1,x:284.3,y:-194},11,cjs.Ease.get(1)).wait(1));

	// Eyes
	this.instance_1 = new femaleLib.Eyes();
	this.instance_1.setTransform(287.1,-149.5,1,1,-1.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-2.8,x:275.5,y:-149.1},11,cjs.Ease.get(-1)).to({x:285.1,y:-149.5},12,cjs.Ease.get(1)).to({scaleX:1,scaleY:1,rotation:-5,x:285.2,y:-149.4},5).to({scaleX:1,scaleY:1,rotation:0,x:289.6,y:-149.9},6).wait(1).to({rotation:-2.8,x:285.1,y:-149.5},11,cjs.Ease.get(-1)).to({x:275.5,y:-149.1},12,cjs.Ease.get(-1)).to({rotation:1.1,x:283.7,y:-149.4},11,cjs.Ease.get(1)).wait(1));

	// Mouth
	this.instance_2 = new femaleLib.Mouth();
	this.instance_2.setTransform(287.8,-105.5,1,1,-1.2,0,0,-0.8,12);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:11.8,rotation:-2.3,x:277,y:-105.3},11,cjs.Ease.get(-1)).to({x:286.7,y:-105.7},12,cjs.Ease.get(1)).to({rotation:-4.5,x:288.5,y:-105.8},5).to({rotation:0.5,x:289,y:-106},6).wait(1).to({rotation:-2.3,x:286.7,y:-105.7},11,cjs.Ease.get(-1)).to({x:277,y:-105.3},12,cjs.Ease.get(-1)).to({regY:11.9,rotation:1.6,x:282.3,y:-105.4},11,cjs.Ease.get(1)).wait(1));

	// Face
	this.instance_3 = new femaleLib.Face();
	this.instance_3.setTransform(286.9,-133.9,1,1,-1.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({rotation:-2.8,x:275.7,y:-133.5},11,cjs.Ease.get(-1)).to({x:285.3,y:-134},12,cjs.Ease.get(1)).to({scaleX:1,scaleY:1,rotation:-5,x:285.9},5).to({scaleX:1,scaleY:1,rotation:0,x:289,y:-134.4},6).wait(1).to({rotation:-2.8,x:285.3,y:-134},11,cjs.Ease.get(-1)).to({x:275.7,y:-133.5},12,cjs.Ease.get(-1)).to({rotation:1.1,x:282.8,y:-133.8},11,cjs.Ease.get(1)).wait(1));

	// Hair
	this.instance_4 = new femaleLib.Hair();
	this.instance_4.setTransform(285.9,-192,1,1,-1.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:-2.8,x:273.5,y:-191.7},11,cjs.Ease.get(-1)).to({x:282.9,y:-192.1},12,cjs.Ease.get(1)).to({scaleX:1,scaleY:1,rotation:-5,x:281.3,y:-191.9},5).to({scaleX:1,scaleY:1,rotation:0,x:289.6,y:-192.5},6).wait(1).to({rotation:-2.8,x:282.9,y:-192.1},11,cjs.Ease.get(-1)).to({x:273.5,y:-191.7},12,cjs.Ease.get(-1)).to({rotation:1.1,x:284.7,y:-191.9},11,cjs.Ease.get(1)).wait(1));

	// Torso
	this.instance_5 = new femaleLib.Torso();
	this.instance_5.setTransform(285.7,-26.7,1,1,-0.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({rotation:-4.3,x:280.7,y:-26.3},11,cjs.Ease.get(-1)).to({rotation:-0.3,x:284.9,y:-26.7},12,cjs.Ease.get(1)).to({rotation:0.8,x:286.1,y:-26.9},11).wait(1).to({rotation:-0.3,x:284.9,y:-26.7},11).to({rotation:-4.3,x:280.7,y:-26.3},12,cjs.Ease.get(-1)).to({rotation:-2.1,x:283.2,y:-26.5},11,cjs.Ease.get(1)).wait(1));

	// Abdomen
	this.instance_6 = new femaleLib.Abdomen();
	this.instance_6.setTransform(290.8,70.4,1,1,2.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(11).to({x:290.7,y:70.3},12,cjs.Ease.get(1)).to({x:290.8,y:70.4},11).wait(1).to({x:290.7,y:70.3},11).to({x:290.8,y:70.4},12,cjs.Ease.get(-1)).wait(12));

	// LLeg
	this.instance_7 = new femaleLib.Leg();
	this.instance_7.setTransform(290.5,115.2,1,1,-1.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(70));

	// Lfoot
	this.instance_8 = new femaleLib.Foot();
	this.instance_8.setTransform(316.4,362.5,1,1,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(70));

	// RLeg
	this.instance_9 = new femaleLib.Leg();
	this.instance_9.setTransform(290.5,115.4,1,1,0,0.2,-179.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(70));

	// RFoot
	this.instance_10 = new femaleLib.Foot();
	this.instance_10.setTransform(269,363,1,1,0,0.2,-179.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(70));

	// RHand
	this.instance_11 = new femaleLib.Hand2();
	this.instance_11.setTransform(199.6,80.6,1,1,-1.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({rotation:-3.2,x:205.8,y:86.8},11,cjs.Ease.get(-1)).to({rotation:-75.2,x:266,y:60.6},12,cjs.Ease.get(1)).wait(23).to({rotation:-3.2,x:205.8,y:86.8},12,cjs.Ease.get(-1)).to({rotation:-1,x:204,y:83.7},11,cjs.Ease.get(1)).wait(1));

	// RSleeve
	this.instance_12 = new femaleLib.Sleeve();
	this.instance_12.setTransform(230,-68.3,0.999,0.999,-15.2,0,0,-0.2,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({rotation:-22.7,x:222.6,y:-64.2},11,cjs.Ease.get(-1)).to({rotation:-12.1,x:230.3,y:-69.9},12,cjs.Ease.get(1)).wait(23).to({rotation:-22.7,x:222.6,y:-64.2},12,cjs.Ease.get(-1)).to({rotation:-20.5,x:226.5,y:-66.6},11,cjs.Ease.get(1)).wait(1));

	// RArm
	this.instance_13 = new femaleLib.Arm();
	this.instance_13.setTransform(238.8,23,1,1,-30.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({x:242.3,y:23.9},10,cjs.Ease.get(-1)).to({rotation:0,skewX:62.2,skewY:-117.8,x:220.6,y:19.7},1,cjs.Ease.get(-1)).to({skewX:-2.6,skewY:-182.6,x:211.8,y:16.5},12,cjs.Ease.get(1)).to({skewX:-2.6},11).wait(12).to({skewX:62.2,skewY:-117.8,x:220.6,y:19.7},12,cjs.Ease.get(-1)).to({skewX:62.2},11,cjs.Ease.get(1)).wait(1));

	// LSleeve
	this.instance_14 = new femaleLib.Sleeve();
	this.instance_14.setTransform(346.1,-71.2,1,1,0,14.5,-165.5,-0.4,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({skewX:6.2,skewY:-173.8,x:338,y:-74.6},11,cjs.Ease.get(-1)).to({regX:-0.3,skewX:1.5,skewY:-178.5,x:344.9,y:-71.3},12,cjs.Ease.get(1)).to({skewX:0.8,skewY:-179.2,x:346,y:-70.7},6).to({skewX:0.3,skewY:-179.7,x:347,y:-70.3},5).to({skewX:0.3},1,cjs.Ease.get(-1)).to({skewX:0.8,skewY:-179.2,x:346,y:-70.7},5).to({skewX:1.5,skewY:-178.5,x:344.9,y:-71.3},6).to({regX:-0.4,skewX:6.2,skewY:-173.8,x:338,y:-74.6},12,cjs.Ease.get(-1)).to({skewX:15.8,skewY:-164.2,x:342.5,y:-72.5},11,cjs.Ease.get(1)).wait(1));

	// LHand
	this.instance_15 = new femaleLib.Hand2();
	this.instance_15.setTransform(374.5,76.3,1,1,0,-0.6,179.4,2.4,-3.6);

	this.instance_16 = new femaleLib.Hand();
	this.instance_16.setTransform(407.7,-9,1,1.005,0,-31.6,154.3,2.4,-3.6);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({regX:2.3,scaleX:1,scaleY:1,skewX:8.7,skewY:188.7,x:385.2,y:64.3},5,cjs.Ease.get(-1)).to({regX:2.4,scaleX:1,scaleY:1,skewX:-27.9,skewY:152.1,x:418.2,y:9.7},5).to({_off:true,scaleX:1,scaleY:1,skewX:-31.6,skewY:154.3,x:407.7,y:-9},1,cjs.Ease.get(-1)).wait(47).to({_off:false,scaleX:1,scaleY:1,skewX:-27.9,skewY:152.1,x:418.2,y:9.7},1,cjs.Ease.get(1)).to({regX:2.3,scaleX:1,scaleY:1,skewX:8.7,skewY:188.7,x:385.2,y:64.3},5).to({regX:2.4,scaleX:1,scaleY:1,skewX:2.9,skewY:182.9,x:362.5,y:78.3},5,cjs.Ease.get(1)).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(10).to({_off:false},1,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,skewX:-55.1,skewY:124.9,x:410.4,y:-8.7},1,cjs.Ease.get(1)).to({regX:2.5,scaleX:1,scaleY:1,skewX:-14.5,skewY:165.5,x:424.5,y:-4.8},11).to({scaleX:1,scaleY:1,skewX:-12.8,skewY:167.2,x:423.3,y:-19.6},11).wait(1).to({scaleX:1,scaleY:1,skewX:-14.5,skewY:165.5,x:424.5,y:-4.8},11).to({regX:2.4,scaleX:1,scaleY:1,skewX:-55.1,skewY:124.9,x:410.4,y:-8.7},11).to({scaleX:1,scaleY:1,skewX:-31.6,skewY:154.3,x:407.7,y:-9},1,cjs.Ease.get(-1)).to({_off:true,scaleX:1,scaleY:1,skewX:-27.9,skewY:152.1,x:418.2,y:9.7},1,cjs.Ease.get(1)).wait(11));

	// LArm
	this.instance_17 = new femaleLib.Arm();
	this.instance_17.setTransform(336.8,18.6,1,1,0,24.2,-155.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({skewX:-54.8,skewY:-234.8,x:344.4,y:21.5},11,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,skewX:-55.4,skewY:-235.4,x:359.8,y:23.3},12,cjs.Ease.get(1)).to({scaleX:1,scaleY:1,skewX:-66.4,skewY:-246.4,x:363.7,y:22.2},11).wait(1).to({scaleX:1,scaleY:1,skewX:-55.4,skewY:-235.4,x:359.8,y:23.3},11).to({scaleX:1,scaleY:1,skewX:-54.8,skewY:-234.8,x:344.4,y:21.5},12,cjs.Ease.get(-1)).to({skewX:30.2,skewY:-149.8,x:331.1,y:16.9},11,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(173.1,-207.4,230.8,616.1);


// Open mouth and hand gesture
(femaleLib.open = function(instance) {
	instance.gotoAndPlay(0);    // Begin gesture
	instance.instance_2.play(); // Open mouth
});

// Close mouth and hand gesture
(femaleLib.close = function(instance) {
	instance.gotoAndPlay(35);           // End gesture
	instance.instance_2.gotoAndStop(0); // Close mouth
});

// stage content:



(femaleLib.FemaleDefaultInit = function() {
	this.initialize();

	// Layer 1
	this.instance = new femaleLib.FemaleDefault();
	this.instance.setTransform(90,201.8,0.605,0.605,0,0,0,300.5,104.8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(473.5,213,139.6,372.6);

})(femaleLib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;

AVIATION.common.Avatars = function(femaleParent, maleParent){
  'use strict';
	this.femaleParent = femaleParent;

	this.maleParent = maleParent;
};

AVIATION.common.Avatars.prototype = {
	init: function() {
		this.maleCanvas = document.getElementById(this.maleParent);

		this.femaleCanvas = document.getElementById(this.femaleParent);

		this.maleAvatar = new maleLib.MaleDefaultInit();

		this.femalteAvatar = new femaleLib.FemaleDefaultInit();

		this.maleStage = new createjs.Stage(this.maleCanvas);

		this.femaleStage = new createjs.Stage(this.femaleCanvas);

		this.maleStage.addChild(this.maleAvatar);
		this.femaleStage.addChild(this.femalteAvatar);

		this.maleStage.update();
		this.femaleStage.update();

		createjs.Ticker.setFPS(maleLib.properties.fps);
		createjs.Ticker.setFPS(femaleLib.properties.fps);
		createjs.Ticker.addEventListener("tick", this.maleStage);
		createjs.Ticker.addEventListener("tick", this.femaleStage);

	},

	maleAvatarOpen: function(){
		maleLib.open(this.maleAvatar.instance);
	},

	maleAvatarClose: function(){
		maleLib.close(this.maleAvatar.instance);
	},

	femaleAvatarOpen: function(){
		femaleLib.open(this.femaleAvatar.instance);
	},

	femaleAvatarClose: function(){
		femaleLib.close(this.femaleAvatar.instance);
	}
};
