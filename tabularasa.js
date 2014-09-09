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
		var state, body, content, self
		self    = this
		body    = this.library.transistor.make( this.library.morph.index_loop({
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
							"class" : define.class_name.main.title,
							"text"  : loop.indexed.title
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
					class_name : define.class_name.eloquent,
					part       : loop.indexed.content
				})

				eloquent.transistor.append( body.get("tab_"+ loop.index ).body )

				return loop.into.concat( eloquent )
			}
		})

		body.append( define.append_to )
	},

	define_body : function () {
		var self = this
		return {
			"class" : "package_call_logger_call_type_head",
			"child" : [
				{ 
					"class" : "package_call_logger_call_type_head_title",
					"text"  : define.text.title
				},
				{
					"class" : "package_call_logger_call_type_head_script_wrap",
					child   : this.library.morphism.index_loop({
						array   : define.text.script,
						else_do : function ( loop ) { 
							if ( define.text.show.indexOf( loop.indexed.title ) < 0 ) {
								return loop.into
							}
							return loop.into.concat({
								"class" : "package_call_logger_call_type_head_script_body",
								child   : [
									{
										"class"              : "package_call_logger_call_type_head_script_body_title",
										"data-opening-state" : "closed",
										"text"               : loop.indexed.title
									},
									{
										"class"   : "package_call_logger_call_type_head_script_body_text_wrap",
										"display" : "none",
										child     : self.library.morphism.index_loop({
											array   : loop.indexed.content,
											else_do : function ( content_loop ) {
												
												var class_name, definition

												definition = {
													type      : "div",
													attribute : {}
												}
												class_name = "package_call_logger_call_type_head_script_body_text_line"

												if ( content_loop.indexed.type === "bold" ) { 
													class_name = "package_call_logger_call_type_head_script_body_text_bold_line"
												}

												if ( content_loop.indexed.type === "important" ) { 
													class_name = "package_call_logger_call_type_head_script_body_text_important_line"
												}

												if ( content_loop.indexed.type === "list" ) {
													class_name          = "package_call_logger_call_type_head_script_body_text_list_line"
													definition.children = self.library.morphism.index_loop({
														array   : content_loop.indexed.text,
														else_do : function ( list_loop ) { 
															return list_loop.into.concat({
																"class" : "package_call_logger_call_type_head_script_body_text_list_line_member_wrap",
																child : [
																	{
																		"class" : "package_call_logger_call_type_head_script_body_text_list_line_member_sign",
																		"text"  : "-"
																	},
																	{
																		"class" : "package_call_logger_call_type_head_script_body_text_list_line_member_text",
																		"text"  : list_loop.indexed
																	}
																]
															})
														}
													})
												} else { 
													definition.text = content_loop.indexed.text
												}

												definition["class"] = class_name

												return content_loop.into.concat(definition)
											}
										})
									}
								]
							})
						}
					})
				},
			]
		}
	}
	
})