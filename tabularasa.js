define({

	define : {
		allow   : "*",
		require : [
			"event_master",
			"morph",
			"eloquent",
			"transistor"
		]
	},

	make : function ( define ) { 

		var state, body, content, self, event_circle, class_name

		self                     = this
		class_name               = define.class_name
		body                     = this.library.transistor.make( this.library.morph.index_loop({
			subject : define.tab,
			into    : { 
				"class" : define.class_name.main.wrap,
				"child" : []
			},
			else_do : function ( loop ) {

				loop.into.child = loop.into.child.concat({
					"class"   : define.class_name.main.tab,
					"mark_as" : "tab_"+ loop.index,
					"child"   : [
						{ 
							"class"                 : define.class_name.main.title,
							"data-tabularasa-title" : loop.indexed.title,
							"text"                  : loop.indexed.title
						}
					]
				})

				return loop.into
			}
		}) )
		content = this.library.morph.index_loop({
			subject : define.tab,
			else_do : function ( loop ) {
				var eloquent
				eloquent = self.library.eloquent.make({
					class_name : class_name.eloquent,
					part       : loop.indexed.content
				})
				eloquent.transistor.body.style.display = "none"
				eloquent.transistor.append( body.get("tab_"+ loop.index ).body )

				return loop.into.concat( eloquent )
			}
		})
		event_circle = Object.create( this.library.event_master ).make({
			state  : {},
			events : this.define_event({
				body : body.body
			})
		})
		event_circle.add_listener(this.define_listener())

		body.append( define.append_to )
	},

	define_event : function ( define ) {
		return [
			{ 
				called       : "tab click",
				that_happens : [
					{ 
						on : define.body,
						is : [ "click" ]
					}
				],
				only_if : function ( heard ) {
					return ( heard.event.target.hasAttribute("data-tabularasa-title") )
				}
			}
		]
	},

	define_listener : function () {
		return [
			{ 
				for       : "tab click",
				that_does : function ( heard ) {
					if ( heard.event.target.nextSibling.style.display === "block" ) { 
						heard.event.target.nextSibling.style.display = "none"
					} else { 
						heard.event.target.nextSibling.style.display = "block"
					}

					return heard
				}
			}
		]
	}

})